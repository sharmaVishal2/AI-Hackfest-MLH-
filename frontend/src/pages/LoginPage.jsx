import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { ArrowRight, BrainCircuit, BriefcaseBusiness, FileBadge2 } from 'lucide-react';

function LoginPage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="relative flex min-h-screen items-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 bg-grid bg-[size:48px_48px] opacity-20" />
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-glow backdrop-blur lg:p-12">
          <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            AI-powered job readiness
          </span>
          <h1 className="mt-6 max-w-2xl font-display text-5xl font-extrabold leading-tight text-white">
            Turn any job description into a sharper resume and cover letter.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Smart Career Assistant uses Google Gemini to generate targeted summaries, ATS skills, project bullets, and
            a polished cover letter in one workflow.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => loginWithRedirect()}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-ink transition hover:opacity-90"
            >
              Login with Auth0
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </section>
        <section className="grid gap-4">
          {[
            {
              icon: BrainCircuit,
              title: 'Tailored AI output',
              description: 'Generate structured content aligned to a target role and the candidate profile.',
            },
            {
              icon: FileBadge2,
              title: 'Hackathon-friendly exports',
              description: 'Copy sections instantly or download the generated results as a PDF.',
            },
            {
              icon: BriefcaseBusiness,
              title: 'Persistent history',
              description: 'Securely save previous generations in MongoDB Atlas for later access.',
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1"
            >
              <item.icon className="h-10 w-10 text-gold" />
              <h2 className="mt-4 font-display text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

export default LoginPage;
