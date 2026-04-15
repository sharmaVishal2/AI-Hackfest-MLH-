function ContentCard({ title, children, actions }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/65 p-6 backdrop-blur">
      <div className="mb-5 flex items-start justify-between gap-4">
        <h2 className="font-display text-xl font-semibold text-white">{title}</h2>
        {actions}
      </div>
      <div className="text-sm leading-7 text-slate-200">{children}</div>
    </section>
  );
}

export default ContentCard;
