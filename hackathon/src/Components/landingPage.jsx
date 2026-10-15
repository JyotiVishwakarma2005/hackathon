
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: "🛡️",
    title: "AI Risk Analysis",
    description:
      "Analyze internship descriptions for suspicious patterns and potential scam indicators.",
    color: "bg-violet-100",
  },
  {
    icon: "🔍",
    title: "Fraud Detection",
    description:
      "Identify suspicious fees, unrealistic salary promises and misleading recruitment tactics.",
    color: "bg-blue-100",
  },
  {
    icon: "📊",
    title: "Trust Score",
    description:
      "Get an easy-to-understand risk score with reasons and practical next steps.",
    color: "bg-emerald-100",
  },
  {
    icon: "👥",
    title: "Community Reports",
    description:
      "Help students share suspicious internship listings and relevant evidence.",
    color: "bg-orange-100",
  },
];

const suspiciousPatterns = [
  {
    words: ["registration fee", "pay to apply", "payment required"],
    points: 30,
    reason: "Possible upfront payment demand",
  },
  {
    words: ["training fee", "security deposit"],
    points: 25,
    reason: "Possible training fee or security deposit",
  },
  {
    words: ["guaranteed job", "100% placement guaranteed"],
    points: 20,
    reason: "Unrealistic employment guarantee",
  },
  {
    words: ["limited seats", "apply immediately"],
    points: 10,
    reason: "Urgency-based recruitment language",
  },
];

