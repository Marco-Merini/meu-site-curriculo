import { Calendar, GraduationCap, Globe } from 'lucide-react';

export function ExperienceSection({ experiencias, formacao, idiomas }) {
  return (
    <>
      {/* Seção de Experiência Profissional */}
      <section
        id="experiencia"
        aria-labelledby="experiencia-heading"
        className="border-b border-slate-200/80 bg-slate-50/70 py-16 sm:py-20 dark:border-slate-800/80 dark:bg-[#0b101b]"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Carreira
            </span>
            <h2
              id="experiencia-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
            >
              Experiência Profissional
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {experiencias.map((exp) => (
              <article
                key={exp.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xs transition-colors hover:border-emerald-500/40 text-left dark:border-slate-800 dark:bg-[#0f1623]"
              >
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800/80">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
                        {exp.empresa}
                      </h3>
                      <p className="mt-0.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                        {exp.cargo}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300">
                      <Calendar className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      {exp.periodo}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2.5">
                    {exp.atribuicoes.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-400"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800/80">
                  <div className="flex flex-wrap gap-2">
                    {exp.tecnologias.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-200"
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

      {/* Seção de Formação Acadêmica e Idiomas */}
      <section
        id="formacao"
        aria-labelledby="formacao-heading"
        className="border-b border-slate-200/80 py-16 sm:py-20 dark:border-slate-800/80"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 text-left">
            {/* Formação Acadêmica */}
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                Educação
              </span>
              <h2
                id="formacao-heading"
                className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
              >
                Formação Acadêmica
              </h2>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs dark:border-slate-800 dark:bg-[#0f1623]">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                    <GraduationCap className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {formacao.curso}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {formacao.instituicao}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      {formacao.conclusao}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Idiomas */}
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                Comunicação
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                Idiomas
              </h2>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs dark:border-slate-800 dark:bg-[#0f1623]">
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                  {idiomas.map((item) => (
                    <li
                      key={item.idioma}
                      className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
                    >
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                        <Globe className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                        {item.idioma}
                      </span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {item.nivel}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
