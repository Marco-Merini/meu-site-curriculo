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
            String titulo,
            String localizacao,
            String apresentacaoHero,
            List<String> sobreMimParagrafos,
            List<DestaqueProfissionalDto> destaquesSobre
    ) {}

    public record DestaqueProfissionalDto(
            String titulo,
            String descricao,
            String icone
    ) {}

    public record FormacaoDto(
            String grau,
            String curso,
            String instituicao,
            String conclusao,
            String status,
            String resumo
    ) {}

    public record ExperienciaDto(
            String id,
            String empresa,
            String cargo,
            String periodo,
            String observacaoPeriodo,
            String tipo,
            List<String> atribuicoes,
            List<String> tecnologias
    ) {}

    public record CategoriaHabilidadeDto(
            String id,
            String categoria,
            String descricao,
            String icone,
            List<HabilidadeItemDto> itens
    ) {}

    public record HabilidadeItemDto(
            String nome,
            String contexto,
            boolean destaque
    ) {}

    public record ProjetoDestaqueDto(
            String nome,
            String subtitulo,
            String identificacao,
            String licencaNota,
            String resumo,
            String problema,
            String solucao,
            String avisoResponsabilidadeClinica,
            String repositorioUrl,
            String readmeUrl,
            String documentacaoTecnicaUrl,
            String demoUrl,
            List<String> tecnologiasPrincipais,
            List<CamadaArquiteturaDto> arquitetura,
            List<DiferencialTecnicoDto> diferenciais,
            List<EtapaFluxoRagDto> fluxoRag,
            List<NotaConformidadeCodigoDto> notasVerificacaoCodigo
    ) {}

    public record CamadaArquiteturaDto(
            String camada,
            String tecnologias,
            String descricao
    ) {}

    public record DiferencialTecnicoDto(
            String titulo,
            String descricao,
            String icone
    ) {}

    public record EtapaFluxoRagDto(
            int ordem,
            String etapa,
            String detalhe
    ) {}

    public record NotaConformidadeCodigoDto(
            String item,
            String status,
            String observacao
    ) {}

    public record OutroProjetoDto(
            String id,
            String titulo,
            String contexto,
            String periodo,
            String resumo,
            List<String> entregasPrincipais,
            List<String> tecnologias,
            String notaConfidencialidade
    ) {}

    public record IdiomaDto(
            String idioma,
            String nivel,
            String descricao
    ) {}

    public record ContatoPublicoDto(
            String email,
            String telefoneExibicao,
            String telefoneInternacional,
            String whatsappUrl,
            String linkedinUrl,
            String githubUrl,
            String localizacao
    ) {}
}
