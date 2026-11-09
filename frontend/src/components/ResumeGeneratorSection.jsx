import { useState } from 'react';
import { FileDown, Eye, EyeOff, Copy, Check, Loader2 } from 'lucide-react';
import {
  construirDadosCurriculoAts,
  gerarTextoCurriculoAts,
  baixarOuGerarCurriculoPdf,
} from '../utils/geradorCurriculoAts';

function AtsSectionHeading({ children }) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="h-3.5 w-1 shrink-0 rounded-none bg-[#173661] dark:bg-sky-400"
        />
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#173661] dark:text-sky-300">
          {children}
        </h4>
      </div>
      <div className="mt-1.5 flex items-center" aria-hidden="true">
        <span className="h-[2px] w-16 bg-[#173661] dark:bg-sky-400" />
        <span className="h-px flex-1 bg-slate-300 dark:bg-slate-700" />
      </div>
    </div>
  );
}

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

          {/* Prévia Executiva em Coluna Única (Padrão ATS) */}
          {previewOpen && (
            <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-800">
              <div
                aria-label="Pré-visualização do currículo executivo em formato ATS de coluna única"
                className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-slate-300 bg-white text-slate-900 shadow-sm dark:border-slate-700 dark:bg-[#0b101b] dark:text-slate-100"
              >
                {/* Faixa superior executiva em azul-marinho */}
                <div aria-hidden="true" className="h-1.5 w-full bg-[#173661] dark:bg-sky-500" />

                <div className="p-6 sm:p-10">
                  {/* 1. Cabeçalho Executivo */}
                  <header className="pb-4">
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-[#0F2440] dark:text-white">
                      {cv.nomeCompleto}
                    </h3>
                    <p className="mt-1 text-base sm:text-lg font-bold text-[#214A85] dark:text-sky-300">
                      {cv.tituloProfissional}
                    </p>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      {cv.localizacao} | Telefone / WhatsApp: {cv.telefone} | E-mail: {cv.email}
                    </p>
                    <p className="mt-0.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      LinkedIn: {cv.linkedinUrl} | GitHub: {cv.githubUrl}
                    </p>
                    <p className="mt-0.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      Portfólio: {cv.portfolioUrl}
                    </p>
                    <div aria-hidden="true" className="mt-4 space-y-0.5">
                      <div className="h-[1.5px] w-full bg-[#173661] dark:bg-sky-400" />
                      <div className="h-px w-full bg-slate-300 dark:bg-slate-700" />
                    </div>
                  </header>

                  <div className="mt-4 space-y-6 text-sm leading-relaxed">
                    {/* 2. Resumo Profissional */}
                    <section>
                      <AtsSectionHeading>RESUMO PROFISSIONAL</AtsSectionHeading>
                      <p className="text-slate-800 dark:text-slate-200">
                        {cv.resumoProfissional}
                      </p>
                    </section>

                    {/* 3. Experiência Profissional */}
                    <section>
                      <AtsSectionHeading>EXPERIÊNCIA PROFISSIONAL</AtsSectionHeading>
                      <div className="space-y-5">
                        {cv.experiencias.map((exp) => (
                          <div
                            key={exp.empresa}
                            className="border-l-2 border-[#173661]/70 pl-3.5 dark:border-sky-400/70"
                          >
                            <p className="text-sm sm:text-base">
                              <strong className="font-bold text-[#0F2440] dark:text-white">
                                {exp.empresa}
                              </strong>
                              <span className="text-slate-500 dark:text-slate-400"> — </span>
                              <strong className="font-bold text-[#214A85] dark:text-sky-300">
                                {exp.cargo}
                              </strong>{' '}
                              <span className="inline-block rounded bg-[#EBF2FC] px-2 py-0.5 text-xs font-bold text-[#173661] dark:bg-sky-950/70 dark:text-sky-300">
                                ({exp.periodo})
                              </span>
                            </p>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-800 dark:text-slate-200 marker:text-[#173661] dark:marker:text-sky-400">
                              {exp.atribuicoes.map((attr, idx) => (
                                <li key={idx}>{attr}</li>
                              ))}
                            </ul>
                            <p className="mt-2 text-slate-800 dark:text-slate-200">
                              <strong className="font-bold text-[#173661] dark:text-sky-300">
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
                      <AtsSectionHeading>FORMAÇÃO ACADÊMICA</AtsSectionHeading>
                      <div>
                        <p className="text-sm sm:text-base">
                          <strong className="font-bold text-[#0F2440] dark:text-white">
                            {cv.formacao.curso}
                          </strong>
                          <span className="text-slate-500 dark:text-slate-400"> — </span>
                          <strong className="font-bold text-[#214A85] dark:text-sky-300">
                            {cv.formacao.instituicao}
                          </strong>
                        </p>
                        <p className="mt-1 text-slate-600 dark:text-slate-300">
                          Status: {cv.formacao.conclusao} | Localização: {cv.formacao.localizacao}
                        </p>
                      </div>
                    </section>

                    {/* 5. Habilidades Técnicas */}
                    <section>
                      <AtsSectionHeading>HABILIDADES TÉCNICAS</AtsSectionHeading>
                      <div className="space-y-1.5 text-slate-800 dark:text-slate-200">
                        {cv.habilidades.map((cat) => (
                          <p key={cat.categoria} className="flex items-baseline gap-2">
                            <span
                              aria-hidden="true"
                              className="inline-block h-1.5 w-1.5 shrink-0 bg-[#214A85] dark:bg-sky-400"
                            />
                            <span>
                              <strong className="font-bold text-[#173661] dark:text-sky-300">
                                {cat.categoria}:
                              </strong>{' '}
                              {cat.itens.join(', ')}.
                            </span>
                          </p>
                        ))}
                      </div>
                    </section>

                    {/* 6. Idiomas */}
                    <section>
                      <AtsSectionHeading>IDIOMAS</AtsSectionHeading>
                      <p className="text-slate-800 dark:text-slate-200">
                        {cv.idiomas.map((i) => `${i.idioma}: ${i.nivel}`).join('  |  ')}
                      </p>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
