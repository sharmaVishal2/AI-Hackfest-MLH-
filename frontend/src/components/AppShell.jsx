import { LogOut, Sparkles, History } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function AppShell({ title, subtitle, children }) {
  const { logout, user } = useAuth0();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-grid bg-[size:42px_42px]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl border border-white/10 bg-white/5 px-6 py-5 shadow-glow backdrop-blur">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-accent/15 p-3 text-accent">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-white">Smart Career Assistant</p>
                  <p className="text-sm text-slate-300">{subtitle}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 p-2">
                <Link
                  to="/dashboard"
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    location.pathname === '/dashboard' ? 'bg-accent text-ink' : 'text-slate-300'
                  }`}
                >
                  Workspace
                </Link>
                <Link
                  to="/history"
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                    location.pathname === '/history' ? 'bg-accent text-ink' : 'text-slate-300'
                  }`}
                >
                  <History className="h-4 w-4" />
                  History
                </Link>
              </nav>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{user?.name}</p>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="font-display text-3xl font-bold text-white">{title}</h1>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

export default AppShell;
