import { useState } from 'react';
import {
  ArrowRight,
  MapPin,
  GraduationCap,
  Code2,
  Database,
  BrainCircuit,
  ExternalLink,
  CheckCircle2,
  Layers,
} from 'lucide-react';

export function HeroSection({ perfil, formacao, contato }) {
  const [activeLayer, setActiveLayer] = useState('rag');

  const architecturePreviewLayers = {
    rag: {
      badge: 'NutrIA • Motor RAG (.NET 8)',
      title: 'Recuperação Semântica & Contexto Clínico',
      code: `// AIService.cs — Busca Híbrida + Inclusão Clínica Forçada
var semanticChunks = await SearchFaissOrCosineAsync(patientId, queryVec, threshold: 0.25f);
var vitalChunks = GetForceChunks(patientId); // Alergias, remédios e dieta ativa
var context = MergeDistinctChunks(semanticChunks, vitalChunks);

var response = await CompleteWithGroundedCitationsAsync(context, pseudonymizedPrompt);
await _auditoriaService.RegistrarInteracaoAsync(userId, patientId, response);`,
      metrics: [
        { label: 'Embeddings', value: '1536 dim (text-embedding-3-small)' },
        { label: 'Busca Vetorial', value: 'FAISS IndexFlatL2 + Cosine Fallback' },
        { label: 'Privacidade', value: 'Pseudonimização local (LGPD)' },
      ],
    },
    fullstack: {
      badge: 'Aplicações Corporativas & Híbridas',
      title: '.NET MAUI Blazor Hybrid & SQL Server',
      code: `// Integração de Operações, APIs REST e Persistência Relacional
builder.Services.AddMauiBlazorWebView();
builder.Services.AddDbContext<OperationalDbContext>(opt =>
    opt.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

// Documentação de contratos HTTP via Swagger / OpenAPI
app.UseSwagger();
app.UseSwaggerUI();`,
      metrics: [
        { label: 'Atuação', value: 'WTTI Sistemas (Frontend & Backend)' },
        { label: 'Domínio', value: 'Apontamento de operações e pedidos' },
        { label: 'Persistência', value: 'Microsoft SQL Server & EF Core' },
      ],
    },
    dados: {
      badge: 'Engenharia de Dados & Automação',
      title: 'Pipelines CNPJ/CNAE & Otimização BigQuery',
      code: `-- Otimização de custos e consultas analíticas para Metabase
SELECT cnae_fiscal, situacao_cadastral, COUNT(*) AS total_empresas
FROM \`analytics.cadastro_publico.cnpj_consolidado\`
WHERE data_ingestao >= CURRENT_DATE() - INTERVAL 30 DAY
GROUP BY cnae_fiscal, situacao_cadastral;`,
      metrics: [
        { label: 'Experiência', value: 'Conta Azul (2022–2024)' },
        { label: 'Fontes', value: 'Ingestão automatizada CNPJ e CNAE' },
        { label: 'Analytics', value: 'Google BigQuery & Metabase' },
      ],
    },
  };

  const currentLayer = architecturePreviewLayers[activeLayer];

  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/50 py-14 sm:py-20 lg:py-24 dark:border-slate-800/80 dark:from-[#090d16] dark:via-[#0c121e] dark:to-[#090d16]"
    >
      {/* Grade arquitetural sutil no fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#94a3b815_1px,transparent_1px),linear-gradient(to_bottom,#94a3b815_1px,transparent_1px)] bg-[size:32px_32px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Coluna Esquerda: Apresentação Profissional */}
          <div className="lg:col-span-7 text-left">
            <div className="mb-5 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-300">
                <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                {formacao.grau} em {formacao.curso} • {formacao.status} ({formacao.conclusao})
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                {perfil.localizacao}
              </span>
            </div>

            <h1
              id="hero-heading"
              className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[52px] lg:leading-[1.12] dark:text-white"
            >
              {perfil.nomeCompleto}
            </h1>

            <p className="mt-3 text-lg font-semibold text-emerald-700 sm:text-xl dark:text-emerald-400">
              {perfil.titulo}
            </p>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              {perfil.apresentacaoHero}
            </p>

            {/* Botões principais de ação */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#projetos"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500"
              >
                Ver projetos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#contato"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-emerald-500/50 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-emerald-500/50 dark:hover:bg-slate-800"
              >
                Entrar em contato
              </a>
            </div>

            {/* Links diretos LinkedIn e GitHub */}
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-200/80 pt-6 dark:border-slate-800/80">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Perfis oficiais:
              </span>
              <a
                href={contato.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-500/40 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-500/40 dark:hover:text-emerald-400"
              >
                <Code2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                GitHub (@Marco-Merini)
                <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
              </a>
              <a
                href={contato.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-500/40 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-500/40 dark:hover:text-emerald-400"
              >
                <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                LinkedIn (/in/marcomerini)
                <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Coluna Direita: Elemento Gráfico Original de Arquitetura de Software e Identidade */}
          <div className="lg:col-span-5">
            <div
              className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-md dark:border-slate-800 dark:bg-[#0f1623]"
              role="region"
              aria-label="Painel interativo de arquitetura e competências de engenharia de software"
            >
              {/* Cabeçalho do Card Arquitetural com Monograma MM */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 font-mono text-base font-bold text-emerald-400 ring-1 ring-emerald-500/30 dark:bg-slate-800"
                    aria-hidden="true"
                  >
                    {perfil.iniciais}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      Arquitetura &amp; Engenharia
                    </p>
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      C# • .NET 8 • Blazor • SQL Server • RAG
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Verificado
                </span>
              </div>

              {/* Seletores de domínio técnico */}
              <div className="mt-4 grid grid-cols-3 gap-1.5 rounded-xl bg-slate-100 p-1 dark:bg-slate-900" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeLayer === 'rag'}
                  onClick={() => setActiveLayer('rag')}
                  className={`flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors ${
                    activeLayer === 'rag'
                      ? 'bg-white text-emerald-700 shadow-xs dark:bg-slate-800 dark:text-emerald-400'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <BrainCircuit className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">NutrIA RAG</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeLayer === 'fullstack'}
                  onClick={() => setActiveLayer('fullstack')}
                  className={`flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors ${
                    activeLayer === 'fullstack'
                      ? 'bg-white text-emerald-700 shadow-xs dark:bg-slate-800 dark:text-emerald-400'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <Code2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">.NET Hybrid</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeLayer === 'dados'}
                  onClick={() => setActiveLayer('dados')}
                  className={`flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors ${
                    activeLayer === 'dados'
                      ? 'bg-white text-emerald-700 shadow-xs dark:bg-slate-800 dark:text-emerald-400'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <Database className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">Dados &amp; SQL</span>
                </button>
              </div>

              {/* Bloco de código representativo */}
              <div className="mt-4 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    {currentLayer.badge}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2.5">
                  {currentLayer.title}
                </p>
                <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0b101b] p-3.5 font-mono text-xs leading-relaxed text-slate-200">
                  <code>{currentLayer.code}</code>
                </pre>
              </div>

              {/* Especificações da camada */}
              <dl className="mt-4 grid grid-cols-1 gap-2 border-t border-slate-200 pt-3.5 text-left dark:border-slate-800">
                {currentLayer.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5 text-xs dark:bg-slate-900/80"
                  >
                    <dt className="font-medium text-slate-500 dark:text-slate-400">{m.label}</dt>
                    <dd className="font-mono font-semibold text-slate-800 dark:text-slate-200">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
