import { Link } from 'react-router-dom';

const tools = [
  {
    title: 'Number Generator',
    description: 'Random numbers at your own pace.',
    path: '/numbers',
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-ink/60">Utility suite</p>
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Utility Tools</h1>
        <p className="text-base text-ink/70">
          A minimalist set of focused helpers built for quick, distraction-free sessions.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            to={tool.path}
            className="group rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-ink/20 hover:bg-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-ink">{tool.title}</h2>
                <p className="text-sm text-ink/60">{tool.description}</p>
              </div>
              <span className="text-sm font-semibold text-ink/60 transition group-hover:text-ink">
                Open →
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
