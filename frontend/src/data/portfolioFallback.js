export const portfolioFallbackData = {
  perfil: {
    nomeCompleto: 'Marco Leone Merini',
    nomeExibicao: 'Marco Merini',
    iniciais: 'MM',
    titulo: 'Desenvolvedor de Software | Engenharia de Software',
    localizacao: 'Joinville, Santa Catarina, Brasil',
    apresentacaoHero:
      'Sou Marco Merini, desenvolvedor de software formado em Engenharia de Software. Trabalho na construção de soluções digitais, com experiência em aplicações web e multiplataforma, integração de APIs, bancos de dados e automação de dados. Transformo necessidades reais de operação e negócio em sistemas bem estruturados, funcionais e fáceis de manter.',
    sobreMimParagrafos: [
      'Graduado no Bacharelado em Engenharia de Software pela Católica de Santa Catarina — Centro Universitário (concluído em agosto de 2026), com atuação prática tanto no desenvolvimento de aplicações corporativas quanto em engenharia de dados.',
      'Na WTTI Sistemas, atuo no desenvolvimento full stack de aplicações com .NET MAUI Blazor Hybrid, SQL Server e Swagger API, participando diretamente de sistemas de apontamento de operações e separação de pedidos.',
      'Anteriormente, na Conta Azul, trabalhei com engenharia de dados na ingestão e automação de bases públicas (CNAE e CNPJ) com foco em qualidade de dados, além da otimização de custos de consultas no Google BigQuery integradas ao Metabase.',
      'Tenho interesse sólido em arquitetura de software, integração de sistemas, observabilidade e aplicações práticas de Inteligência Artificial — competências consolidadas no desenvolvimento do NutrIA, plataforma clínica com arquitetura RAG no ecossistema .NET 8.',
    ],
    destaquesSobre: [
      {
        titulo: 'Engenharia de Software Formada',
        descricao:
          'Bacharel em Engenharia de Software pela Católica de Santa Catarina (concluído em agosto de 2026), aplicando princípios de arquitetura modular, testes automatizados e CI/CD.',
        icone: 'GraduationCap',
      },
      {
        titulo: 'Desenvolvimento Full Stack & Híbrido',
        descricao:
          'Experiência prática com C#, .NET, Blazor Server e .NET MAUI Blazor Hybrid integrados a bancos relacionais SQL Server e APIs REST documentadas com Swagger.',
        icone: 'Layers',
      },
      {
        titulo: 'Engenharia de Dados & Automação',
        descricao:
          'Histórico na construção de pipelines de ingestão e validação de dados (CNPJ/CNAE) e otimização de consultas analíticas no BigQuery com Metabase.',
        icone: 'Database',
      },
      {
        titulo: 'Arquitetura RAG & IA Aplicada',
        descricao:
          'Implementação de busca semântica vetorial (FAISS e similaridade de cosseno), pseudonimização orientada à LGPD e auditoria de interações com LLMs.',
        icone: 'BrainCircuit',
      },
    ],
  },
  formacao: {
    grau: 'Bacharelado',
    curso: 'Engenharia de Software',
    instituicao: 'Católica de Santa Catarina — Centro Universitário',
    conclusao: 'Agosto de 2026',
    status: 'Concluído',
    resumo:
      'Formação superior concluída com ênfase em arquitetura de sistemas, engenharia de requisitos, qualidade de software, testes automatizados, bancos de dados e ciclo completo de entrega contínua.',
  },
  experiencias: [
    {
      id: 'wtti-sistemas',
      empresa: 'WTTI Sistemas',
      cargo: 'Desenvolvedor Trainee',
      periodo: '2025 – atual',
      observacaoPeriodo: 'Período sujeito à confirmação da data exata de término.',
      tipo: 'Desenvolvimento de Software',
      atribuicoes: [
        'Desenvolvimento de aplicações multiplataforma e web utilizando .NET MAUI Blazor Hybrid.',
        'Construção e manutenção de soluções integradas com banco de dados Microsoft SQL Server e documentação via Swagger API.',
        'Atuação direta em demandas de frontend e backend, conectando interfaces operacionais a regras de negócio e persistência.',
        'Participação ativa em projetos voltados ao apontamento de operações e à separação de pedidos.',
        'Trabalho com autonomia na análise e cumprimento de requisitos, implementação de melhorias contínuas e incorporação de feedbacks técnicos.',
      ],
      tecnologias: ['C#', '.NET', '.NET MAUI', 'Blazor Hybrid', 'SQL Server', 'Swagger API'],
    },
    {
      id: 'conta-azul',
      empresa: 'Conta Azul',
      cargo: 'Aprendiz de Engenharia de Dados',
      periodo: '2022 – 2024',
      observacaoPeriodo: null,
      tipo: 'Engenharia de Dados',
      atribuicoes: [
        'Otimização de custos de processamento e consultas no Google BigQuery para visualização analítica no Metabase.',
        'Ingestão e tratamento de dados do CNAE com rigoroso controle de qualidade e consistência.',
        'Desenvolvimento de fluxos de ingestão e automação de dados públicos do CNPJ.',
        'Contribuição direta para a redução do tempo de integração de dados e diminuição de chamados operacionais relacionados aos processos.',
      ],
      tecnologias: ['Python', 'SQL', 'BigQuery', 'Metabase', 'Ingestão de Dados', 'Automação'],
    },
  ],
  habilidades: [
    {
      id: 'linguagens',
      categoria: 'Linguagens de Programação',
      descricao: 'Linguagens aplicadas em ambientes corporativos, engenharia de dados e projetos autorais.',
      icone: 'Code2',
      itens: [
        { nome: 'C#', contexto: 'Experiência Profissional & NutrIA', destaque: true },
        { nome: 'SQL', contexto: 'Experiência Profissional & NutrIA', destaque: true },
        { nome: 'Python', contexto: 'Experiência Profissional (Dados)', destaque: false },
        { nome: 'JavaScript', contexto: 'Projetos & Desenvolvimento Web', destaque: false },
        { nome: 'TypeScript', contexto: 'Projetos & Desenvolvimento Web', destaque: false },
        { nome: 'Java', contexto: 'Aplicado na API deste Portfólio (JDK 27)', destaque: false },
      ],
    },
    {
      id: 'backend-multiplataforma',
      categoria: 'Backend & Aplicações Multiplataforma',
      descricao: 'Construção de APIs, serviços de negócio e aplicações híbridas.',
      icone: 'Server',
      itens: [
        { nome: '.NET / ASP.NET Core', contexto: 'Experiência Profissional & NutrIA (.NET 8)', destaque: true },
        { nome: '.NET MAUI', contexto: 'Experiência Profissional (WTTI)', destaque: true },
        { nome: 'Blazor Hybrid', contexto: 'Experiência Profissional (WTTI)', destaque: true },
        { nome: 'Spring Boot', contexto: 'Aplicado na API deste Portfólio', destaque: false },
      ],
    },
    {
      id: 'frontend-ui',
      categoria: 'Frontend & Estilização',
      descricao: 'Desenvolvimento de interfaces reativas, componentes e estilização responsiva.',
      icone: 'Layout',
      itens: [
        { nome: 'Blazor Server & MudBlazor', contexto: 'Projeto Autoral (NutrIA)', destaque: true },
        { nome: 'Angular', contexto: 'Conhecimento Técnico & Projetos', destaque: false },
        { nome: 'React', contexto: 'Aplicado neste Portfólio', destaque: false },
        { nome: 'Tailwind CSS', contexto: 'Aplicado neste Portfólio', destaque: false },
      ],
    },
    {
      id: 'dados-apis',
      categoria: 'Bancos de Dados, APIs & Observabilidade',
      descricao: 'Persistência relacional, documentação de contratos HTTP e telemetria operacional.',
      icone: 'Database',
      itens: [
        { nome: 'Microsoft SQL Server', contexto: 'Experiência Profissional & NutrIA', destaque: true },
        { nome: 'Entity Framework Core', contexto: 'Projeto Autoral (NutrIA)', destaque: true },
        { nome: 'Swagger / OpenAPI', contexto: 'Experiência Profissional & NutrIA', destaque: true },
        { nome: 'Serilog, Prometheus & Grafana', contexto: 'Projeto Autoral (NutrIA)', destaque: true },
        { nome: 'Docker & GitHub Actions', contexto: 'Projeto Autoral (NutrIA)', destaque: true },
      ],
    },
    {
      id: 'ia-rag',
      categoria: 'Inteligência Artificial & Arquitetura RAG',
      descricao: 'Recuperação semântica contextualizada, privacidade de dados e integração com LLMs.',
      icone: 'Sparkles',
      itens: [
        { nome: 'Arquitetura RAG', contexto: 'Projeto Autoral (NutrIA)', destaque: true },
        { nome: 'OpenAI API (gpt-4o-mini / text-embedding-3-small)', contexto: 'Projeto Autoral (NutrIA)', destaque: true },
        { nome: 'Busca Semântica (FAISS & Cosseno)', contexto: 'Projeto Autoral (NutrIA)', destaque: true },
        { nome: 'Pseudonimização & Auditoria de IA', contexto: 'Projeto Autoral (NutrIA)', destaque: true },
      ],
    },
  ],
  projetoDestaque: {
    nome: 'NutrIA',
    subtitulo: 'Sistema Web de Acompanhamento Clínico Nutricional com Assistente de IA e Arquitetura RAG',
    identificacao: 'Projeto Autoral Principal • Ecossistema C# .NET 8',
    licencaNota:
      'Projeto proprietário com direitos autorais reservados (© 2026 Marco Merini). Código e documentação técnica disponíveis para consulta pública no GitHub.',
    resumo:
      'Aplicação web desenvolvida em .NET 8 (projeto NutriFlow / NutrIA) voltada a nutricionistas para centralizar o acompanhamento clínico, a gestão de pacientes, o registro de evolução física e a elaboração de planos alimentares com apoio de Inteligência Artificial contextualizada.',
    problema:
      'No acompanhamento nutricional, informações essenciais do paciente — como anamneses, registros de sessões anteriores, evolução de medidas, alergias, medicamentos em uso e planos alimentares prévios — costumam ficar fragmentadas. Consultar e cruzar manualmente todo esse histórico durante o atendimento exige esforço elevado e consome tempo clínico.',
    solucao:
      'O NutrIA centraliza o prontuário em uma estrutura relacional no SQL Server e integra um assistente baseado em Retrieval-Augmented Generation (RAG). O sistema indexa o histórico de forma pseudonimizada e recupera trechos relevantes por busca vetorial combinada à inclusão obrigatória de dados críticos (alergias, medicamentos e dieta ativa), auxiliando o nutricionista na consulta rápida ao histórico com citação explícita das fontes.',
    avisoResponsabilidadeClinica:
      'O sistema atua exclusivamente como ferramenta de apoio à consulta e organização de informações pelo profissional de nutrição, não substituindo o julgamento clínico do nutricionista, não realizando diagnósticos autônomos e não prescrevendo tratamentos sem supervisão profissional.',
    repositorioUrl: 'https://github.com/Marco-Merini/NutrIA',
    readmeUrl: 'https://github.com/Marco-Merini/NutrIA/blob/main/README.md',
    documentacaoTecnicaUrl: 'https://github.com/Marco-Merini/NutrIA/blob/main/DOCUMENTACAO_TECNICA.md',
    demoUrl: null,
    tecnologiasPrincipais: [
      'C# .NET 8',
      'ASP.NET Core (Minimal APIs & Controllers)',
      'Blazor Interactive Server',
      'MudBlazor',
      'Microsoft SQL Server',
      'Entity Framework Core 8',
      'OpenAI API (gpt-4o-mini & text-embedding-3-small)',
      'FAISS & Cosine Similarity Fallback',
      'Serilog, Prometheus & Grafana',
      'Docker, GitHub Actions & AWS EC2',
    ],
    arquitetura: [
      {
        camada: 'Interface Web Reativa',
        tecnologias: 'Blazor Interactive Server + MudBlazor v8.15',
        descricao:
          'Renderização interativa via SignalR (WebSockets), gráficos de evolução de peso/IMC (MudChart) e controle de sessão com cookies HttpOnly.',
      },
      {
        camada: 'Backend & Regras de Negócio',
        tecnologias: 'ASP.NET Core 8.0 + Minimal APIs + BackgroundService',
        descricao:
          'Arquitetura em camadas (Endpoints, Services e Generic Repository), rate limiting no endpoint de IA e reindexação assíncrona com System.Threading.Channels.',
      },
      {
        camada: 'Persistência & Vector Store',
        tecnologias: 'Microsoft SQL Server + EF Core 8',
        descricao:
          'Armazenamento transacional de pacientes, sessões, progressos, planos alimentares, logs de auditoria (AuditLogs) e chunks de embeddings serializados.',
      },
      {
        camada: 'Motor RAG & Busca Semântica',
        tecnologias: 'OpenAI API + FAISS (IndexFlatL2) + TensorPrimitives',
        descricao:
          'Geração de embeddings de 1536 dimensões (text-embedding-3-small), busca vetorial em memória via FAISS com fallback automático para similaridade de cosseno e geração com gpt-4o-mini.',
      },
      {
        camada: 'Observabilidade & Entrega Contínua',
        tecnologias: 'Serilog + Prometheus + Grafana + GitHub Actions',
        descricao:
          'Logs estruturados com rotação diária, métricas expostas em /metrics, health check de banco em /health e pipeline CI/CD com testes xUnit, SonarCloud e Docker.',
      },
    ],
    diferenciais: [
      {
        titulo: 'Arquitetura RAG com Inclusão Clínica Forçada',
        descricao:
          'Além da busca semântica vetorial (limiar de score >= 0.25), o método GetForceChunks garante que alergias, medicamentos contínuos e o plano alimentar ativo sejam sempre incluídos no contexto enviado ao modelo, evitando omissões críticas.',
        icone: 'BrainCircuit',
      },
      {
        titulo: 'Busca Vetorial Híbrida (FAISS + Fallback Cosseno)',
        descricao:
          'Utiliza indexação em memória com FAISS (IndexFlatL2 via FaissMask) e aciona automaticamente o cálculo de similaridade de cosseno (System.Numerics.Tensors.TensorPrimitives) caso a biblioteca nativa não esteja disponível no ambiente.',
        icone: 'SearchCode',
      },
      {
        titulo: 'Privacidade e Pseudonimização (LGPD)',
        descricao:
          'Dados identificáveis diretos (nome, e-mail e telefone) são omitidos dos chunks persistidos e dos embeddings enviados à API externa. O mapeamento de identidade ocorre apenas em memória durante a sessão ativa.',
        icone: 'ShieldCheck',
      },
      {
        titulo: 'Auditoria e Guardrails contra Alucinações',
        descricao:
          'O prompt exige ancoragem estrita com citações no formato [Tabela:Id]. Cada interação é registrada na tabela AuditLogs com usuário, paciente, pergunta, fontes citadas, quantidade de chunks, latência e flags de conformidade.',
        icone: 'FileCheck2',
      },
      {
        titulo: 'Indexação Assíncrona em Background',
        descricao:
          'Uso de IndexacaoBackgroundService com System.Threading.Channels (fila bounded) para processar embeddings em segundo plano sem bloquear o salvamento de prontuários pelo nutricionista.',
        icone: 'Cpu',
      },
      {
        titulo: 'Segurança HTTP, Observabilidade e CI/CD',
        descricao:
          'Autenticação JWT em cookie HttpOnly/Strict, senhas com BCrypt, headers de segurança (CSP, X-Frame-Options), métricas Prometheus/Grafana e pipeline GitHub Actions com testes automatizados e SonarCloud.',
        icone: 'Activity',
      },
    ],
    fluxoRag: [
      {
        ordem: 1,
        etapa: 'Pseudonimização e Chunking',
        detalhe:
          'Prontuário, sessões, evolução e dietas são convertidos em blocos textuais sem nome, e-mail ou telefone do paciente.',
      },
      {
        ordem: 2,
        etapa: 'Vetorização (Embeddings 1536d)',
        detalhe:
          'O IndexacaoBackgroundService gera vetores com text-embedding-3-small em lotes e persiste na tabela Embeddings do SQL Server.',
      },
      {
        ordem: 3,
        etapa: 'Recuperação Híbrida + Chunks Críticos',
        detalhe:
          'Na consulta, o AIService combina os Top-K chunks via FAISS/Cosseno com dados vitais obrigatórios (alergias, remédios e dieta ativa).',
      },
      {
        ordem: 4,
        etapa: 'Resposta Ancorada e Auditada',
        detalhe:
          'O modelo gpt-4o-mini responde exclusivamente com base no contexto citando [Tabela:Id], e o AuditoriaService grava os metadados em AuditLogs.',
      },
    ],
    notasVerificacaoCodigo: [
      {
        item: 'Verificação Código vs. Documentação',
        status: 'Confirmado no repositório',
        observacao:
          'A estrutura em Program.cs, Services/AIService.cs e .github/workflows/ci.yml confirma o uso de .NET 8, Blazor Interactive Server, MudBlazor, EF Core SQL Server, Serilog, Prometheus, HealthCheck e pipeline CI/CD.',
      },
      {
        item: 'Escopo dos Indicadores de Benefício',
        status: 'Transparência documental',
        observacao:
          'As estimativas de ganho de tempo citadas na documentação acadêmica representam objetivos e análises de projeto (TCC), não métricas comerciais de produção em larga escala.',
      },
    ],
  },
  outrosProjetos: [
    {
      id: 'sistemas-operacionais-maui',
      titulo: 'Aplicações de Apontamento de Operações e Separação de Pedidos',
      contexto: 'Experiência Profissional • WTTI Sistemas',
      periodo: '2025 – atual',
      resumo:
        'Desenvolvimento e evolução de aplicações voltadas a rotinas operacionais de apontamento de operações e separação de pedidos, integrando interfaces híbridas a serviços de backend e banco de dados relacional.',
      entregasPrincipais: [
        'Construção de interfaces e fluxos operacionais utilizando .NET MAUI Blazor Hybrid.',
        'Integração entre camadas de frontend e backend com persistência em Microsoft SQL Server.',
        'Utilização e documentação de endpoints REST com Swagger API.',
        'Implementação de requisitos funcionais, melhorias contínuas e ajustes baseados em feedbacks de uso.',
      ],
      tecnologias: ['C#', '.NET MAUI', 'Blazor Hybrid', 'SQL Server', 'Swagger API'],
      notaConfidencialidade:
        'Projeto corporativo interno. Em respeito à propriedade intelectual e à confidencialidade da empresa, código-fonte, capturas de tela e URLs internas não são expostos publicamente.',
    },
    {
      id: 'engenharia-dados-ingestao-bigquery',
      titulo: 'Automação de Ingestão de Dados (CNPJ/CNAE) e Otimização no BigQuery',
      contexto: 'Experiência Profissional • Conta Azul',
      periodo: '2022 – 2024',
      resumo:
        'Atuação em engenharia de dados com foco na ingestão automatizada de bases públicas, confiabilidade de dados e eficiência de custos em consultas analíticas.',
      entregasPrincipais: [
        'Automação de processos de ingestão e atualização de dados públicos do CNPJ.',
        'Ingestão estruturada de dados do CNAE com validações voltadas à qualidade dos dados.',
        'Otimização de custos de consultas e estruturas no Google BigQuery consumidas pelo Metabase.',
        'Contribuição para reduzir o tempo de integração de dados e o volume de chamados relacionados aos processos.',
      ],
      tecnologias: ['Python', 'SQL', 'Google BigQuery', 'Metabase', 'Qualidade de Dados', 'Automação'],
      notaConfidencialidade:
        'Trabalho realizado em ambiente corporativo. Descrições restritas às responsabilidades confirmadas em currículo, sem exposição de dados ou arquitetura proprietária.',
    },
  ],
  idiomas: [
    {
      idioma: 'Português',
      nivel: 'Nativo',
      descricao: 'Comunicação técnica, documentação arquitetural e colaboração em equipes de engenharia.',
    },
    {
      idioma: 'Inglês',
      nivel: 'Intermediário',
      descricao: 'Leitura de documentação técnica, referências de arquitetura, APIs e ferramentas de desenvolvimento.',
    },
    {
      idioma: 'Espanhol',
      nivel: 'Básico',
      descricao: 'Compreensão básica de leitura e comunicação elementar.',
    },
  ],
  contato: {
    email: 'marcoleonemerini@gmail.com',
    telefoneExibicao: '(47) 99173-7051',
    telefoneInternacional: '+55 47 99173-7051',
    whatsappUrl: 'https://wa.me/5547991737051',
    linkedinUrl: 'https://www.linkedin.com/in/marcomerini/',
    githubUrl: 'https://github.com/Marco-Merini',
    localizacao: 'Joinville, Santa Catarina, Brasil',
  },
};
