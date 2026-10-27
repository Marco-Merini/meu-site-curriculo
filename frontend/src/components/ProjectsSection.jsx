import { useState } from 'react';
import {
  BrainCircuit,
  SearchCode,
  ShieldCheck,
  FileCheck2,
  Cpu,
  Activity,
  ExternalLink,
  BookOpen,
  Code2,
  CheckCircle2,
  AlertCircle,
  Lock,
  Layers,
  Database,
  Server,
  Sparkles,
  GitBranch,
  Briefcase,
} from 'lucide-react';

const DIFF_ICON_MAP = {
  BrainCircuit,
  SearchCode,
  ShieldCheck,
  FileCheck2,
  Cpu,
  Activity,
};

export function ProjectsSection({ projetoDestaque, outrosProjetos }) {
  const [activeTab, setActiveTab] = useState('diferenciais');

  return (
    <section
      id="projetos"
      aria-labelledby="projetos-heading"
      className="bg-slate-50/70 py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 dark:bg-[#0b101b] dark:border-slate-800/80"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl text-left">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            04 // Projetos &amp; Engenharia Aplicada
          </span>
          <h2
            id="projetos-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white"
          >
            Projeto Autoral em Destaque &amp; Soluções Profissionais
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Análise técnica aprofundada do <strong>NutrIA</strong> — plataforma clínica em .NET 8 com Inteligência Artificial e arquitetura RAG — seguida por entregas reais em ambientes corporativos.
          </p>
        </div>

        {/* =====================================================================
            CARD PRINCIPAL EM DESTAQUE: NUTRIA
        ===================================================================== */}
        <article
          aria-labelledby="nutria-heading"
          className="mt-10 overflow-hidden rounded-3xl border-2 border-emerald-500/40 bg-white shadow-md dark:border-emerald-500/35 dark:bg-[#0f1623] text-left"
        >
          {/* Faixa Superior de Identificação */}
          <div className="border-b border-slate-200 bg-gradient-to-r from-emerald-500/10 via-slate-50 to-white px-6 py-4 sm:px-8 dark:border-slate-800 dark:from-emerald-500/15 dark:via-[#0f1623] dark:to-[#0f1623]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-white">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Projeto em Destaque
                </span>
                <span className="font-mono text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  {projetoDestaque.identificacao}
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-500 dark:text-slate-400">
                <Lock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                Direitos autorais reservados © 2026 Marco Merini
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            {/* Cabeçalho do NutrIA e Links Principais */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="max-w-3xl">
                <h3
                  id="nutria-heading"
                  className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white"
                >
                  {projetoDestaque.nome}{' '}
                  <span className="text-lg sm:text-2xl font-semibold text-emerald-700 dark:text-emerald-400">
                    — {projetoDestaque.subtitulo}
                  </span>
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {projetoDestaque.resumo}
                </p>
              </div>

              {/* Botões de Repositório e Documentação */}
              <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
                <a
                  href={projetoDestaque.repositorioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                >
                  <Code2 className="h-4 w-4" aria-hidden="true" />
                  Ver código no GitHub
                  <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden="true" />
                </a>
                <a
                  href={projetoDestaque.documentacaoTecnicaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-emerald-500/50 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-emerald-500/50 dark:hover:bg-slate-800"
                >
                  <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  Ler documentação técnica
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Tags de Tecnologias do NutrIA */}
            <div className="mt-6 flex flex-wrap gap-2">
              {projetoDestaque.tecnologiasPrincipais.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 font-mono text-xs font-semibold text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Problema & Solução + Aviso de Responsabilidade Clínica */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6 dark:border-slate-800 dark:bg-[#0b101b]">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Problema que o projeto procura resolver
                </span>
                <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  {projetoDestaque.problema}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5 sm:p-6 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Abordagem de Engenharia &amp; Solução
                </span>
                <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-200">
                  {projetoDestaque.solucao}
                </p>
              </div>
            </div>

            {/* Aviso Ético / Supervisão Profissional */}
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <p>
                <strong className="font-semibold text-slate-800 dark:text-slate-200">
                  Escopo Clínico:
                </strong>{' '}
                {projetoDestaque.avisoResponsabilidadeClinica}
              </p>
            </div>

            {/* =================================================================
                NAVEGAÇÃO PROFUNDA DO NUTRIA (ABAS TÉCNICAS)
            ================================================================= */}
            <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-800">
              <div
                className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 dark:border-slate-800"
                role="tablist"
                aria-label="Seções técnicas do projeto NutrIA"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'diferenciais'}
                  onClick={() => setActiveTab('diferenciais')}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors ${
                    activeTab === 'diferenciais'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <BrainCircuit className="h-4 w-4" aria-hidden="true" />
                  Diferenciais Técnicos (RAG, LGPD &amp; CI/CD)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'arquitetura'}
                  onClick={() => setActiveTab('arquitetura')}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors ${
                    activeTab === 'arquitetura'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <Layers className="h-4 w-4" aria-hidden="true" />
                  Ilustração de Arquitetura &amp; Fluxo RAG
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'camadas'}
                  onClick={() => setActiveTab('camadas')}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors ${
                    activeTab === 'camadas'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <Server className="h-4 w-4" aria-hidden="true" />
                  Camadas &amp; Verificação de Código
                </button>
              </div>

              {/* ABA 1: Diferenciais Técnicos */}
              {activeTab === 'diferenciais' && (
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {projetoDestaque.diferenciais.map((dif) => {
                    const IconComp = DIFF_ICON_MAP[dif.icone] || BrainCircuit;
                    return (
                      <div
                        key={dif.titulo}
                        className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition-colors hover:border-emerald-500/40 dark:border-slate-800 dark:bg-[#0b101b]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                            <IconComp className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {dif.titulo}
                          </h4>
                        </div>
                        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          {dif.descricao}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ABA 2: Ilustração de Arquitetura e Fluxo RAG (Claramente Identificada como Ilustração Arquitetural) */}
              {activeTab === 'arquitetura' && (
                <div className="mt-6 space-y-6">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 dark:border-slate-800 dark:bg-[#0b101b]">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        Diagrama de Arquitetura • NutrIA (.NET 8 + RAG)
                      </span>
                      <span className="rounded-md bg-slate-200/80 px-2.5 py-0.5 font-mono text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        Representação Ilustrativa da Arquitetura Documentada
                      </span>
                    </div>

                    {/* Fluxo em 4 etapas do RAG */}
                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {projetoDestaque.fluxoRag.map((etapa) => (
                        <div
                          key={etapa.ordem}
                          className="relative rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#0f1623]"
                        >
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 font-mono text-xs font-bold text-white">
                            {etapa.ordem}
                          </span>
                          <h5 className="mt-2.5 text-sm font-bold text-slate-900 dark:text-white">
                            {etapa.etapa}
                          </h5>
                          <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                            {etapa.detalhe}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Topologia dos Componentes */}
                    <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
                      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#0f1623]">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                          Apresentação &amp; Sessão
                        </div>
                        <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                          Blazor Interactive Server + MudBlazor
                        </p>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                          Comunicação em tempo real via SignalR (WebSockets) e autenticação JWT protegida em Cookie HttpOnly / SameSite Strict.
                        </p>
                      </div>

                      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 dark:border-emerald-500/25 dark:bg-emerald-500/10">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                          <BrainCircuit className="h-4 w-4" aria-hidden="true" />
                          Núcleo RAG &amp; Background
                        </div>
                        <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                          AIService + IndexacaoBackgroundService
                        </p>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                          Busca vetorial FAISS (IndexFlatL2) + fallback de cosseno, fusão com GetForceChunks e geração com gpt-4o-mini.
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#0f1623]">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          <Database className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                          Dados &amp; Observabilidade
                        </div>
                        <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                          SQL Server + Serilog + Prometheus/Grafana
                        </p>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                          Persistência via EF Core 8 (prontuários, Embeddings e AuditLogs), métricas em /metrics e deploy automatizado via GitHub Actions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ABA 3: Camadas & Verificação de Código */}
              {activeTab === 'camadas' && (
                <div className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {projetoDestaque.arquitetura.map((item) => (
                      <div
                        key={item.camada}
                        className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-[#0b101b]"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {item.camada}
                          </h4>
                          <span className="rounded-md bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                            {item.tecnologias}
                          </span>
                        </div>
                        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                          {item.descricao}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Notas de Verificação entre Documentação e Código */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/70">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                      Notas de Integridade &amp; Verificação Técnica do Repositório
                    </h4>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {projetoDestaque.notasVerificacaoCodigo.map((nota) => (
                        <div
                          key={nota.item}
                          className="rounded-xl border border-slate-200/90 bg-white p-4 dark:border-slate-800 dark:bg-[#0f1623]"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {nota.item}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                              <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                              {nota.status}
                            </span>
                          </div>
                          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                            {nota.observacao}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Rodapé do Card NutrIA */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span>{projetoDestaque.licencaNota}</span>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={projetoDestaque.readmeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
                >
                  <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
                  README.md
                </a>
                <a
                  href={projetoDestaque.documentacaoTecnicaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
                >
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  DOCUMENTACAO_TECNICA.md
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* =====================================================================
            OUTROS TRABALHOS E PROJETOS RELEVANTES
        ===================================================================== */}
        <div className="mt-14 text-left">
          <h3 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
            Outros Trabalhos e Entregas Profissionais
          </h3>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
            Soluções desenvolvidas em contexto corporativo, descritas com fidelidade técnica e respeito à confidencialidade intelectual.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {outrosProjetos.map((proj) => (
              <article
                key={proj.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xs transition-colors hover:border-emerald-500/40 dark:border-slate-800 dark:bg-[#0f1623]"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      <Briefcase className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      {proj.contexto}
                    </span>
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      {proj.periodo}
                    </span>
                  </div>

                  <h4 className="mt-3.5 text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
                    {proj.titulo}
                  </h4>

                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {proj.resumo}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {proj.entregasPrincipais.map((entrega, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                          aria-hidden="true"
                        />
                        <span>{entrega}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {proj.tecnologias.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-0.5 font-mono text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="flex items-start gap-1.5 text-[11px] leading-normal text-slate-500 dark:text-slate-400">
                    <Lock className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                    <span>{proj.notaConfidencialidade}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
