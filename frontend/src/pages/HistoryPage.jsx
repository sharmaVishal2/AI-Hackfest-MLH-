import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AppShell from '../components/AppShell';
import ContentCard from '../components/ContentCard';
import CopyButton from '../components/CopyButton';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchHistory } from '../api/client';
import useApiAuth from '../hooks/useApiAuth';
import { joinSections } from '../utils/formatters';

function HistoryPage() {
  const { user } = useAuth0();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useApiAuth();

  useEffect(() => {
    const loadHistory = async () => {
      if (!user?.sub) {
        setLoading(false);
        return;
      }

      try {
        const items = await fetchHistory(user.sub);
        setHistory(items);
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Failed to load history.');
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [user?.sub]);

  return (
    <AppShell title="Generation history" subtitle="Review and reuse prior tailored applications">
      {loading ? <LoadingSpinner label="Loading your saved generations..." /> : null}
      {!loading && error ? <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}
      {!loading && !error ? (
        <div className="space-y-5">
          {history.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/45 p-10 text-center text-slate-400">
              No saved generations yet.
            </div>
          ) : (
            history.map((item) => (
              <div key={item.id} className="rounded-3xl border border-white/10 bg-slate-900/65 p-6 backdrop-blur">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-white">Saved career package</h2>
                    <p className="mt-1 text-sm text-slate-400">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <CopyButton
                    text={joinSections([
                      item.generatedContent.summary,
                      item.generatedContent.atsSkills.join('\n'),
                      item.generatedContent.projectDescriptions.join('\n\n'),
                      item.generatedContent.coverLetter,
                    ])}
                  />
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <ContentCard title="Job Description">
                    <p className="whitespace-pre-line">{item.jobDescription}</p>
                  </ContentCard>
                  <ContentCard title="Candidate Skills">
                    <p className="whitespace-pre-line">{item.skills}</p>
                  </ContentCard>
                  <ContentCard title="Summary">
                    <p>{item.generatedContent.summary}</p>
                  </ContentCard>
                  <ContentCard title="ATS-Optimized Skills">
                    <ul className="grid gap-3">
                      {item.generatedContent.atsSkills.map((skill) => (
                        <li key={skill} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </ContentCard>
                  <ContentCard title="Project Descriptions">
                    <div className="space-y-3">
                      {item.generatedContent.projectDescriptions.map((project) => (
                        <div key={project} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          {project}
                        </div>
                      ))}
                    </div>
                  </ContentCard>
                  <ContentCard title="Cover Letter">
                    <p className="whitespace-pre-line">{item.generatedContent.coverLetter}</p>
                  </ContentCard>
                </div>
              </div>
            ))
          )}
        </div>
      ) : null}
    </AppShell>
  );
}

export default HistoryPage;
