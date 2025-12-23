import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
    resume: { id, companyName, jobTitle, feedback, imagePath },
    onDelete,
    isDeleting,
    onDragStart,
    onDragEnter,
    onDragEnd,
    isDragging,
}: {
    resume: Resume;
    onDelete: () => Promise<void> | void;
    isDeleting?: boolean;
    onDragStart?: () => void;
    onDragEnter?: () => void;
    onDragEnd?: () => void;
    isDragging?: boolean;
  }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath]);

    return (
        <Link
            to={`/resume/${id}`}
            className={`resume-card animate-in fade-in duration-1000 cursor-grab ${isDragging ? "ring-4 ring-indigo-300" : ""}`}
            draggable
            onDragStart={(e) => {
                e.stopPropagation();
                onDragStart?.();
            }}
            onDragEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDragEnter?.();
            }}
            onDragOver={(e) => {
                e.preventDefault();
            }}
            onDragEnd={(e) => {
                e.stopPropagation();
                onDragEnd?.();
            }}
        >
            <div className="resume-card-header w-full">
                <div className="flex flex-col gap-2 w-full">
                    {companyName && <h2 className="!text-black font-bold break-words">{companyName}</h2>}
                    {jobTitle && <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>}
                    {!companyName && !jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
                </div>
                <div className="flex flex-col gap-2 items-end">
                    <div className="flex-shrink-0">
                        <ScoreCircle score={feedback.overallScore} />
                    </div>
                    <button
                        type="button"
                        className="h-9 w-9 flex items-center justify-center rounded-full border border-red-200 text-red-600 font-semibold hover:bg-red-50 hover:border-red-300 transition-colors"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete();
                        }}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "…" : "✕"}
                    </button>
                </div>
            </div>
            {resumeUrl && (
                <div className="gradient-border animate-in fade-in duration-1000">
                    <div className="w-full h-full">
                        <img
                            src={resumeUrl}
                            alt="resume"
                            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
                        />
                    </div>
                </div>
                )}
        </Link>
    )
}
export default ResumeCard
