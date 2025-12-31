import { Link } from "react-router";
import { useState } from "react";

export const meta = () => ([
  { title: "SkillSnap | Home" },
  { name: "description", content: "Resume builder, feedback, and dashboard tracking without the fluff." },
]);

const Start = () => {
  const benefits = [
    "50% higher chance of passing ATS filters with keyword alignment and formatting checks.",
    "Instant clarity on what to fix next instead of guessing where your resume is weak.",
    "Every version is saved with scores so you can A/B test and keep the best draft.",
    "Guided bullets that emphasize impact, metrics, and role-specific phrasing.",
  ];

  const performanceStats = [
    { label: "Resumes upgraded", value: "1,000+" },
    { label: "Active users", value: "100+" },
    { label: "Average rating", value: "4.7★" },
    { label: "Avg. time saved per resume", value: "2 hrs" },
  ];

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewStars, setNewReviewStars] = useState(0);
  const maxReviewChars = 150;

  return (
    <main className="bg-[#e6f0ff] min-h-screen">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-8 lg:px-12 py-6 max-w-[1800px] w-full mx-auto text-center sm:text-left">
        <Link to="/" className="text-3xl sm:text-4xl font-extrabold text-gradient hover:scale-[1.01] transition-all duration-200">
          SkillSnap
        </Link>
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
          <Link
            to="/auth?next=/dashboard"
            className="primary-button w-full sm:w-fit px-6 py-3 text-base font-semibold text-center btn-animate"
          >
            Log in to dashboard
          </Link>
          <Link
            to="/upload"
            className="bg-white text-gray-800 rounded-full px-6 py-3 font-semibold shadow-md btn-animate w-full sm:w-fit text-center"
          >
            Try resume builder
          </Link>
        </div>
      </header>

      <section className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 lg:px-12 pb-4">
        <div className="bg-white/60 border border-white/70 rounded-2xl px-6 py-4 shadow-sm flex flex-wrap items-center justify-center sm:justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 justify-center sm:justify-start">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full primary-gradient text-white font-bold shadow-lg">Pro</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">Your resume co-pilot</p>
              <p className="text-sm text-gray-600">Upload, polish, and track every version in one place.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <span className="text-sm font-semibold text-gray-800">Ready to start?</span>
            <Link to="/upload" className="primary-button w-fit px-4 py-2 text-sm font-semibold btn-animate">
              Build a resume
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-12 px-4 sm:px-8 lg:px-12 pb-20 pt-12 max-w-[1800px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8 lg:pr-6">
            <p className="inline-flex w-fit rounded-full bg-gradient-to-r from-[#5978ff] via-[#6386ff] to-[#7c7eff] px-4 py-2 text-sm font-semibold text-white shadow-md border border-white/30">
              Guided resume builder & tracker
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-[-2px] font-semibold text-gray-900">
              Launch resumes that get callbacks, then track the feedback in one dashboard.
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl">
              Upload your resume, get instant ATS-grade feedback, and save every version to your personal dashboard.
              Log in to pick up where you left off, compare scores, and polish with structured suggestions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/auth?next=/dashboard"
                className="primary-button w-fit px-6 py-3 text-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 active:scale-95 active:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Go to dashboard
              </Link>
              <Link
                to="/upload"
                className="bg-white text-gray-800 rounded-full px-6 py-3 text-xl font-semibold shadow-md transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-xl active:scale-95 active:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Upload a resume
              </Link>
            </div>
          </div>
          <div className="relative w-full max-w-[720px] lg:justify-self-end">
            <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-[#9cc0ff]/70 via-[#b7a8ff]/60 to-[#7ea6ff]/80 -z-10 rounded-[40px]" />
            <div className="bg-gradient-to-r from-[#5978ff] via-[#6386ff] to-[#7c7eff] text-white rounded-[32px] shadow-2xl p-8 border border-white/20 flex flex-col gap-6 min-h-[520px] sm:min-h-[600px] lg:min-h-[700px]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base text-white/80">Live preview</p>
                  <p className="text-3xl font-semibold text-white">Your Resume Status</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl border border-white/30 shadow-lg">
                  <div className="bg-white/10 rounded-xl p-4 flex flex-col gap-2 text-white">
                    <p className="text-base text-white/80">Overall score</p>
                    <p className="text-5xl font-bold text-white">86</p>
                    <p className="text-sm text-white/80">ATS-friendly formatting, keywords aligned.</p>
                  </div>
                </div>
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl border border-white/30 shadow-lg">
                  <div className="bg-white/10 rounded-xl p-4 flex flex-col gap-2 text-white">
                    <p className="text-base text-white/80">Next best fix</p>
                    <p className="text-lg font-semibold text-white">Clarify measurable outcomes in experience</p>
                    <p className="text-sm text-white/80">Use the built-in prompts to draft impact statements.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl border border-white/30 shadow-lg">
                <div className="bg-white/10 rounded-xl p-4 flex flex-col gap-3 text-white">
                  <p className="text-sm font-semibold text-white">Dashboard flow</p>
                  <ul className="list-disc list-inside text-white/90 text-base space-y-1">
                    <li>Login sends you straight to the dashboard.</li>
                    <li>Every upload is saved with score, preview, and tips.</li>
                    <li>Delete old resumes anytime to keep things tidy.</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl border border-white/30 shadow-lg">
                <div className="bg-white/10 rounded-xl p-4 flex flex-col gap-3 text-white">
                  <p className="text-sm font-semibold text-white">Sample suggestions</p>
                  <ul className="list-disc list-inside text-white/90 text-base space-y-1">
                    <li>Add metrics: “Increased lead quality by 24% within 2 quarters.”</li>
                    <li>Mirror the job post keywords: “React, TypeScript, API integration.”</li>
                    <li>Tighten bullets to impact + action + metric for every role.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          {[
            "Smart ATS scoring with tailored tips",
            "Resume versions auto-saved to your dashboard",
            "Writing prompts for better descriptions",
          ].map((item) => (
            <div
              key={item}
              className="bg-gradient-to-r from-[#5978ff] via-[#6386ff] to-[#7c7eff] text-white rounded-2xl p-8 min-h-[220px] shadow-2xl border border-white/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(89,120,255,0.35)] transition-all duration-300 card-animate flex items-center justify-center text-center"
            >
              <p className="text-2xl sm:text-3xl leading-tight font-semibold text-white">{item}</p>
            </div>
          ))}
        </div>

        <section className="w-full bg-gradient-to-r from-[#5978ff] via-[#6386ff] to-[#7c7eff] border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col gap-6 text-white">
          <div className="flex flex-col gap-2 text-center">
            <p className="text-sm font-semibold text-white/80">Why it beats a plain resume</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white !text-white">Benefits that lift your odds</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30 flex gap-3 items-start transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl"
              >
                <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-white" aria-hidden />
                <p className="text-lg text-white">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full bg-gradient-to-r from-[#5978ff] via-[#6386ff] to-[#7c7eff] text-white rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center">
            <p className="text-sm font-semibold opacity-90">Proven performance</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white !text-white">What users achieve with SkillSnap</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {performanceStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-gradient-to-r from-white/20 via-white/10 to-white/5 rounded-2xl p-6 text-center border border-white/30 shadow-xl backdrop-blur-md flex flex-col gap-2 transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl"
              >
                <p className="text-3xl sm:text-4xl font-bold">{stat.value}</p>
                <p className="text-sm sm:text-base opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full bg-gradient-to-r from-[#5978ff] via-[#6386ff] to-[#7c7eff] text-white rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center">
            <p className="text-sm font-semibold opacity-90">Stay in touch</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white !text-white">Contact us & share a review</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30 flex flex-col gap-4">
              <p className="text-lg font-semibold">Contact us</p>
              <input
                className="w-full rounded-xl px-4 py-3 bg-white/80 text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Your name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
              <input
                className="w-full rounded-xl px-4 py-3 bg-white/80 text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                type="email"
              />
              <textarea
                className="w-full rounded-xl px-4 py-3 bg-white/80 text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-300 min-h-[140px]"
                placeholder="Tell us how we can help"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
              />
              <button className="primary-button w-fit px-5 py-3 text-base font-semibold hover:shadow-xl hover:-translate-y-0.5 active:scale-95 active:shadow-md">
                Send message
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Leave a review</p>
                <span className="text-sm text-white/80">{newReviewStars} / 5 stars</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReviewStars(star)}
                    onMouseEnter={() => setNewReviewStars(star)}
                    className={`h-12 w-12 rounded-full border border-white/40 flex items-center justify-center text-xl transition-all duration-150 ${
                      star <= newReviewStars ? "bg-white text-indigo-600 shadow-lg scale-110 animate-bounce-small" : "bg-white/10 text-white"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                className="w-full rounded-xl px-4 py-3 bg-white/80 text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-300 min-h-[140px]"
                placeholder="Share your experience (150 characters max)"
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value.slice(0, maxReviewChars))}
              />
              <div className="flex items-center justify-between text-sm text-white/80">
                <span>Keep it helpful and specific.</span>
                <span>
                  {newReviewText.length}/{maxReviewChars}
                </span>
              </div>
              <button className="primary-button w-fit px-5 py-3 text-base font-semibold hover:shadow-xl hover:-translate-y-0.5 active:scale-95 active:shadow-md">
                Submit review
              </button>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Start;
