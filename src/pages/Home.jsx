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
        <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Utility suite</p>
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
          Utility Tools
        </h1>
        <p className="text-base text-ink/60">
          Calm, focused tools for distraction-free sessions.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            to={tool.path}
            className="group rounded-[28px] border border-ink/10 bg-white/80 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:border-ink/20 hover:bg-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-ink">{tool.title}</h2>
                <p className="text-sm text-ink/55">{tool.description}</p>
              </div>
              <span className="rounded-full border border-ink/10 bg-white/80 px-3 py-1 text-xs font-semibold text-ink/60 transition group-hover:text-ink">
                Open
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
