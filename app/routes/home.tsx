import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SkillSnap.ai" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv, fs } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/dashboard');
  }, [auth.isAuthenticated])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ))

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes()
  }, []);

  const handleDelete = async (resumeId: string, imagePath?: string, resumePath?: string) => {
    setDeletingId(resumeId);
    try {
      await kv.delete(`resume:${resumeId}`);
      if (imagePath) {
        await fs.delete(imagePath);
      }
      if (resumePath) {
        await fs.delete(resumePath);
      }
      setResumes((prev) => prev.filter((resume) => resume.id !== resumeId));
    } catch (err) {
      console.error("Failed to delete resume", err);
    } finally {
      setDeletingId(null);
    }
  }

  const handleDragStart = (resumeId: string) => {
    setDraggingId(resumeId);
  };

  const handleDragEnter = (resumeId: string) => {
    if (!draggingId || draggingId === resumeId) return;
    setResumes((prev) => {
      const next = [...prev];
      const fromIndex = next.findIndex((r) => r.id === draggingId);
      const toIndex = next.findIndex((r) => r.id === resumeId);
      if (fromIndex === -1 || toIndex === -1) return prev;
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  return <main className="bg-gradient-to-r from-blue-200 to-purple-200 bg-cover">
    <Navbar />

    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track Your Applications & Resume Ratings</h1>
        {!loadingResumes && resumes?.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
        ): (
          <h2>Review your submissions and check AI-powered feedback.</h2>
        )}
      </div>
      {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
      )}

      {!loadingResumes && resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
              <ResumeCard
                  key={resume.id}
                  resume={resume}
                  isDeleting={deletingId === resume.id}
                  onDelete={() => handleDelete(resume.id, resume.imagePath, resume.resumePath)}
                  onDragStart={() => handleDragStart(resume.id)}
                  onDragEnter={() => handleDragEnter(resume.id)}
                  onDragEnd={handleDragEnd}
                  isDragging={draggingId === resume.id}
              />
          ))}
        </div>
      )}

      {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>
      )}
    </section>
  </main>
}
