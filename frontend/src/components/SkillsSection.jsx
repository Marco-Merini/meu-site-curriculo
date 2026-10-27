import { Code2, Server, Layout, Database, Sparkles, Star, Info } from 'lucide-react';

const ICON_MAP = {
  Code2,
  Server,
  Layout,
  Database,
  Sparkles,
};

export function SkillsSection({ habilidades }) {
  return (
    <section
      id="habilidades"
      aria-labelledby="habilidades-heading"
      className="py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 text-left">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              03 // Habilidades Técnicas
            </span>
            <h2
              id="habilidades-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white"
            >
              Stack organizada por domínio e contexto real de aplicação
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
              Sem barras de progresso arbitrárias: cada tecnologia é identificada pelo contexto prático em que foi utilizada (experiência profissional corporativa, projeto autoral NutrIA ou desenvolvimento deste portfólio).
            </p>
          </div>

          {/* Legenda de Destaque */}
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs dark:border-slate-800 dark:bg-[#0f1623]">
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
              <Star className="h-3.5 w-3.5 fill-emerald-500/20" aria-hidden="true" />
              Destaque:
            </span>
            <span className="text-slate-600 dark:text-slate-300">
              Tecnologias centrais em experiência profissional e no NutrIA
            </span>
          </div>
        </div>

        {/* Categorias de Habilidades */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
          {habilidades.map((cat) => {
            const IconComponent = ICON_MAP[cat.icone] || Code2;
            return (
              <div
                key={cat.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition-colors hover:border-emerald-500/40 dark:border-slate-800 dark:bg-[#0f1623]"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {cat.categoria}
                    </h3>
                  </div>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {cat.descricao}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {cat.itens.map((item) => (
                      <li
                        key={item.nome}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-1 rounded-xl border px-3.5 py-2.5 transition-colors ${
                          item.destaque
                            ? 'border-emerald-500/35 bg-emerald-500/5 dark:border-emerald-500/30 dark:bg-emerald-500/10'
                            : 'border-slate-200/80 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/70'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {item.destaque && (
                            <Star
                              className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400 fill-emerald-500/20"
                              aria-hidden="true"
                            />
                          )}
                          <span
                            className={`text-sm font-semibold ${
                              item.destaque
                                ? 'text-slate-900 dark:text-white'
                                : 'text-slate-700 dark:text-slate-200'
                            }`}
                          >
                            {item.nome}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                          {item.contexto}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nota de transparência sobre a stack */}
        <div className="mt-8 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-left text-xs text-slate-600 dark:border-slate-800 dark:bg-[#0d1320] dark:text-slate-400">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <p>
            <strong className="font-semibold text-slate-800 dark:text-slate-200">
              Transparência técnica:
            </strong>{' '}
            Minha experiência profissional consolidada concentra-se em <strong>C#, .NET, .NET MAUI Blazor Hybrid, SQL Server, Swagger API, Python, SQL e BigQuery</strong>, além da arquitetura completa em <strong>.NET 8, Blazor Server, EF Core e RAG</strong> demonstrada no projeto NutrIA. As tecnologias <strong>React, Tailwind CSS, Java 27 e Spring Boot</strong> compõem a arquitetura implementada especificamente para este portfólio.
          </p>
        </div>
      </div>
    </section>
  );
}
