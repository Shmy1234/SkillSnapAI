import { Link } from "react-router";

export const meta = () => ([
  { title: "SkillSnap.ai | Home" },
  { name: "description", content: "AI resume builder, feedback, and dashboard tracking." },
]);

const Start = () => {
  return (
    <main className="bg-gradient-to-r from-blue-200 to-purple-200 bg-cover min-h-screen">
      <header className="flex items-center justify-between px-10 py-6 max-w-6xl mx-auto">
        <Link to="/" className="text-3xl font-extrabold text-gradient hover:scale-[1.01] transition-all duration-200">
          SkillSnap.ai
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/auth?next=/dashboard"
            className="primary-button w-fit px-6 py-3 text-base font-semibold btn-animate"
          >
            Log in to dashboard
          </Link>
          <Link
            to="/upload"
            className="bg-white text-gray-800 rounded-full px-6 py-3 font-semibold shadow-md btn-animate"
          >
            Try resume builder
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-10 pb-4">
        <div className="bg-white/60 border border-white/70 rounded-2xl px-6 py-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full primary-gradient text-white font-bold shadow-lg">AI</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">Your resume co-pilot</p>
              <p className="text-sm text-gray-600">Upload, polish, and track every version in one place.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-800">Ready to start?</span>
            <Link to="/upload" className="primary-button w-fit px-4 py-2 text-sm font-semibold btn-animate">
              Build a resume
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-10 px-10 pb-20 pt-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <p className="inline-flex w-fit rounded-full bg-white/60 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm">
              AI-powered resume builder & tracker
            </p>
            <h1 className="text-6xl leading-tight tracking-[-2px] font-semibold text-gray-900">
              Launch resumes that get callbacks, then track the feedback in one dashboard.
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl">
              Upload your resume, get instant ATS-grade feedback, and save every version to your personal dashboard.
              Log in to pick up where you left off, compare scores, and polish with AI suggestions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/auth?next=/dashboard"
                className="primary-button w-fit px-6 py-3 text-lg font-semibold"
              >
                Go to dashboard
              </Link>
              <Link
                to="/upload"
                className="bg-white text-gray-800 rounded-full px-6 py-3 text-lg font-semibold shadow-md"
              >
                Upload a resume
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {[
                "Smart ATS scoring with tailored tips",
                "Resume versions auto-saved to your dashboard",
                "AI writing assist for better descriptions",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 min-h-[160px] shadow-lg border border-white/60 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 card-animate"
                >
                  <p className="text-base font-semibold text-gray-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-white/70 via-purple-200/60 to-blue-200/80 -z-10 rounded-[40px]" />
            <div className="bg-white rounded-[32px] shadow-2xl p-6 border border-white/60 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Live preview</p>
                  <p className="text-2xl font-semibold text-gray-900">Your resume health</p>
                </div>
                <span className="primary-button px-3 py-1 text-sm font-semibold w-fit">
                  Builder + Analyzer
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="gradient-border">
                  <div className="bg-white rounded-xl p-4 flex flex-col gap-2">
                    <p className="text-sm text-gray-500">Overall score</p>
                    <p className="text-4xl font-bold text-gray-900">86</p>
                    <p className="text-sm text-gray-600">ATS-friendly formatting, keywords aligned.</p>
                  </div>
                </div>
                <div className="gradient-border">
                  <div className="bg-white rounded-xl p-4 flex flex-col gap-2">
                    <p className="text-sm text-gray-500">Next best fix</p>
                    <p className="text-base font-semibold text-gray-900">Clarify measurable outcomes in experience</p>
                    <p className="text-sm text-gray-600">AI will draft impact statements for you.</p>
                  </div>
                </div>
              </div>
              <div className="gradient-border">
                <div className="bg-white rounded-xl p-4 flex flex-col gap-3">
                  <p className="text-sm font-semibold text-gray-900">Dashboard flow</p>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                    <li>Login sends you straight to the dashboard.</li>
                    <li>Every upload is saved with score, preview, and tips.</li>
                    <li>Delete old resumes anytime to keep things tidy.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Start;
