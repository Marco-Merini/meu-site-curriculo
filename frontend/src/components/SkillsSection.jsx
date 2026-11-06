import { Code2, Server, Layout, Database, Wrench, Sparkles } from 'lucide-react';

const ICON_MAP = {
  Code2,
  Server,
  Layout,
  Database,
  Wrench,
  Sparkles,
};

export function SkillsSection({ habilidades }) {
  return (
    <section
      id="habilidades"
      aria-labelledby="habilidades-heading"
      className="border-b border-slate-200/80 bg-slate-50/70 py-16 sm:py-20 dark:border-slate-800/80 dark:bg-[#0b101b]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            Competências
          </span>
          <h2
            id="habilidades-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
          >
            Habilidades Técnicas
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {habilidades.map((cat) => {
            const IconComponent = ICON_MAP[cat.icone] || Code2;
            const itens = cat.itens || [];

            return (
              <div
                key={cat.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition-colors hover:border-emerald-500/40 dark:border-slate-800 dark:bg-[#0f1623]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                    <IconComponent className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {cat.categoria}
                  </h3>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {itens.map((item) => {
                    const nome = typeof item === 'string' ? item : item.nome;
                    return (
                      <span
                        key={nome}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/70 dark:text-slate-200"
                      >
                        {nome}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
