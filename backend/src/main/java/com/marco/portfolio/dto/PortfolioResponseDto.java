package com.marco.portfolio.dto;

import java.util.List;

public record PortfolioResponseDto(
        PerfilDto perfil,
        FormacaoDto formacao,
        List<ExperienciaDto> experiencias,
        List<CategoriaHabilidadeDto> habilidades,
        ProjetoDestaqueDto projetoDestaque,
        List<OutroProjetoDto> outrosProjetos,
        List<IdiomaDto> idiomas,
        ContatoPublicoDto contato
) {
    public record PerfilDto(
            String nomeCompleto,
            String nomeExibicao,
            String iniciais,
            String cargo,
            String titulo,
            String localizacao,
            List<String> apresentacaoParagrafos,
            List<String> sobreMimParagrafos
    ) {}

    public record FormacaoDto(
            String curso,
            String instituicao,
            String conclusao
    ) {}

    public record ExperienciaDto(
            String id,
            String empresa,
            String cargo,
            String periodo,
            List<String> atribuicoes,
            List<String> tecnologias
    ) {}

    public record CategoriaHabilidadeDto(
            String id,
            String categoria,
            String icone,
            List<String> itens
    ) {}

    public record ProjetoDestaqueDto(
            String nome,
            String titulo,
            String categoria,
            String descricao,
            String objetivo,
            List<String> funcionalidades,
            List<String> tecnologias,
            String repositorioUrl
    ) {}

    public record OutroProjetoDto(
            String id,
            String titulo,
            String empresa,
            String descricao,
            List<String> tecnologias
    ) {}

    public record IdiomaDto(
            String idioma,
            String nivel
    ) {}

    public record ContatoPublicoDto(
            String email,
            String telefoneExibicao,
            String whatsappUrl,
            String linkedinUrl,
            String githubUrl,
            String localizacao
    ) {}
}
