export function AboutSection({ perfil }) {
  const paragrafos = perfil.sobreMimParagrafos || [];

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-heading"
      className="border-b border-slate-200/80 py-16 sm:py-20 dark:border-slate-800/80"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            Sobre mim
          </span>
          <h2
            id="sobre-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
          >
            Trajetória Profissional
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {paragrafos.map((paragrafo, index) => (
              <p key={index}>{paragrafo}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
