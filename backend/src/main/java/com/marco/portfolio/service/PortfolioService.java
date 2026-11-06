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
                "Desenvolvedor de Software",
                "Desenvolvedor de Software | Engenharia de Software",
                "Joinville, Santa Catarina, Brasil",
                List.of(
                        "Sou **bacharel em Engenharia de Software pela Universidade Católica de Santa Catarina**, com atuação profissional no desenvolvimento de software e interesse em arquitetura de sistemas, engenharia de dados e otimização de processos. Busco desenvolver soluções tecnológicas eficientes, escaláveis e alinhadas às necessidades reais dos negócios.",
                        "Ao longo da minha trajetória, adquiri experiência em diferentes áreas da tecnologia, participando de projetos que ampliaram minha visão sobre desenvolvimento de aplicações, integração de sistemas, bancos de dados e construção de soluções de ponta a ponta.",
                        "Tenho experiência com tecnologias como **C#, .NET, JavaScript, TypeScript, Angular, SQL Server e APIs REST**, além de conhecimentos em diferentes ferramentas e abordagens utilizadas no desenvolvimento de software.",
                        "Sou um profissional proativo, colaborativo e comprometido com a qualidade das entregas. Valorizo a autonomia na resolução de problemas, o trabalho em equipe e a troca de conhecimentos como parte fundamental da evolução profissional.",
                        "**Acredito que desenvolver software vai além de escrever código: é compreender desafios, criar soluções inteligentes e gerar valor por meio da tecnologia.** Mantenho o compromisso com o aprendizado contínuo, o aprimoramento técnico e a busca por soluções que façam a diferença."
                ),
                List.of(
                        "Formado em Engenharia de Software, construí minha trajetória combinando o desenvolvimento de aplicações corporativas com a experiência prática em engenharia e integração de dados.",
                        "Atualmente atuo como Desenvolvedor de Software na WTTI Sistemas, participando da construção de soluções com foco em operações e integração entre interfaces, APIs e banco de dados. Anteriormente, atuei na Conta Azul com engenharia de dados, trabalhando na automação de ingestão de bases públicas e na otimização de consultas analíticas."
                )
        );

        FormacaoDto formacao = new FormacaoDto(
                "Bacharelado em Engenharia de Software",
                "Católica de Santa Catarina — Centro Universitário",
                "Concluído em agosto de 2026"
        );

        List<ExperienciaDto> experiencias = List.of(
                new ExperienciaDto(
                        "wtti-sistemas",
                        "WTTI Sistemas",
                        "Desenvolvedor Trainee",
                        "2025 – Atual",
                        List.of(
                                "Desenvolvimento de aplicações utilizando C# e .NET MAUI Blazor Hybrid.",
                                "Integração entre frontend, backend, APIs e SQL Server.",
                                "Participação no desenvolvimento de soluções de apontamento de operações e separação de pedidos.",
                                "Implementação de melhorias e atendimento a requisitos de negócio."
                        ),
                        List.of("C#", ".NET", ".NET MAUI", "Blazor Hybrid", "SQL Server", "Swagger")
                ),
                new ExperienciaDto(
                        "conta-azul",
                        "Conta Azul",
                        "Aprendiz de Engenharia de Dados",
                        "2022 – 2024",
                        List.of(
                                "Desenvolvimento e automação de processos de ingestão de dados públicos.",
                                "Trabalho com bases de dados CNPJ e CNAE.",
                                "Otimização de consultas e custos no Google BigQuery.",
                                "Integração e disponibilização de dados para análises no Metabase."
                        ),
                        List.of("Python", "SQL", "BigQuery", "Metabase")
                )
        );

        List<CategoriaHabilidadeDto> habilidades = List.of(
                new CategoriaHabilidadeDto(
                        "linguagens",
                        "Linguagens",
                        "Code2",
                        List.of("C#", "SQL", "Python", "JavaScript", "TypeScript")
                ),
                new CategoriaHabilidadeDto(
                        "backend",
                        "Backend",
                        "Server",
                        List.of(".NET", "ASP.NET Core", "APIs REST", "Entity Framework Core")
                ),
                new CategoriaHabilidadeDto(
                        "frontend",
                        "Frontend",
                        "Layout",
                        List.of("Blazor", "Blazor Hybrid", "Angular", "MudBlazor")
                ),
                new CategoriaHabilidadeDto(
                        "banco-dados",
                        "Banco de dados",
                        "Database",
                        List.of("Microsoft SQL Server", "Google BigQuery")
                ),
                new CategoriaHabilidadeDto(
                        "ferramentas",
                        "Ferramentas",
                        "Wrench",
                        List.of("Swagger", "Git", "Metabase")
                ),
                new CategoriaHabilidadeDto(
                        "ia",
                        "Inteligência Artificial",
                        "Sparkles",
                        List.of("OpenAI API", "Arquitetura RAG")
                )
        );

        ProjetoDestaqueDto projetoDestaque = new ProjetoDestaqueDto(
                "NutrIA",
                "NutrIA — Sistema de Acompanhamento Clínico Nutricional com Inteligência Artificial",
                "Projeto Autoral em Destaque",
                "Plataforma desenvolvida para nutricionistas, permitindo centralizar informações de pacientes, acompanhar evoluções, gerenciar planos alimentares e utilizar um assistente de Inteligência Artificial com arquitetura RAG para consulta contextualizada ao histórico clínico.",
                "Unificar o acompanhamento nutricional em uma aplicação web moderna, facilitando a organização de prontuários, planos alimentares e a consulta rápida ao histórico do paciente durante o atendimento.",
                List.of(
                        "Cadastro de pacientes, prontuários e registro de sessões clínicas",
                        "Acompanhamento de evolução física e visualização de indicadores",
                        "Criação e gerenciamento de planos alimentares e refeições",
                        "Assistente de IA com arquitetura RAG para consulta contextualizada ao histórico"
                ),
                List.of(
                        "C# e .NET 8",
                        "Blazor Server",
                        "MudBlazor",
                        "SQL Server",
                        "Entity Framework Core",
                        "OpenAI API",
                        "FAISS e arquitetura RAG"
                ),
                "https://github.com/Marco-Merini/NutrIA"
        );

        List<OutroProjetoDto> outrosProjetos = List.of(
                new OutroProjetoDto(
                        "wtti-operacoes",
                        "Soluções de Apontamento de Operações e Separação de Pedidos",
                        "WTTI Sistemas",
                        "Atuação no desenvolvimento de aplicações corporativas voltadas a rotinas operacionais e logísticas, integrando interfaces híbridas, serviços de backend e persistência em banco de dados relacional.",
                        List.of("C#", ".NET MAUI", "Blazor Hybrid", "SQL Server")
                ),
                new OutroProjetoDto(
                        "conta-azul-dados",
                        "Automação e Ingestão de Dados Públicos (CNPJ e CNAE)",
                        "Conta Azul",
                        "Desenvolvimento de fluxos automatizados para ingestão de bases públicas e otimização de consultas analíticas no Google BigQuery para suporte a relatórios no Metabase.",
                        List.of("Python", "SQL", "BigQuery", "Metabase")
                )
        );

        List<IdiomaDto> idiomas = List.of(
                new IdiomaDto("Português", "Nativo"),
                new IdiomaDto("Inglês", "Intermediário"),
                new IdiomaDto("Espanhol", "Básico")
        );

        ContatoPublicoDto contato = new ContatoPublicoDto(
                "marcoleonemerini@gmail.com",
                "(47) 99173-7051",
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
