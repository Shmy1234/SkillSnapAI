import {type FormEvent, useEffect, useState} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [companyName, setCompanyName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [isSuggesting, setIsSuggesting] = useState(false);

    useEffect(() => {
        // Guard: require an active plan; otherwise redirect to dashboard paywall.
        if (typeof window === "undefined") return;
        const stored = localStorage.getItem("skillsnap_plan");
        if (!stored) {
            navigate("/dashboard?plan=upgrade", { replace: true });
            return;
        }
        try {
            const parsed = JSON.parse(stored) as { expiresAt: number };
            if (!parsed.expiresAt || parsed.expiresAt <= Date.now()) {
                navigate("/dashboard?plan=upgrade", { replace: true });
            }
        } catch {
            navigate("/dashboard?plan=upgrade", { replace: true });
        }
    }, []);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        setIsProcessing(true);

        setStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if(!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if(!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

        setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error: Failed to upload image');

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete, redirecting...');
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    const suggestDescription = async () => {
        setIsSuggesting(true);
        try {
            const prompt = `You are helping someone polish a resume for ${jobTitle || "a new role"} at ${companyName || "their target company"}.
Write a concise, achievement-focused job description they can paste into a resume upload form. Keep it to 3-4 sentences, highlight measurable impact, and keep the tone professional and confident.`;
            const response = await ai.chat(prompt);
            if (!response) return;
            const suggestion = typeof response.message.content === 'string'
                ? response.message.content
                : response.message.content?.[0]?.text || '';

            if (suggestion) {
                setJobDescription(suggestion.trim());
            }
        } finally {
            setIsSuggesting(false);
        }
    }

    return (
        <main className="bg-gradient-to-r from-blue-200 to-purple-200 bg-cover">
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-full" />
                        </>
                    ) : (
                        <h2>Drop your resume for an ATS score and improvement tips</h2>
                    )}
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input
                                    type="text"
                                    name="company-name"
                                    placeholder="Company Name"
                                    id="company-name"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input
                                    type="text"
                                    name="job-title"
                                    placeholder="Job Title"
                                    id="job-title"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-div w-full">
                                <div className="flex items-center justify-between w-full gap-4">
                                    <label htmlFor="job-description">Job Description</label>
                                    <button
                                        type="button"
                                        className="text-sm font-semibold text-gradient"
                                        onClick={suggestDescription}
                                        disabled={isSuggesting}
                                    >
                                        {isSuggesting ? 'Getting suggestion...' : 'AI suggestion'}
                                    </button>
                                </div>
                                <textarea
                                    rows={5}
                                    name="job-description"
                                    placeholder="Paste the role description or generate one with AI"
                                    id="job-description"
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            </div>

                            <div className="form-div">
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button className="primary-button" type="submit">
                                Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload
