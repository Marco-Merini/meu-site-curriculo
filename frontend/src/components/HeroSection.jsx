import { ArrowRight, MapPin, ExternalLink } from 'lucide-react';
import profilePhoto from '../assets/marco-merini.jpg';

function renderTextWithBold(text) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-slate-900 dark:text-slate-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function HeroSection({ perfil, contato }) {
  const paragrafos = perfil.apresentacaoParagrafos || [];

  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/60 to-slate-100/40 py-14 sm:py-20 lg:py-24 dark:border-slate-800/80 dark:from-[#090d16] dark:via-[#0c121e] dark:to-[#090d16]"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Coluna Principal: Apresentação */}
          <div className="order-2 lg:order-1 lg:col-span-7 xl:col-span-8 text-left">
            {/* Localização */}
            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-medium text-slate-600 shadow-2xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              {perfil.localizacao}
            </div>

            {/* Nome e Título */}
            <h1
              id="hero-heading"
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[48px] lg:leading-[1.12] dark:text-white"
            >
              {perfil.nomeCompleto}
            </h1>

            <p className="mt-3 text-lg font-semibold text-emerald-700 sm:text-xl dark:text-emerald-400">
              {perfil.titulo}
            </p>

            {/* Apresentação Principal */}
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600 sm:text-[17px] dark:text-slate-300">
              {paragrafos.map((paragrafo, index) => (
                <p key={index}>{renderTextWithBold(paragrafo)}</p>
              ))}
            </div>

            {/* Botões principais */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#projetos"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500"
              >
                Conheça meus projetos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#contato"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-emerald-500/50 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-emerald-500/50 dark:hover:bg-slate-800"
              >
                Entre em contato
              </a>
            </div>

            {/* Links para LinkedIn e GitHub */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-200/80 pt-6 dark:border-slate-800/80">
              <a
                href={contato.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-500/40 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-500/40 dark:hover:text-emerald-400"
              >
                LinkedIn
                <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
              </a>
              <a
                href={contato.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-500/40 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-500/40 dark:hover:text-emerald-400"
              >
                GitHub
                <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Coluna da Foto de Perfil */}
          <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-56 sm:w-64 lg:w-full max-w-xs">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-emerald-500/5 to-transparent blur-md"
              />
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-2 shadow-md dark:border-slate-800 dark:bg-[#0f1623]">
                <img
                  src={profilePhoto}
                  alt="Foto de perfil de Marco Leone Merini"
                  className="aspect-[4/5] w-full rounded-xl object-cover object-top"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
