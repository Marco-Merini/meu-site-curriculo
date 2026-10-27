import {
  GraduationCap,
  Layers,
  Database,
  BrainCircuit,
  Globe,
  CheckCircle2,
  MapPin,
} from 'lucide-react';

const ICON_MAP = {
  GraduationCap,
  Layers,
  Database,
  BrainCircuit,
};

export function AboutSection({ perfil, formacao, idiomas }) {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-heading"
      className="py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl text-left">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            01 // Sobre Mim &amp; Formação
          </span>
          <h2
            id="sobre-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white"
          >
            Engenharia de software orientada a arquitetura, dados e sistemas reais
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Texto de Trajetória */}
          <div className="lg:col-span-7 space-y-4 text-left">
            {perfil.sobreMimParagrafos.map((paragrafo, index) => (
              <p
                key={index}
                className="text-base leading-relaxed text-slate-600 dark:text-slate-300"
              >
                {paragrafo}
              </p>
            ))}

            {/* Card de Formação Acadêmica Concluída */}
            <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 dark:border-emerald-500/25 dark:bg-emerald-500/10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                    <GraduationCap className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Graduação Concluída • {formacao.conclusao}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                      {formacao.grau} em {formacao.curso}
                    </h3>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {formacao.instituicao}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-2xs dark:bg-slate-900 dark:text-slate-300">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  Joinville, SC
                </span>
              </div>
              <p className="mt-3.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {formacao.resumo}
              </p>
            </div>
          </div>

          {/* Pilares de Competência e Idiomas */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 text-left">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {perfil.destaquesSobre.map((item) => {
                const IconComponent = ICON_MAP[item.icone] || Layers;
                return (
                  <div
                    key={item.titulo}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs transition-colors hover:border-emerald-500/40 dark:border-slate-800 dark:bg-[#0f1623]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                        <IconComponent className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          {item.titulo}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                          {item.descricao}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Idiomas */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-[#0d1320]">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Idiomas
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {idiomas.map((item) => (
                  <div
                    key={item.idioma}
                    className="rounded-lg border border-slate-200/80 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {item.idioma}
                    </p>
                    <p className="mt-0.5 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      {item.nivel}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
