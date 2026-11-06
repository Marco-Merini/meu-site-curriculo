import { ArrowUp } from 'lucide-react';

export function Footer({ perfil, contato }) {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 text-left dark:border-slate-800 dark:bg-[#070a12]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 font-mono text-xs font-bold text-emerald-400 dark:bg-slate-800">
              {perfil.iniciais}
            </span>
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {perfil.nomeCompleto}
              </span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {perfil.cargo || 'Desenvolvedor de Software'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <a
              href={contato.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              LinkedIn
            </a>
            <a
              href={contato.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              GitHub
            </a>
            <a
              href={`mailto:${contato.email}`}
              className="hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              E-mail
            </a>
            <a
              href={contato.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              WhatsApp
            </a>
            <a
              href="#inicio"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 transition-colors hover:border-emerald-500/40 hover:text-emerald-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              aria-label="Voltar ao topo da página"
            >
              Topo
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
