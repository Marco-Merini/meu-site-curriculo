export const portfolioFallbackData = {
  perfil: {
    nomeCompleto: 'Marco Leone Merini',
    nomeExibicao: 'Marco Merini',
    iniciais: 'MM',
    cargo: 'Desenvolvedor de Software',
    titulo: 'Desenvolvedor de Software | Engenharia de Software',
    localizacao: 'Joinville, Santa Catarina, Brasil',
    apresentacaoParagrafos: [
      'Sou **bacharel em Engenharia de Software pela Universidade Católica de Santa Catarina**, com atuação profissional no desenvolvimento de software e interesse em arquitetura de sistemas, engenharia de dados e otimização de processos. Busco desenvolver soluções tecnológicas eficientes, escaláveis e alinhadas às necessidades reais dos negócios.',
      'Ao longo da minha trajetória, adquiri experiência em diferentes áreas da tecnologia, participando de projetos que ampliaram minha visão sobre desenvolvimento de aplicações, integração de sistemas, bancos de dados e construção de soluções de ponta a ponta.',
      'Tenho experiência com tecnologias como **C#, .NET, JavaScript, TypeScript, Angular, SQL Server e APIs REST**, além de conhecimentos em diferentes ferramentas e abordagens utilizadas no desenvolvimento de software.',
      'Sou um profissional proativo, colaborativo e comprometido com a qualidade das entregas. Valorizo a autonomia na resolução de problemas, o trabalho em equipe e a troca de conhecimentos como parte fundamental da evolução profissional.',
      '**Acredito que desenvolver software vai além de escrever código: é compreender desafios, criar soluções inteligentes e gerar valor por meio da tecnologia.** Mantenho o compromisso com o aprendizado contínuo, o aprimoramento técnico e a busca por soluções que façam a diferença.',
    ],
    sobreMimParagrafos: [
      'Formado em Engenharia de Software, construí minha trajetória combinando o desenvolvimento de aplicações corporativas com a experiência prática em engenharia e integração de dados.',
      'Atualmente atuo como Desenvolvedor de Software na WTTI Sistemas, participando da construção de soluções com foco em operações e integração entre interfaces, APIs e banco de dados. Anteriormente, atuei na Conta Azul com engenharia de dados, trabalhando na automação de ingestão de bases públicas e na otimização de consultas analíticas.',
    ],
  },
  formacao: {
    curso: 'Bacharelado em Engenharia de Software',
    instituicao: 'Católica de Santa Catarina — Centro Universitário',
    conclusao: 'Concluído em agosto de 2026',
  },
  experiencias: [
    {
      id: 'wtti-sistemas',
      empresa: 'WTTI Sistemas',
      cargo: 'Desenvolvedor Trainee',
      periodo: '2025 – Atual',
      atribuicoes: [
        'Desenvolvimento de aplicações utilizando C# e .NET MAUI Blazor Hybrid.',
        'Integração entre frontend, backend, APIs e SQL Server.',
        'Participação no desenvolvimento de soluções de apontamento de operações e separação de pedidos.',
        'Implementação de melhorias e atendimento a requisitos de negócio.',
      ],
      tecnologias: ['C#', '.NET', '.NET MAUI', 'Blazor Hybrid', 'SQL Server', 'Swagger'],
    },
    {
      id: 'conta-azul',
      empresa: 'Conta Azul',
      cargo: 'Aprendiz de Engenharia de Dados',
      periodo: '2022 – 2024',
      atribuicoes: [
        'Desenvolvimento e automação de processos de ingestão de dados públicos.',
        'Trabalho com bases de dados CNPJ e CNAE.',
        'Otimização de consultas e custos no Google BigQuery.',
        'Integração e disponibilização de dados para análises no Metabase.',
      ],
      tecnologias: ['Python', 'SQL', 'BigQuery', 'Metabase'],
    },
  ],
  habilidades: [
    {
      id: 'linguagens',
      categoria: 'Linguagens',
      icone: 'Code2',
      itens: ['C#', 'SQL', 'Python', 'JavaScript', 'TypeScript'],
    },
    {
      id: 'backend',
      categoria: 'Backend',
      icone: 'Server',
      itens: ['.NET', 'ASP.NET Core', 'APIs REST', 'Entity Framework Core'],
    },
    {
      id: 'frontend',
      categoria: 'Frontend',
      icone: 'Layout',
      itens: ['Blazor', 'Blazor Hybrid', 'Angular', 'MudBlazor'],
    },
    {
      id: 'banco-dados',
      categoria: 'Banco de dados',
      icone: 'Database',
      itens: ['Microsoft SQL Server', 'Google BigQuery'],
    },
    {
      id: 'ferramentas',
      categoria: 'Ferramentas',
      icone: 'Wrench',
      itens: ['Swagger', 'Git', 'Metabase'],
    },
    {
      id: 'ia',
      categoria: 'Inteligência Artificial',
      icone: 'Sparkles',
      itens: ['OpenAI API', 'Arquitetura RAG'],
    },
  ],
  projetoDestaque: {
    nome: 'NutrIA',
    titulo: 'NutrIA — Sistema de Acompanhamento Clínico Nutricional com Inteligência Artificial',
    categoria: 'Projeto Autoral em Destaque',
    descricao:
      'Plataforma desenvolvida para nutricionistas, permitindo centralizar informações de pacientes, acompanhar evoluções, gerenciar planos alimentares e utilizar um assistente de Inteligência Artificial com arquitetura RAG para consulta contextualizada ao histórico clínico.',
    objetivo:
      'Unificar o acompanhamento nutricional em uma aplicação web moderna, facilitando a organização de prontuários, planos alimentares e a consulta rápida ao histórico do paciente durante o atendimento.',
    funcionalidades: [
      'Cadastro de pacientes, prontuários e registro de sessões clínicas',
      'Acompanhamento de evolução física e visualização de indicadores',
      'Criação e gerenciamento de planos alimentares e refeições',
      'Assistente de IA com arquitetura RAG para consulta contextualizada ao histórico',
    ],
    tecnologias: [
      'C# e .NET 8',
      'Blazor Server',
      'MudBlazor',
      'SQL Server',
      'Entity Framework Core',
      'OpenAI API',
      'FAISS e arquitetura RAG',
    ],
    repositorioUrl: 'https://github.com/Marco-Merini/NutrIA',
  },
  outrosProjetos: [
    {
      id: 'gerador-curriculo-ats',
      titulo: 'Gerador de Currículo em PDF',
      empresa: 'Projeto Autoral Integrado ao Portfólio',
      descricao:
        'Ferramenta desenvolvida para gerar dinamicamente um currículo executivo de página única (A4) com 100% de compatibilidade com sistemas de recrutamento (Applicant Tracking Systems). No backend, foi construído um motor de renderização programática em Java com Spring Boot e Apache PDFBox que desenha elementos vetoriais (faixas, divisórias e marcadores) separados da camada de texto linear, garantindo extração limpa na ordem exata das seções. No frontend em React, conta com pré-visualização em tempo real, cópia estruturada de texto puro para plataformas de vagas e geração autônoma via jsPDF como fallback client-side.',
      comoFoiFeito:
        'Desenvolvido com arquitetura híbrida (API REST em Spring Boot + geração client-side em React), utilizando cálculo preciso de coordenadas tipográficas A4, fontes padronizadas e validação automatizada de leitura linear com PDFTextStripper e pdftotext.',
      funcionalidades: [
        'Renderização programática em coluna única com Apache PDFBox no backend Java',
        'Fallback autônomo no navegador utilizando jsPDF para funcionamento offline',
        'Pré-visualização executiva interativa e cópia estruturada para formulários ATS',
        'Testes automatizados com JUnit 5 e PDFTextStripper validando a ordem de extração',
      ],
      tecnologias: [
        'Java 27',
        'Spring Boot',
        'Apache PDFBox',
        'React',
        'Tailwind CSS',
        'jsPDF',
        'JUnit 5',
      ],
    },
  ],
  idiomas: [
    { idioma: 'Português', nivel: 'Nativo' },
    { idioma: 'Inglês', nivel: 'Intermediário' },
    { idioma: 'Espanhol', nivel: 'Básico' },
  ],
  contato: {
    email: 'marcoleonemerini@gmail.com',
    telefoneExibicao: '(47) 99173-7051',
    whatsappUrl: 'https://wa.me/5547991737051',
    linkedinUrl: 'https://www.linkedin.com/in/marcomerini/',
    githubUrl: 'https://github.com/Marco-Merini',
    localizacao: 'Joinville, Santa Catarina, Brasil',
  },
};
