package com.marco.portfolio.service;

import com.marco.portfolio.dto.PortfolioResponseDto;
import com.marco.portfolio.dto.PortfolioResponseDto.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioService {

    public PortfolioResponseDto obterDadosPortfolio() {
        PerfilDto perfil = new PerfilDto(
                "Marco Leone Merini",
                "Marco Merini",
                "MM",
                "Desenvolvedor de Software | Engenharia de Software",
                "Joinville, Santa Catarina, Brasil",
                "Sou Marco Merini, desenvolvedor de software formado em Engenharia de Software. Trabalho na construção de soluções digitais, com experiência em aplicações web e multiplataforma, integração de APIs, bancos de dados e automação de dados. Transformo necessidades reais de operação e negócio em sistemas bem estruturados, funcionais e fáceis de manter.",
                List.of(
                        "Graduado no Bacharelado em Engenharia de Software pela Católica de Santa Catarina — Centro Universitário (concluído em agosto de 2026), com atuação prática tanto no desenvolvimento de aplicações corporativas quanto em engenharia de dados.",
                        "Na WTTI Sistemas, atuo no desenvolvimento full stack de aplicações com .NET MAUI Blazor Hybrid, SQL Server e Swagger API, participando diretamente de sistemas de apontamento de operações e separação de pedidos.",
                        "Anteriormente, na Conta Azul, trabalhei com engenharia de dados na ingestão e automação de bases públicas (CNAE e CNPJ) com foco em qualidade de dados, além da otimização de custos de consultas no Google BigQuery integradas ao Metabase.",
                        "Tenho interesse sólido em arquitetura de software, integração de sistemas, observabilidade e aplicações práticas de Inteligência Artificial — competências consolidadas no desenvolvimento do NutrIA, plataforma clínica com arquitetura RAG no ecossistema .NET 8."
                ),
                List.of(
                        new DestaqueProfissionalDto(
                                "Engenharia de Software Formada",
                                "Bacharel em Engenharia de Software pela Católica de Santa Catarina (concluído em agosto de 2026), aplicando princípios de arquitetura modular, testes automatizados e CI/CD.",
                                "GraduationCap"
                        ),
                        new DestaqueProfissionalDto(
                                "Desenvolvimento Full Stack & Híbrido",
                                "Experiência prática com C#, .NET, Blazor Server e .NET MAUI Blazor Hybrid integrados a bancos relacionais SQL Server e APIs REST documentadas com Swagger.",
                                "Layers"
                        ),
                        new DestaqueProfissionalDto(
                                "Engenharia de Dados & Automação",
                                "Histórico na construção de pipelines de ingestão e validação de dados (CNPJ/CNAE) e otimização de consultas analíticas no BigQuery com Metabase.",
                                "Database"
                        ),
                        new DestaqueProfissionalDto(
                                "Arquitetura RAG & IA Aplicada",
                                "Implementação de busca semântica vetorial (FAISS e similaridade de cosseno), pseudonimização orientada à LGPD e auditoria de interações com LLMs.",
                                "BrainCircuit"
                        )
                )
        );

        FormacaoDto formacao = new FormacaoDto(
                "Bacharelado",
                "Engenharia de Software",
                "Católica de Santa Catarina — Centro Universitário",
                "Agosto de 2026",
                "Concluído",
                "Formação superior concluída com ênfase em arquitetura de sistemas, engenharia de requisitos, qualidade de software, testes automatizados, bancos de dados e ciclo completo de entrega contínua."
        );

        List<ExperienciaDto> experiencias = List.of(
                new ExperienciaDto(
                        "wtti-sistemas",
                        "WTTI Sistemas",
                        "Desenvolvedor Trainee",
                        "2025 – atual",
                        "Período sujeito à confirmação da data exata de término.",
                        "Desenvolvimento de Software",
                        List.of(
                                "Desenvolvimento de aplicações multiplataforma e web utilizando .NET MAUI Blazor Hybrid.",
                                "Construção e manutenção de soluções integradas com banco de dados Microsoft SQL Server e documentação via Swagger API.",
                                "Atuação direta em demandas de frontend e backend, conectando interfaces operacionais a regras de negócio e persistência.",
                                "Participação ativa em projetos voltados ao apontamento de operações e à separação de pedidos.",
                                "Trabalho com autonomia na análise e cumprimento de requisitos, implementação de melhorias contínuas e incorporação de feedbacks técnicos."
                        ),
                        List.of("C#", ".NET", ".NET MAUI", "Blazor Hybrid", "SQL Server", "Swagger API")
                ),
                new ExperienciaDto(
                        "conta-azul",
                        "Conta Azul",
                        "Aprendiz de Engenharia de Dados",
                        "2022 – 2024",
                        null,
                        "Engenharia de Dados",
                        List.of(
                                "Otimização de custos de processamento e consultas no Google BigQuery para visualização analítica no Metabase.",
                                "Ingestão e tratamento de dados do CNAE com rigoroso controle de qualidade e consistência.",
                                "Desenvolvimento de fluxos de ingestão e automação de dados públicos do CNPJ.",
                                "Contribuição direta para a redução do tempo de integração de dados e diminuição de chamados operacionais relacionados aos processos."
                        ),
                        List.of("Python", "SQL", "BigQuery", "Metabase", "Ingestão de Dados", "Automação")
                )
        );

        List<CategoriaHabilidadeDto> habilidades = List.of(
                new CategoriaHabilidadeDto(
                        "linguagens",
                        "Linguagens de Programação",
                        "Linguagens aplicadas em ambientes corporativos, engenharia de dados e projetos autorais.",
                        "Code2",
                        List.of(
                                new HabilidadeItemDto("C#", "Experiência Profissional & NutrIA", true),
                                new HabilidadeItemDto("SQL", "Experiência Profissional & NutrIA", true),
                                new HabilidadeItemDto("Python", "Experiência Profissional (Dados)", false),
                                new HabilidadeItemDto("JavaScript", "Projetos & Desenvolvimento Web", false),
                                new HabilidadeItemDto("TypeScript", "Projetos & Desenvolvimento Web", false),
                                new HabilidadeItemDto("Java", "Aplicado na API deste Portfólio (JDK 27)", false)
                        )
                ),
                new CategoriaHabilidadeDto(
                        "backend-multiplataforma",
                        "Backend & Aplicações Multiplataforma",
                        "Construção de APIs, serviços de negócio e aplicações híbridas.",
                        "Server",
                        List.of(
                                new HabilidadeItemDto(".NET / ASP.NET Core", "Experiência Profissional & NutrIA (.NET 8)", true),
                                new HabilidadeItemDto(".NET MAUI", "Experiência Profissional (WTTI)", true),
                                new HabilidadeItemDto("Blazor Hybrid", "Experiência Profissional (WTTI)", true),
                                new HabilidadeItemDto("Spring Boot", "Aplicado na API deste Portfólio", false)
                        )
                ),
                new CategoriaHabilidadeDto(
                        "frontend-ui",
                        "Frontend & Estilização",
                        "Desenvolvimento de interfaces reativas, componentes e estilização responsiva.",
                        "Layout",
                        List.of(
                                new HabilidadeItemDto("Blazor Server & MudBlazor", "Projeto Autoral (NutrIA)", true),
                                new HabilidadeItemDto("Angular", "Conhecimento Técnico & Projetos", false),
                                new HabilidadeItemDto("React", "Aplicado neste Portfólio", false),
                                new HabilidadeItemDto("Tailwind CSS", "Aplicado neste Portfólio", false)
                        )
                ),
                new CategoriaHabilidadeDto(
                        "dados-apis",
                        "Bancos de Dados, APIs & Observabilidade",
                        "Persistência relacional, documentação de contratos HTTP e telemetria operacional.",
                        "Database",
                        List.of(
                                new HabilidadeItemDto("Microsoft SQL Server", "Experiência Profissional & NutrIA", true),
                                new HabilidadeItemDto("Entity Framework Core", "Projeto Autoral (NutrIA)", true),
                                new HabilidadeItemDto("Swagger / OpenAPI", "Experiência Profissional & NutrIA", true),
                                new HabilidadeItemDto("Serilog, Prometheus & Grafana", "Projeto Autoral (NutrIA)", true),
                                new HabilidadeItemDto("Docker & GitHub Actions", "Projeto Autoral (NutrIA)", true)
                        )
                ),
                new CategoriaHabilidadeDto(
                        "ia-rag",
                        "Inteligência Artificial & Arquitetura RAG",
                        "Recuperação semântica contextualizada, privacidade de dados e integração com LLMs.",
                        "Sparkles",
                        List.of(
                                new HabilidadeItemDto("Arquitetura RAG", "Projeto Autoral (NutrIA)", true),
                                new HabilidadeItemDto("OpenAI API (gpt-4o-mini / text-embedding-3-small)", "Projeto Autoral (NutrIA)", true),
                                new HabilidadeItemDto("Busca Semântica (FAISS & Cosseno)", "Projeto Autoral (NutrIA)", true),
                                new HabilidadeItemDto("Pseudonimização & Auditoria de IA", "Projeto Autoral (NutrIA)", true)
                        )
                )
        );

        ProjetoDestaqueDto projetoDestaque = new ProjetoDestaqueDto(
                "NutrIA",
                "Sistema Web de Acompanhamento Clínico Nutricional com Assistente de IA e Arquitetura RAG",
                "Projeto Autoral Principal • Ecossistema C# .NET 8",
                "Projeto proprietário com direitos autorais reservados (© 2026 Marco Merini). Código e documentação técnica disponíveis para consulta pública no GitHub.",
                "Aplicação web desenvolvida em .NET 8 (projeto NutriFlow / NutrIA) voltada a nutricionistas para centralizar o acompanhamento clínico, a gestão de pacientes, o registro de evolução física e a elaboração de planos alimentares com apoio de Inteligência Artificial contextualizada.",
                "No acompanhamento nutricional, informações essenciais do paciente — como anamneses, registros de sessões anteriores, evolução de medidas, alergias, medicamentos em uso e planos alimentares prévios — costumam ficar fragmentadas. Consultar e cruzar manualmente todo esse histórico durante o atendimento exige esforço elevado e consome tempo clínico.",
                "O NutrIA centraliza o prontuário em uma estrutura relacional no SQL Server e integra um assistente baseado em Retrieval-Augmented Generation (RAG). O sistema indexa o histórico de forma pseudonimizada e recupera trechos relevantes por busca vetorial combinada à inclusão obrigatória de dados críticos (alergias, medicamentos e dieta ativa), auxiliando o nutricionista na consulta rápida ao histórico com citação explícita das fontes.",
                "O sistema atua exclusivamente como ferramenta de apoio à consulta e organização de informações pelo profissional de nutrição, não substituindo o julgamento clínico do nutricionista, não realizando diagnósticos autônomos e não prescrevendo tratamentos sem supervisão profissional.",
                "https://github.com/Marco-Merini/NutrIA",
                "https://github.com/Marco-Merini/NutrIA/blob/main/README.md",
                "https://github.com/Marco-Merini/NutrIA/blob/main/DOCUMENTACAO_TECNICA.md",
                null,
                List.of(
                        "C# .NET 8",
                        "ASP.NET Core (Minimal APIs & Controllers)",
                        "Blazor Interactive Server",
                        "MudBlazor",
                        "Microsoft SQL Server",
                        "Entity Framework Core 8",
                        "OpenAI API (gpt-4o-mini & text-embedding-3-small)",
                        "FAISS & Cosine Similarity Fallback",
                        "Serilog, Prometheus & Grafana",
                        "Docker, GitHub Actions & AWS EC2"
                ),
                List.of(
                        new CamadaArquiteturaDto(
                                "Interface Web Reativa",
                                "Blazor Interactive Server + MudBlazor v8.15",
                                "Renderização interativa via SignalR (WebSockets), gráficos de evolução de peso/IMC (MudChart) e controle de sessão com cookies HttpOnly."
                        ),
                        new CamadaArquiteturaDto(
                                "Backend & Regras de Negócio",
                                "ASP.NET Core 8.0 + Minimal APIs + BackgroundService",
                                "Arquitetura em camadas (Endpoints, Services e Generic Repository), rate limiting no endpoint de IA e reindexação assíncrona com System.Threading.Channels."
                        ),
                        new CamadaArquiteturaDto(
                                "Persistência & Vector Store",
                                "Microsoft SQL Server + EF Core 8",
                                "Armazenamento transacional de pacientes, sessões, progressos, planos alimentares, logs de auditoria (AuditLogs) e chunks de embeddings serializados."
                        ),
                        new CamadaArquiteturaDto(
                                "Motor RAG & Busca Semântica",
                                "OpenAI API + FAISS (IndexFlatL2) + TensorPrimitives",
                                "Geração de embeddings de 1536 dimensões (text-embedding-3-small), busca vetorial em memória via FAISS com fallback automático para similaridade de cosseno e geração com gpt-4o-mini."
                        ),
                        new CamadaArquiteturaDto(
                                "Observabilidade & Entrega Contínua",
                                "Serilog + Prometheus + Grafana + GitHub Actions",
                                "Logs estruturados com rotação diária, métricas expostas em /metrics, health check de banco em /health e pipeline CI/CD com testes xUnit, SonarCloud e Docker."
                        )
                ),
                List.of(
                        new DiferencialTecnicoDto(
                                "Arquitetura RAG com Inclusão Clínica Forçada",
                                "Além da busca semântica vetorial (limiar de score >= 0.25), o método GetForceChunks garante que alergias, medicamentos contínuos e o plano alimentar ativo sejam sempre incluídos no contexto enviado ao modelo, evitando omissões críticas.",
                                "BrainCircuit"
                        ),
                        new DiferencialTecnicoDto(
                                "Busca Vetorial Híbrida (FAISS + Fallback Cosseno)",
                                "Utiliza indexação em memória com FAISS (IndexFlatL2 via FaissMask) e aciona automaticamente o cálculo de similaridade de cosseno (System.Numerics.Tensors.TensorPrimitives) caso a biblioteca nativa não esteja disponível no ambiente.",
                                "SearchCode"
                        ),
                        new DiferencialTecnicoDto(
                                "Privacidade e Pseudonimização (LGPD)",
                                "Dados identificáveis diretos (nome, e-mail e telefone) são omitidos dos chunks persistidos e dos embeddings enviados à API externa. O mapeamento de identidade ocorre apenas em memória durante a sessão ativa.",
                                "ShieldCheck"
                        ),
                        new DiferencialTecnicoDto(
                                "Auditoria e Guardrails contra Alucinações",
                                "O prompt exige ancoragem estrita com citações no formato [Tabela:Id]. Cada interação é registrada na tabela AuditLogs com usuário, paciente, pergunta, fontes citadas, quantidade de chunks, latência e flags de conformidade.",
                                "FileCheck2"
                        ),
                        new DiferencialTecnicoDto(
                                "Indexação Assíncrona em Background",
                                "Uso de IndexacaoBackgroundService com System.Threading.Channels (fila bounded) para processar embeddings em segundo plano sem bloquear o salvamento de prontuários pelo nutricionista.",
                                "Cpu"
                        ),
                        new DiferencialTecnicoDto(
                                "Segurança HTTP, Observabilidade e CI/CD",
                                "Autenticação JWT em cookie HttpOnly/Strict, senhas com BCrypt, headers de segurança (CSP, X-Frame-Options), métricas Prometheus/Grafana e pipeline GitHub Actions com testes automatizados e SonarCloud.",
                                "Activity"
                        )
                ),
                List.of(
                        new EtapaFluxoRagDto(
                                1,
                                "Pseudonimização e Chunking",
                                "Prontuário, sessões, evolução e dietas são convertidos em blocos textuais sem nome, e-mail ou telefone do paciente."
                        ),
                        new EtapaFluxoRagDto(
                                2,
                                "Vetorização (Embeddings 1536d)",
                                "O IndexacaoBackgroundService gera vetores com text-embedding-3-small em lotes e persiste na tabela Embeddings do SQL Server."
                        ),
                        new EtapaFluxoRagDto(
                                3,
                                "Recuperação Híbrida + Chunks Críticos",
                                "Na consulta, o AIService combina os Top-K chunks via FAISS/Cosseno com dados vitais obrigatórios (alergias, remédios e dieta ativa)."
                        ),
                        new EtapaFluxoRagDto(
                                4,
                                "Resposta Ancorada e Auditada",
                                "O modelo gpt-4o-mini responde exclusivamente com base no contexto citando [Tabela:Id], e o AuditoriaService grava os metadados em AuditLogs."
                        )
                ),
                List.of(
                        new NotaConformidadeCodigoDto(
                                "Verificação Código vs. Documentação",
                                "Confirmado no repositório",
                                "A estrutura em Program.cs, Services/AIService.cs e .github/workflows/ci.yml confirma o uso de .NET 8, Blazor Interactive Server, MudBlazor, EF Core SQL Server, Serilog, Prometheus, HealthCheck e pipeline CI/CD."
                        ),
                        new NotaConformidadeCodigoDto(
                                "Escopo dos Indicadores de Benefício",
                                "Transparência documental",
                                "As estimativas de ganho de tempo citadas na documentação acadêmica representam objetivos e análises de projeto (TCC), não métricas comerciais de produção em larga escala."
                        )
                )
        );

        List<OutroProjetoDto> outrosProjetos = List.of(
                new OutroProjetoDto(
                        "sistemas-operacionais-maui",
                        "Aplicações de Apontamento de Operações e Separação de Pedidos",
                        "Experiência Profissional • WTTI Sistemas",
                        "2025 – atual",
                        "Desenvolvimento e evolução de aplicações voltadas a rotinas operacionais de apontamento de operações e separação de pedidos, integrando interfaces híbridas a serviços de backend e banco de dados relacional.",
                        List.of(
                                "Construção de interfaces e fluxos operacionais utilizando .NET MAUI Blazor Hybrid.",
                                "Integração entre camadas de frontend e backend com persistência em Microsoft SQL Server.",
                                "Utilização e documentação de endpoints REST com Swagger API.",
                                "Implementação de requisitos funcionais, melhorias contínuas e ajustes baseados em feedbacks de uso."
                        ),
                        List.of("C#", ".NET MAUI", "Blazor Hybrid", "SQL Server", "Swagger API"),
                        "Projeto corporativo interno. Em respeito à propriedade intelectual e à confidencialidade da empresa, código-fonte, capturas de tela e URLs internas não são expostos publicamente."
                ),
                new OutroProjetoDto(
                        "engenharia-dados-ingestao-bigquery",
                        "Automação de Ingestão de Dados (CNPJ/CNAE) e Otimização no BigQuery",
                        "Experiência Profissional • Conta Azul",
                        "2022 – 2024",
                        "Atuação em engenharia de dados com foco na ingestão automatizada de bases públicas, confiabilidade de dados e eficiência de custos em consultas analíticas.",
                        List.of(
                                "Automação de processos de ingestão e atualização de dados públicos do CNPJ.",
                                "Ingestão estruturada de dados do CNAE com validações voltadas à qualidade dos dados.",
                                "Otimização de custos de consultas e estruturas no Google BigQuery consumidas pelo Metabase.",
                                "Contribuição para reduzir o tempo de integração de dados e o volume de chamados relacionados aos processos."
                        ),
                        List.of("Python", "SQL", "Google BigQuery", "Metabase", "Qualidade de Dados", "Automação"),
                        "Trabalho realizado em ambiente corporativo. Descrições restritas às responsabilidades confirmadas em currículo, sem exposição de dados ou arquitetura proprietária."
                )
        );

        List<IdiomaDto> idiomas = List.of(
                new IdiomaDto("Português", "Nativo", "Comunicação técnica, documentação arquitetural e colaboração em equipes de engenharia."),
                new IdiomaDto("Inglês", "Intermediário", "Leitura de documentação técnica, referências de arquitetura, APIs e ferramentas de desenvolvimento."),
                new IdiomaDto("Espanhol", "Básico", "Compreensão básica de leitura e comunicação elementar.")
        );

        ContatoPublicoDto contato = new ContatoPublicoDto(
                "marcoleonemerini@gmail.com",
                "(47) 99173-7051",
                "+55 47 99173-7051",
                "https://wa.me/5547991737051",
                "https://www.linkedin.com/in/marcomerini/",
                "https://github.com/Marco-Merini",
                "Joinville, Santa Catarina, Brasil"
        );

        return new PortfolioResponseDto(
                perfil,
                formacao,
                experiencias,
                habilidades,
                projetoDestaque,
                outrosProjetos,
                idiomas,
                contato
        );
    }
}