function analyzeInternship(text) {
  const normalized = text.toLowerCase();

  const flags = suspiciousPatterns.filter((pattern) =>
    pattern.words.some((word) => normalized.includes(word))
  );

  const risk = Math.min(
    95,
    flags.reduce((total, pattern) => total + pattern.points, 0)
  );

  return {
    risk,
    flags: flags.map((pattern) => pattern.reason),
    label:
      risk >= 50
        ? "High Risk Indicators"
        : risk >= 20
        ? "Caution Recommended"
        : "Few Listed Warning Signs",
  };
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-32 w-32 text-white sm:h-40 sm:w-40"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Shield protection illustration"
    >
      <path d="M50 6 86 20V45C86 68 70 84 50 95 30 84 14 68 14 45V20L50 6Z" />
      <path d="m31 49 13 13 26-29" />
    </svg>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  function handleCheck(event) {
    event.preventDefault();

    if (!query.trim()) return;

    const result = analyzeInternship(query);
    setReport(result);
    navigate("/results", { state: { result, query } });
  }

  function handleScrollToSection(event, sectionId) {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a
            href="#home"
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-linear-to-br from-violet-500 to-indigo-700 text-2xl text-white shadow-lg shadow-violet-200">
              ✦
            </span>
            Intern<span className="-ml-2 text-violet-600">Shield</span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex">
            <a href="#home" className="transition hover:text-violet-600">
              Home
            </a>
            <a
              href="#how"
              onClick={(event) => handleScrollToSection(event, "how")}
              className="transition hover:text-violet-600"
            >
              How It Works
            </a>
          </div>

        </nav>
      </header>

      {/* Hero section */}
      <main id="home">
        <section className="relative isolate">
          <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-96 w-96 rounded-full bg-violet-100 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 top-20 -z-10 h-96 w-96 rounded-full bg-blue-100 blur-3xl" />

          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:py-24 lg:grid-cols-2 lg:px-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2 text-xs font-bold tracking-wider text-violet-700 shadow-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                SMARTER INTERNSHIP VERIFICATION
              </div>

              <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Your career deserves
                <span className="mt-2 block bg-linear-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                  real opportunities.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-500 sm:text-lg">
                Fake internships can cost you money, time and trust.
                Check suspicious opportunities and understand the warning
                signs before sharing your information or applying.
              </p>

              {/* Main centered search bar */}
              <form
                id="checker"
                onSubmit={handleCheck}
                className="mt-9 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-violet-100/70 transition focus-within:border-violet-400 sm:flex-row sm:items-center"
              >
                <span className="hidden pl-3 text-2xl text-violet-500 sm:block">
                  ⌕
                </span>

                <input
                  type="text"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setReport(null);
                  }}
                  placeholder="Paste an internship description or link here..."
                  aria-label="Internship link or description"
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-400"
                />

                <button
                  type="submit"
                  className="rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:from-violet-700 hover:to-indigo-700"
                >
                  Check Internship →
                </button>
              </form>

              <p className="mt-3 text-xs leading-6 text-slate-400">
                ✨ Example: “Pay a registration fee to secure your internship”
              </p>

              {/* Risk report */}
              {report && (
                <div className="mt-6 rounded-2xl border border-violet-100 bg-white p-5 shadow-xl shadow-violet-100/50">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-violet-500">
                        Preliminary Risk Report
                      </p>
                      <h2 className="mt-2 text-lg font-bold">
                        {report.label}
                      </h2>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="text-3xl font-extrabold text-violet-600">
                        {report.risk}
                      </span>
                      <span className="text-sm text-slate-400">/100</span>
                    </div>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all ${
                        report.risk >= 50
                          ? "bg-red-500"
                          : report.risk >= 20
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: `${report.risk}%` }}
                    />
                  </div>

                  <h3 className="mt-5 text-sm font-bold">
                    Detected indicators
                  </h3>

                  {report.flags.length ? (
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                      {report.flags.map((flag) => (
                        <li key={flag}>⚠️ {flag}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      No configured warning phrases were found. This does
                      not confirm that the internship is genuine.
                    </p>
                  )}

                  <p className="mt-4 border-t border-slate-100 pt-3 text-xs leading-5 text-slate-400">
                    Prototype analysis based on keywords only, not a
                    verified AI verdict.
                  </p>
                </div>
              )}

              <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
                <div className="flex -space-x-2">
                  {["🎓", "👩‍💻", "🧑‍🎓"].map((emoji) => (
                    <span
                      key={emoji}
                      className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-violet-100"
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
                <span>
                  Helping students make{" "}
                  <strong className="text-slate-800">
                    informed decisions
                  </strong>
                </span>
              </div>
            </div>

            {/* Hero illustration */}
            <div
              className="relative mx-auto flex w-full max-w-lg items-center justify-center"
              style={{ minHeight: "390px" }}
            >
              <div className="absolute h-72 w-72 rounded-full bg-violet-200/70 blur-3xl" />
              <div className="absolute h-80 w-80 rounded-full border border-violet-200" />
              <div className="absolute h-64 w-96 rotate-45 rounded-[45%] border border-dashed border-violet-200" />

              <div className="relative grid h-52 w-52 place-items-center rounded-[3.5rem] bg-linear-to-br from-violet-500 to-indigo-800 shadow-2xl shadow-violet-300 sm:h-60 sm:w-60">
                <div className="absolute inset-3 rounded-[2.8rem] border border-white/30" />
                <ShieldIcon />

                <span className="absolute -right-4 top-8 grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl shadow-xl">
                  ✓
                </span>
                <span className="absolute -bottom-3 -left-4 grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl shadow-xl">
                  🔎
                </span>
              </div>

              <div className="absolute left-0 top-5 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:left-2">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-xl">
                    ✓
                  </span>
                  <div>
                    <p className="text-sm font-bold">Verify company</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Check official details
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-10 right-0 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:right-0">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-100 text-xl">
                    !
                  </span>
                  <div>
                    <p className="text-sm font-bold">Spot red flags</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Pause before paying
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 rounded-full border border-violet-100 bg-white px-4 py-3 text-xs font-medium text-slate-500 shadow-sm">
                🔐 Safer applications start here
              </div>
            </div>
          </div>
        </section>

        {/* Quick process strip */}
        <section className="border-y border-slate-100 bg-slate-50/70">
          <div className="mx-auto grid max-w-7xl grid-cols-3 px-5 py-8 lg:px-8">
            {[
              ["01", "Submit a posting"],
              ["02", "Review warning signs"],
              ["03", "Verify independently"],
            ].map(([number, label]) => (
              <div key={number} className="px-2 text-center sm:px-6">
                <p className="text-2xl font-extrabold text-violet-600">
                  {number}
                </p>
                <p className="mt-2 text-xs font-semibold text-slate-600 sm:text-sm">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"
        >
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-violet-600">
              DESIGNED FOR STUDENTS
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              More confidence. Fewer surprises.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
              A smarter way to investigate internship opportunities
              before sharing your money or personal information.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="group rounded-2xl border border-slate-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60"
              >
                <div
                  className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${feature.color}`}
                >
                  {feature.icon}
                </div>

                <h3 className="mt-6 text-lg font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {feature.description}
                </p>

                <a
                  href="#how"
                  className="mt-5 inline-block text-sm font-bold text-violet-600"
                >
                  Learn more ↗
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
          <div className="grid gap-10 rounded-3xl border border-violet-100 bg-linear-to-br from-violet-50 via-white to-blue-50 p-7 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-violet-600">
                SIMPLE. SMART. SAFER.
              </p>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                How It Works
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
                Review warning signs, investigate the employer and
                gather evidence before deciding whether to trust an
                internship.
              </p>

            </div>

            <div className="space-y-6">
              {[
                ["01", "Paste", "Enter an internship link or description."],
                ["02", "Analyze", "Review suspicious wording and claims."],
                ["03", "Verify", "Check official company sources."],
                ["04", "Decide", "Make an informed application decision."],
              ].map(([number, title, description]) => (
                <div key={number} className="flex gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white font-bold text-violet-600 shadow-sm">
                    {number}
                  </div>
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-8">
          <a href="#home" className="font-extrabold">
            Intern<span className="text-violet-600">Shield</span>
          </a>
          <p className="text-xs text-slate-400">
            Verify first. Build your future with confidence.
          </p>
          <p className="text-xs text-slate-400">
            Hackathon prototype · Risk indicators are not proof of fraud
          </p>
        </div>
      </footer>
    </div>
  );
}
