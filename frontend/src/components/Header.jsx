import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Terminal, MessageSquare } from 'lucide-react';

const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
];

export function Header({ theme, onToggleTheme, apiStatus }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#090d16]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs'
          : 'bg-white/75 dark:bg-[#090d16]/75 backdrop-blur-xs border-b border-slate-200/50 dark:border-slate-800/50'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Marca tipográfica */}
        <a
          href="#inicio"
          className="group flex items-center gap-3 rounded-lg py-1 pr-2 text-left transition-colors"
          aria-label="Marco Merini — Ir para o início"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 font-mono text-sm font-bold tracking-tight text-emerald-400 ring-1 ring-emerald-500/30 transition-transform group-hover:scale-105 dark:bg-slate-800">
            MM
          </span>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Marco Merini
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">
              <Terminal className="h-3 w-3 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              Engenharia de Software
            </span>
          </div>
        </a>

        {/* Navegação Desktop */}
        <nav aria-label="Navegação principal" className="hidden md:flex md:items-center md:gap-1 lg:gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-emerald-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Ações do cabeçalho */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status discreto de integração com a API */}
          <span
            className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
            title={
              apiStatus === 'online'
                ? 'Conectado à API Spring Boot (Java 27)'
                : apiStatus === 'loading'
                ? 'Sincronizando dados com a API...'
                : 'Modo de contingência local (API indisponível)'
            }
          >
            <span
              className={`h-2 w-2 rounded-full ${
                apiStatus === 'online'
                  ? 'bg-emerald-500'
                  : apiStatus === 'loading'
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-amber-500'
              }`}
              aria-hidden="true"
            />
            {apiStatus === 'online' ? 'API Java 27' : apiStatus === 'loading' ? 'Sincronizando' : 'Modo Local'}
          </span>

          {/* Alternância entre modo claro e escuro */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition-colors hover:border-emerald-500/40 hover:bg-slate-100 hover:text-emerald-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-500/40 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            title={theme === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" aria-hidden="true" />
            )}
          </button>

          {/* Botão de contato Desktop */}
          <a
            href="#contato"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Contato
          </a>

          {/* Botão Menu Mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition-colors hover:bg-slate-100 md:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-expanded={mobileMenuOpen}
            aria-controls="menu-mobile"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <nav
          id="menu-mobile"
          aria-label="Navegação mobile"
          className="border-t border-slate-200 bg-white px-4 pt-3 pb-5 shadow-lg md:hidden dark:border-slate-800 dark:bg-[#0d1320]"
        >
          <ul className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <a
              href="#contato"
              onClick={closeMobileMenu}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              Entrar em contato
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
