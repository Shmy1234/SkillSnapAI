import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useNavigate, useLocation} from "react-router";
import {useCallback, useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SkillSnap" },
    { name: "description", content: "Smart resume feedback for your dream job." },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [planChoice, setPlanChoice] = useState<{ tier: string; expiresAt: number } | null>(null);
  const [stripeRedirecting, setStripeRedirecting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("skillsnap_plan");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { tier: string; expiresAt: number };
        setPlanChoice(parsed);
      } catch {
      }
    }
  }, []);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/dashboard');
  }, [auth.isAuthenticated])

  const loadResumes = useCallback(async () => {
    setLoadingResumes(true);
    const resumesList = (await kv.list("resume:*", true)) as KVItem[];
    const parsedResumes = resumesList
      ?.map((resume) => JSON.parse(resume.value) as Resume)
      ?.filter(Boolean);
    setResumes(parsedResumes || []);
    setLoadingResumes(false);
  }, [kv]);

  useEffect(() => {
    loadResumes();
  }, [loadResumes]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const requiresPlan = params.get("plan") === "upgrade";
    if (requiresPlan && !isPlanActive()) {
      setPlanModalOpen(true);
    }
  }, [location.search, planChoice]);

  const handleDelete = async (resumeId: string, imagePath?: string, resumePath?: string) => {
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

  const isPlanActive = () => {
    if (!planChoice) return false;
    return planChoice.expiresAt > Date.now();
  };

  const handleUploadClick = () => {
    if (isPlanActive()) {
      navigate("/upload");
    } else {
      setPlanModalOpen(true);
    }
  };

  const selectPlan = (tier: "weekly" | "monthly" | "yearly") => {
    if (stripeRedirecting) return;
    const now = Date.now();
    const durations: Record<typeof tier, number> = {
      weekly: 7 * 24 * 60 * 60 * 1000,
      monthly: 30 * 24 * 60 * 60 * 1000,
      yearly: 365 * 24 * 60 * 60 * 1000,
    };
    const choice = { tier, expiresAt: now + durations[tier] };
    setStripeRedirecting(true);
    setTimeout(() => {
      setPlanChoice(choice);
      localStorage.setItem("skillsnap_plan", JSON.stringify(choice));
      setPlanModalOpen(false);
      setStripeRedirecting(false);
      navigate("/upload");
    }, 800);
  };

  return <main className="bg-[#e6f0ff]">
    <Navbar />

    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track Your Applications & Resume Ratings</h1>
        {!loadingResumes && resumes?.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
        ): (
          <h2>Review your submissions and check detailed feedback.</h2>
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
            <button onClick={handleUploadClick} className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </button>
          </div>
      )}
    </section>

    {planChoice && (
      <div className="flex flex-col items-center justify-center mt-4 text-sm text-gray-700">
        {isPlanActive() ? (
          <span className="bg-white/80 px-4 py-2 rounded-full shadow-sm">Plan active</span>
        ) : (
          <span className="bg-white/80 px-4 py-2 rounded-full shadow-sm">
            Plan expired. Choose a plan to upload again.
          </span>
        )}
      </div>
    )}

    {planModalOpen && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6">
        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[90vw] px-10 sm:px-12 py-14 sm:py-16 flex flex-col gap-10 min-h-[75vh] justify-center items-center">
          <button
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 text-4xl leading-none px-3"
            onClick={() => setPlanModalOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
          <div className="flex flex-col gap-4 text-center w-full">
            <p className="text-2xl sm:text-3xl text-gray-500">Upgrade required (Stripe)</p>
            <h3 className="text-5xl sm:text-6xl font-bold text-gray-900">Choose a plan to upload</h3>
            <p className="text-2xl sm:text-3xl text-gray-600">All plans are crossed off and free today.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            {[
              { tier: "weekly", price: "$1/week", label: "Weekly" },
              { tier: "monthly", price: "$3/month", label: "Monthly" },
              { tier: "yearly", price: "$20/year", label: "Yearly" },
            ].map((plan) => (
              <button
                key={plan.tier}
                onClick={() => selectPlan(plan.tier as "weekly" | "monthly" | "yearly")}
                disabled={stripeRedirecting}
                className={`flex flex-col gap-4 bg-gradient-to-r from-[#5978ff] via-[#6386ff] to-[#7c7eff] text-white rounded-2xl p-8 sm:p-10 shadow-xl border border-white/30 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(89,120,255,0.35)] transition-all duration-200 ${stripeRedirecting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                <span className="text-2xl opacity-85">{plan.label}</span>
                <span className="text-2xl line-through opacity-75">{plan.price}</span>
                <span className="text-4xl font-bold">Free today</span>
              </button>
            ))}
          </div>
          <p className="text-2xl sm:text-3xl text-gray-600 text-center">
            You will be redirected through Stripe to confirm (simulated, no charge). After selecting, you will not see
            this prompt again until the plan expires.
          </p>
          {stripeRedirecting && (
            <p className="text-lg sm:text-xl text-indigo-600 font-semibold">Redirecting to Stripe checkout...</p>
          )}
        </div>
      </div>
    )}
  </main>
}
