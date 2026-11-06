import { ExternalLink, CheckCircle2, Sparkles, Briefcase } from 'lucide-react';

export function ProjectsSection({ projetoDestaque, outrosProjetos }) {
  const funcionalidades = projetoDestaque.funcionalidades || [];
  const tecnologias = projetoDestaque.tecnologias || projetoDestaque.tecnologiasPrincipais || [];

  return (
    <section
      id="projetos"
      aria-labelledby="projetos-heading"
      className="border-b border-slate-200/80 py-16 sm:py-20 dark:border-slate-800/80"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            Portfólio
          </span>
          <h2
            id="projetos-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
          >
            Projetos
          </h2>
        </div>

        {/* Card Principal: NutrIA */}
        <article
          aria-labelledby="nutria-heading"
          className="mt-10 rounded-2xl border border-emerald-500/40 bg-white p-6 sm:p-8 shadow-xs text-left dark:border-emerald-500/30 dark:bg-[#0f1623]"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {projetoDestaque.categoria || 'Projeto Autoral em Destaque'}
              </span>

              <h3
                id="nutria-heading"
                className="mt-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white"
              >
                {projetoDestaque.titulo || projetoDestaque.nome}
              </h3>

              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {projetoDestaque.descricao || projetoDestaque.resumo}
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={projetoDestaque.repositorioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500"
              >
                Ver projeto no GitHub
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Objetivo e Principais Funcionalidades */}
          <div className="mt-6 grid grid-cols-1 gap-6 border-t border-slate-100 pt-6 lg:grid-cols-12 dark:border-slate-800">
            {projetoDestaque.objetivo && (
              <div className="lg:col-span-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Objetivo
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {projetoDestaque.objetivo}
                </p>
              </div>
            )}

            {funcionalidades.length > 0 && (
              <div className={projetoDestaque.objetivo ? 'lg:col-span-7' : 'lg:col-span-12'}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Principais Funcionalidades
                </h4>
                <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {funcionalidades.map((func, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                        aria-hidden="true"
                      />
                      <span>{func}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tecnologias Utilizadas */}
          <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
            <div className="flex flex-wrap gap-2">
              {tecnologias.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs font-medium text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Trabalhos Desenvolvidos em Experiências Profissionais */}
        {outrosProjetos && outrosProjetos.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 text-left">
            {outrosProjetos.map((proj) => (
              <article
                key={proj.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition-colors hover:border-emerald-500/40 dark:border-slate-800 dark:bg-[#0f1623]"
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    <Briefcase className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    {proj.empresa || proj.contexto}
                  </span>

                  <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                    {proj.titulo}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {proj.descricao || proj.resumo}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                  {proj.tecnologias.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
