import { useEffect, useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { fetchPortfolioData } from './services/api';
import { portfolioFallbackData } from './data/portfolioFallback';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeGeneratorSection } from './components/ResumeGeneratorSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const [portfolioData, setPortfolioData] = useState(portfolioFallbackData);

  useEffect(() => {
    let active = true;

    fetchPortfolioData()
      .then((data) => {
        if (active && data && data.perfil) {
          setPortfolioData(data);
        }
      })
      .catch(() => {
        // Mantém os dados locais confirmados caso a API não esteja ativa no momento
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#090d16] dark:text-slate-100">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Pular para o conteúdo principal
      </a>

      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main id="conteudo-principal" className="flex-1">
        <HeroSection
          perfil={portfolioData.perfil}
          contato={portfolioData.contato}
        />
        <AboutSection perfil={portfolioData.perfil} />
        <ExperienceSection
          experiencias={portfolioData.experiencias}
          formacao={portfolioData.formacao}
          idiomas={portfolioData.idiomas}
        />
        <SkillsSection habilidades={portfolioData.habilidades} />
        <ProjectsSection
          projetoDestaque={portfolioData.projetoDestaque}
          outrosProjetos={portfolioData.outrosProjetos}
        />
        <ResumeGeneratorSection portfolioData={portfolioData} />
        <ContactSection contato={portfolioData.contato} />
      </main>

      <Footer
        perfil={portfolioData.perfil}
        contato={portfolioData.contato}
      />
    </div>
  );
}

export default App;
