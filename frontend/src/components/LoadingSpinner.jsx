function LoadingSpinner({ label = 'Generating tailored content...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-white/10 bg-slate-900/65 px-6 py-12">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
      <p className="text-sm font-medium text-slate-300">{label}</p>
    </div>
  );
}

export default LoadingSpinner;
