import { Link, useLocation } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();
  const result = location.state?.result;
  const query = location.state?.query || "";

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-50 px-5 py-12 text-slate-900">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
            Results
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight">
            No result found
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Please go back and check an internship to see the analysis.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-12 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
              Results
            </p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight">
              {result.label}
            </h1>
          </div>

          <div className="text-right">
            <span className="text-3xl font-extrabold text-violet-600">
              {result.risk}
            </span>
            <span className="text-sm text-slate-400">/100</span>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-500">Submitted text</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {query || "No description provided."}
          </p>
        </div>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all ${
              result.risk >= 50
                ? "bg-red-500"
                : result.risk >= 20
                ? "bg-amber-500"
                : "bg-emerald-500"
            }`}
            style={{ width: `${result.risk}%` }}
          />
        </div>

        <h2 className="mt-6 text-lg font-bold">Detected indicators</h2>

        {result.flags.length ? (
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            {result.flags.map((flag) => (
              <li key={flag}>⚠️ {flag}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm leading-6 text-slate-500">
            No configured warning phrases were found. This does not confirm the internship is genuine.
          </p>
        )}

        <Link
          to="/"
          className="mt-8 inline-block rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
