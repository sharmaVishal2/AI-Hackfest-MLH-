import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, LogIn, Sparkles } from 'lucide-react';
import { createGuestSession } from '../api/client.js';

export default function LandingPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function tryGuest() {
    setLoading(true);
    try {
      const session = await createGuestSession();
      localStorage.setItem('smarthire_guest_session', session.sessionId);
      localStorage.setItem('smarthire_mode', 'guest');
      localStorage.setItem('smarthire_guest_used', String(session.usedInterviews));
      localStorage.setItem('smarthire_guest_max', String(session.maxInterviews));
      navigate('/upload');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_460px]">
        <div className="flex flex-col justify-between bg-slate-950 p-8 text-white">
          <div className="flex items-center gap-3 text-xl font-extrabold"><BrainCircuit /> SmartHire</div>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">AI Resume Driven Interview Platform</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Upload a resume and get contextual interview questions, live answer scoring, and actionable feedback. Try it instantly as a guest or login to save every interview.
            </p>
          </div>
          <div className="grid max-w-2xl gap-3 text-sm text-slate-300 md:grid-cols-3">
            <span>Resume-aware prompts</span>
            <span>Guest interviews</span>
            <span>Saved history</span>
          </div>
        </div>
        <div className="flex items-center px-6 py-10">
          <div className="mx-auto w-full max-w-sm">
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-extrabold text-slate-950">Start Interview Prep</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Guest mode is temporary and limited to 2 interviews. Login when you want persistent history.</p>
              <div className="mt-6 space-y-3">
                <button onClick={tryGuest} disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-md bg-teal-600 px-4 py-3 font-bold text-white hover:bg-teal-700 disabled:opacity-60">
                  <Sparkles size={18} /> {loading ? 'Starting...' : 'Try as Guest'}
                </button>
                <button onClick={() => navigate('/login')} className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-3 font-bold text-slate-800 hover:bg-slate-50">
                  <LogIn size={18} /> Login / Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
