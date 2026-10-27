import { Briefcase, Calendar, Info, CheckCircle2 } from 'lucide-react';

export function ExperienceSection({ experiencias }) {
  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-heading"
      className="bg-slate-50/70 py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 dark:bg-[#0b101b] dark:border-slate-800/80"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-left">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            02 // Experiência Profissional
          </span>
          <h2
            id="experiencia-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white"
          >
            Atuação prática em desenvolvimento de aplicações e engenharia de dados
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Trajetória construída em ambientes reais de produto e operação, integrando interfaces, APIs, bancos de dados e automação de processos.
          </p>
        </div>

        {/* Linha do tempo */}
        <div className="mt-12 relative border-l-2 border-emerald-500/30 ml-3 sm:ml-6 space-y-10 pl-6 sm:pl-10">
          {experiencias.map((exp, index) => (
            <article
              key={exp.id}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs transition-colors hover:border-emerald-500/40 text-left dark:border-slate-800 dark:bg-[#0f1623]"
            >
              {/* Marcador na linha do tempo */}
              <span
                className={`absolute -left-[33px] sm:-left-[49px] top-7 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-slate-50 dark:ring-[#0b101b] ${
                  index === 0 ? 'bg-emerald-500' : 'bg-slate-400 dark:bg-slate-600'
                }`}
                aria-hidden="true"
              />

              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800/80">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                      <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                      {exp.tipo}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
                    {exp.cargo}{' '}
                    <span className="text-emerald-700 dark:text-emerald-400">@ {exp.empresa}</span>
                  </h3>
                </div>

                <div className="flex flex-col sm:items-end">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
                    <Calendar className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    {exp.periodo}
                  </span>
                  {exp.observacaoPeriodo && (
                    <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                      <Info className="h-3 w-3 shrink-0" aria-hidden="true" />
                      {exp.observacaoPeriodo}
                    </span>
                  )}
                </div>
              </div>

              {/* Lista de atribuições confirmadas */}
              <ul className="mt-5 space-y-2.5">
                {exp.atribuicoes.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2
                      className="mt-1 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tecnologias relevantes */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                  Tecnologias e ferramentas aplicadas:
                </span>
                <div className="flex flex-wrap gap-2">
                  {exp.tecnologias.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-xs font-medium text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
