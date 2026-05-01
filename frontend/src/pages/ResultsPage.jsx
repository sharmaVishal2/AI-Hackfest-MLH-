import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppShell from '../components/AppShell.jsx';
import { guestInterviewDetail, interviewDetail } from '../api/client.js';
import { useAuth } from '../auth/AuthContext.jsx';

export default function ResultsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const { user } = useAuth();
  const isGuest = !user;

  useEffect(() => {
    if (isGuest && !localStorage.getItem('smarthire_guest_session')) {
      navigate('/upload', { replace: true });
      return;
    }
    const loader = isGuest ? guestInterviewDetail : interviewDetail;
    loader(id).then(setInterview);
  }, [id, isGuest, navigate]);

  if (!interview) return <AppShell><div>Loading results...</div></AppShell>;

  return (
    <AppShell>
      <h1 className="text-3xl font-extrabold text-slate-950">Results</h1>
      {isGuest && (
        <div className="mt-4 flex flex-col justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 md:flex-row md:items-center">
          <span>{interview.savePrompt || 'Login to save your interview history.'}</span>
          <Link to="/login" className="rounded-md bg-slate-950 px-4 py-2 text-center font-bold text-white">Login to Save</Link>
        </div>
      )}
      <div className="mt-5 rounded-lg border border-slate-200 bg-white p-6">
        <div className="text-sm font-medium text-slate-500">Overall score</div>
        <div className="mt-2 text-5xl font-extrabold text-teal-700">{interview.averageScore ?? 0}%</div>
      </div>
      <div className="mt-6 space-y-4">
        {interview.questions.map((question) => (
          <article key={question.id} className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex justify-between gap-3">
              <h2 className="font-bold text-slate-950">{question.text}</h2>
              <span className="shrink-0 font-extrabold text-teal-700">{question.answer?.score ?? 0}%</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">{question.answer?.content || 'No answer submitted'}</p>
            <p className="mt-3 rounded-md bg-slate-50 p-3 text-sm text-slate-700">{question.answer?.feedback || 'Feedback pending'}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
