import { Terminal, ArrowUp } from 'lucide-react';

export function Footer({ perfil, formacao, contato }) {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 text-left dark:border-slate-800 dark:bg-[#070a12]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 font-mono text-xs font-bold text-emerald-400 dark:bg-slate-800">
                {perfil.iniciais}
              </span>
              <span className="text-base font-bold text-slate-900 dark:text-white">
                {perfil.nomeCompleto}
              </span>
            </div>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              {perfil.titulo} • {formacao.grau} em {formacao.curso} ({formacao.instituicao}, {formacao.conclusao})
            </p>
            <p className="mt-1 flex items-center gap-1.5 font-mono text-[11px] text-slate-400 dark:text-slate-500">
              <Terminal className="h-3 w-3 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              Portfólio construído com React, Tailwind CSS, Vite e Java 27 + Spring Boot
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <a
              href={contato.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              GitHub
            </a>
            <a
              href={contato.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              LinkedIn
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
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700 transition-colors hover:border-emerald-500/40 hover:text-emerald-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
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
