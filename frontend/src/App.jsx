import { useEffect, useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useTheme } from './hooks/useTheme';
import { fetchPortfolioData } from './services/api';
import { portfolioFallbackData } from './data/portfolioFallback';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const [portfolioData, setPortfolioData] = useState(portfolioFallbackData);
  const [apiStatus, setApiStatus] = useState('loading'); // 'loading' | 'online' | 'offline'
  const [apiErrorDetail, setApiErrorDetail] = useState('');
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    let active = true;

    fetchPortfolioData()
      .then((data) => {
        if (!active) return;
        if (data && data.perfil) {
          setPortfolioData(data);
          setApiStatus('online');
          setApiErrorDetail('');
        } else {
          setApiStatus('offline');
          setApiErrorDetail('Resposta da API fora do formato esperado.');
        }
      })
      .catch((err) => {
        if (!active) return;
        setApiStatus('offline');
        setApiErrorDetail(
          err?.message || 'Não foi possível conectar ao servidor backend em localhost:8080.'
        );
      });

    return () => {
      active = false;
    };
  }, [reloadTrigger]);

  const handleReconnect = () => {
    setApiStatus('loading');
    setApiErrorDetail('');
    setReloadTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#090d16] dark:text-slate-100">
      {/* Link de salto para acessibilidade por teclado */}
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Pular para o conteúdo principal
      </a>

      <Header theme={theme} onToggleTheme={toggleTheme} apiStatus={apiStatus} />

      {/* Aviso transparente quando a API backend estiver indisponível */}
      {apiStatus === 'offline' && (
        <div
          role="status"
          aria-live="polite"
          className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-900 dark:border-amber-500/25 dark:bg-amber-950/40 dark:text-amber-200"
        >
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-left">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              <span>
                <strong>Modo de contingência ativo:</strong> A API backend (Spring Boot) não respondeu no momento ({apiErrorDetail}). Exibindo os dados profissionais confirmados a partir do módulo local.
              </span>
            </div>
            <button
              type="button"
              onClick={handleReconnect}
              className="inline-flex items-center gap-1.5 rounded-md border border-amber-600/30 bg-white/80 px-2.5 py-1 font-semibold text-amber-900 transition-colors hover:bg-white dark:border-amber-400/30 dark:bg-slate-900 dark:text-amber-200"
            >
              <RefreshCw className="h-3 w-3" aria-hidden="true" />
              Tentar reconectar
            </button>
          </div>
        </div>
      )}

      <main id="conteudo-principal" className="flex-1">
        <HeroSection
          perfil={portfolioData.perfil}
          formacao={portfolioData.formacao}
          contato={portfolioData.contato}
        />
        <AboutSection
          perfil={portfolioData.perfil}
          formacao={portfolioData.formacao}
          idiomas={portfolioData.idiomas}
        />
        <ExperienceSection experiencias={portfolioData.experiencias} />
        <SkillsSection habilidades={portfolioData.habilidades} />
        <ProjectsSection
          projetoDestaque={portfolioData.projetoDestaque}
          outrosProjetos={portfolioData.outrosProjetos}
        />
        <ContactSection contato={portfolioData.contato} />
      </main>

      <Footer
        perfil={portfolioData.perfil}
        formacao={portfolioData.formacao}
        contato={portfolioData.contato}
      />
    </div>
  );
}

export default App;
