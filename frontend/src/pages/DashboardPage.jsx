import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Save, Sparkles } from 'lucide-react';
import AppShell from '../components/AppShell';
import LoadingSpinner from '../components/LoadingSpinner';
import ResultPanel from '../components/ResultPanel';
import { generateContent, saveHistory } from '../api/client';
import useApiAuth from '../hooks/useApiAuth';

const initialForm = {
  jobDescription: '',
  skills: '',
};

function DashboardPage() {
  const { user } = useAuth0();
  const [formData, setFormData] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  useApiAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleGenerate = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSaveMessage('');

    try {
      const generated = await generateContent(formData);
      setResult(generated);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Failed to generate content.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result) {
      return;
    }

    setSaving(true);
    setSaveMessage('');
    try {
      await saveHistory({
        jobDescription: formData.jobDescription,
        skills: formData.skills,
        generatedContent: result,
      });
      setSaveMessage('Saved to history.');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Failed to save history.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppShell
      title="Build stronger career documents in minutes"
      subtitle={`Signed in as ${user?.name || 'career builder'}`}
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-3xl border border-white/10 bg-slate-900/65 p-6 backdrop-blur">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-accent/10 p-3 text-accent">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-white">Generation Workspace</h2>
              <p className="text-sm text-slate-400">Paste the target role and current skill set.</p>
            </div>
          </div>
          <form className="space-y-5" onSubmit={handleGenerate}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-200">Job Description</span>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                rows="10"
                placeholder="Paste the role description, responsibilities, and qualifications."
                className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-accent"
                required
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-200">Candidate Skills</span>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                rows="8"
                placeholder="List tools, programming languages, achievements, and domain strengths."
                className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-accent"
                required
              />
            </label>
            {error ? <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}
            {saveMessage ? <p className="rounded-2xl bg-accent/10 px-4 py-3 text-sm text-accent">{saveMessage}</p> : null}
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-ink transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate Content'}
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!result || saving}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {saving ? 'Saving...' : 'Save to History'}
              </button>
            </div>
          </form>
        </section>
        <section>
          {loading ? (
            <LoadingSpinner />
          ) : result ? (
            <ResultPanel result={result} />
          ) : (
            <div className="flex min-h-full items-center justify-center rounded-3xl border border-dashed border-white/10 bg-slate-900/40 p-10 text-center">
              <div>
                <p className="font-display text-2xl font-semibold text-white">Your generated content will appear here</p>
                <p className="mt-3 max-w-lg text-sm leading-7 text-slate-400">
                  Use the workspace to generate an AI-crafted summary, ATS skill list, project descriptions, and cover
                  letter tailored to the role.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}

export default DashboardPage;
