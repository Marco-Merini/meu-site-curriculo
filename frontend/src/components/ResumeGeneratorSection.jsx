import { useState } from 'react';
import { FileDown, Eye, EyeOff, Copy, Check, Loader2 } from 'lucide-react';
import {
  construirDadosCurriculoAts,
  gerarTextoCurriculoAts,
  baixarOuGerarCurriculoPdf,
} from '../utils/geradorCurriculoAts';

export function ResumeGeneratorSection({ portfolioData }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const cv = construirDadosCurriculoAts(portfolioData);

  const handleGeneratePdf = async () => {
    setGenerating(true);
    try {
      await baixarOuGerarCurriculoPdf(portfolioData);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyAtsText = async () => {
    try {
      const texto = gerarTextoCurriculoAts(portfolioData);
      await navigator.clipboard.writeText(texto);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch {
      // Ignora caso o navegador restrinja acesso à área de transferência
    }
  };

  return (
    <section
      id="curriculo"
      aria-labelledby="curriculo-heading"
      className="border-b border-slate-200/80 py-16 sm:py-20 dark:border-slate-800/80"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs text-left dark:border-slate-800 dark:bg-[#0f1623]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                Gerador de Currículo
              </span>
              <h2
                id="curriculo-heading"
                className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
              >
                Currículo em PDF
              </h2>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Gere e baixe o meu currículo completo clicando no botão ao lado.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleGeneratePdf}
                disabled={generating}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-emerald-700 disabled:opacity-60 dark:bg-emerald-600 dark:hover:bg-emerald-500"
              >
                {generating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Gerando PDF...
                  </>
                ) : (
                  <>
                    <FileDown className="h-4 w-4" aria-hidden="true" />
                    Gerar Currículo em PDF
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setPreviewOpen((prev) => !prev)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-emerald-500/50 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-emerald-500/50 dark:hover:bg-slate-800"
              >
                {previewOpen ? (
                  <>
                    <EyeOff className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    Ocultar prévia
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    Visualizar currículo
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopyAtsText}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-emerald-500/40 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:text-emerald-400"
              >
                {copiedText ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    Texto copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    Copiar texto
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Prévia em Coluna Única (Padrão ATS) */}
          {previewOpen && (
            <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-800">
              <div
                aria-label="Pré-visualização do currículo em formato ATS de coluna única"
                className="mx-auto max-w-4xl rounded-xl border border-slate-300 bg-white p-6 sm:p-10 text-slate-900 shadow-xs dark:border-slate-700 dark:bg-[#0b101b] dark:text-slate-100"
              >
                {/* 1. Cabeçalho */}
                <header className="border-b border-slate-300 pb-4 dark:border-slate-700">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight uppercase">
                    {cv.nomeCompleto}
                  </h3>
                  <p className="mt-1 text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
                    {cv.tituloProfissional}
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {cv.localizacao} | Telefone / WhatsApp: {cv.telefone} | E-mail: {cv.email}
                  </p>
                  <p className="mt-0.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    LinkedIn: {cv.linkedinUrl} | GitHub: {cv.githubUrl}
                  </p>
                </header>

                <div className="mt-5 space-y-5 text-sm leading-relaxed">
                  {/* 2. Resumo Profissional */}
                  <section>
                    <h4 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-white">
                      RESUMO PROFISSIONAL
                    </h4>
                    <p className="mt-2 text-slate-700 dark:text-slate-300">
                      {cv.resumoProfissional}
                    </p>
                  </section>

                  {/* 3. Experiência Profissional */}
                  <section>
                    <h4 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-white">
                      EXPERIÊNCIA PROFISSIONAL
                    </h4>
                    <div className="mt-2.5 space-y-4">
                      {cv.experiencias.map((exp) => (
                        <div key={exp.empresa}>
                          <p className="font-bold text-slate-900 dark:text-white">
                            {exp.empresa} — {exp.cargo} ({exp.periodo})
                          </p>
                          <ul className="mt-1.5 list-disc space-y-1 pl-5 text-slate-700 dark:text-slate-300">
                            {exp.atribuicoes.map((attr, idx) => (
                              <li key={idx}>{attr}</li>
                            ))}
                          </ul>
                          <p className="mt-1.5 text-slate-700 dark:text-slate-300">
                            <strong className="font-semibold text-slate-900 dark:text-white">
                              Tecnologias:
                            </strong>{' '}
                            {exp.tecnologias.join(', ')}.
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* 4. Formação Acadêmica */}
                  <section>
                    <h4 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-white">
                      FORMAÇÃO ACADÊMICA
                    </h4>
                    <div className="mt-2">
                      <p className="font-bold text-slate-900 dark:text-white">
                        {cv.formacao.curso} — {cv.formacao.instituicao}
                      </p>
                      <p className="text-slate-700 dark:text-slate-300">
                        Status: {cv.formacao.conclusao} | Localização: {cv.formacao.localizacao}
                      </p>
                    </div>
                  </section>

                  {/* 5. Habilidades Técnicas */}
                  <section>
                    <h4 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-white">
                      HABILIDADES TÉCNICAS
                    </h4>
                    <div className="mt-2 space-y-1 text-slate-700 dark:text-slate-300">
                      {cv.habilidades.map((cat) => (
                        <p key={cat.categoria}>
                          <strong className="font-semibold text-slate-900 dark:text-white">
                            {cat.categoria}:
                          </strong>{' '}
                          {cat.itens.join(', ')}.
                        </p>
                      ))}
                    </div>
                  </section>

                  {/* 6. Projetos Relevantes */}
                  <section>
                    <h4 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-white">
                      PROJETOS RELEVANTES
                    </h4>
                    <div className="mt-2.5 space-y-4 text-slate-700 dark:text-slate-300">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">
                          {cv.projetoDestaque.titulo} (Projeto Autoral)
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          Repositório GitHub: {cv.projetoDestaque.repositorioUrl}
                        </p>
                        <p className="mt-1">{cv.projetoDestaque.descricao}</p>
                        <ul className="mt-1.5 list-disc space-y-1 pl-5">
                          {cv.projetoDestaque.funcionalidades.map((func, idx) => (
                            <li key={idx}>{func}.</li>
                          ))}
                        </ul>
                        <p className="mt-1.5">
                          <strong className="font-semibold text-slate-900 dark:text-white">
                            Tecnologias:
                          </strong>{' '}
                          {cv.projetoDestaque.tecnologias.join(', ')}.
                        </p>
                      </div>

                      {cv.outrosProjetos.map((proj) => (
                        <div key={proj.titulo}>
                          <p className="font-bold text-slate-900 dark:text-white">
                            {proj.titulo} ({proj.empresa})
                          </p>
                          <p className="mt-0.5">{proj.descricao}</p>
                          <p className="mt-1">
                            <strong className="font-semibold text-slate-900 dark:text-white">
                              Tecnologias:
                            </strong>{' '}
                            {proj.tecnologias.join(', ')}.
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* 7. Idiomas */}
                  <section>
                    <h4 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-white">
                      IDIOMAS
                    </h4>
                    <p className="mt-2 text-slate-700 dark:text-slate-300">
                      {cv.idiomas.map((i) => `${i.idioma}: ${i.nivel}`).join('  |  ')}
                    </p>
                  </section>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
