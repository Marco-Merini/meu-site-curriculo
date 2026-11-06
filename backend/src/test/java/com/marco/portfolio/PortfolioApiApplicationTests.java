package com.marco.portfolio;

import com.marco.portfolio.service.ContatoService;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PortfolioApiApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ContatoService contatoService;

    @BeforeEach
    void setUp() {
        contatoService.limparRateLimitParaTestes();
    }

    @Test
    @DisplayName("Deve carregar o contexto da aplicação")
    void contextLoads() {
    }

    @Test
    @DisplayName("GET /api/portfolio deve retornar os dados profissionais de Marco Leone Merini")
    void deveRetornarDadosDoPortfolio() throws Exception {
        mockMvc.perform(get("/api/portfolio").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.perfil.nomeCompleto", is("Marco Leone Merini")))
                .andExpect(jsonPath("$.perfil.cargo", is("Desenvolvedor de Software")))
                .andExpect(jsonPath("$.perfil.titulo", is("Desenvolvedor de Software | Engenharia de Software")))
                .andExpect(jsonPath("$.perfil.localizacao", is("Joinville, Santa Catarina, Brasil")))
                .andExpect(jsonPath("$.formacao.curso", is("Bacharelado em Engenharia de Software")))
                .andExpect(jsonPath("$.formacao.conclusao", is("Concluído em agosto de 2026")))
                .andExpect(jsonPath("$.experiencias", hasSize(2)))
                .andExpect(jsonPath("$.experiencias[0].empresa", is("WTTI Sistemas")))
                .andExpect(jsonPath("$.experiencias[1].empresa", is("Conta Azul")))
                .andExpect(jsonPath("$.habilidades", hasSize(6)))
                .andExpect(jsonPath("$.projetoDestaque.nome", is("NutrIA")))
                .andExpect(jsonPath("$.projetoDestaque.repositorioUrl", is("https://github.com/Marco-Merini/NutrIA")))
                .andExpect(jsonPath("$.contato.email", is("marcoleonemerini@gmail.com")))
                .andExpect(jsonPath("$.contato.whatsappUrl", is("https://wa.me/5547991737051")));
    }

    @Test
    @DisplayName("GET /api/curriculo/pdf deve gerar PDF compatível com ATS, texto selecionável e ordem linear correta das seções")
    void deveGerarCurriculoPdfAtsComTextoExtraivelNaOrdemCorreta() throws Exception {
        MvcResult result = mockMvc.perform(get("/api/curriculo/pdf"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_PDF))
                .andExpect(header().string("Content-Disposition", containsString("Curriculo_Marco_Leone_Merini.pdf")))
                .andReturn();

        byte[] pdfBytes = result.getResponse().getContentAsByteArray();
        assertTrue(pdfBytes.length > 1000, "O PDF gerado deve possuir conteúdo válido.");

        // Salva o PDF revisado na raiz do projeto e em frontend/public para download imediato
        Path rootPdf = Path.of("../Curriculo_Marco_Leone_Merini.pdf").normalize();
        Path publicPdf = Path.of("../frontend/public/Curriculo_Marco_Leone_Merini.pdf").normalize();
        Files.write(rootPdf, pdfBytes);
        if (Files.isDirectory(publicPdf.getParent())) {
            Files.write(publicPdf, pdfBytes);
        }

        try (PDDocument doc = Loader.loadPDF(pdfBytes)) {
            PDFTextStripper stripper = new PDFTextStripper();
            stripper.setSortByPosition(true);
            String textoExtraido = stripper.getText(doc);

            // Verifica presença dos dados essenciais
            assertTrue(textoExtraido.contains("MARCO LEONE MERINI"));
            assertTrue(textoExtraido.contains("marcoleonemerini@gmail.com"));
            assertTrue(textoExtraido.contains("(47) 99173-7051"));
            assertTrue(textoExtraido.contains("WTTI Sistemas"));
            assertTrue(textoExtraido.contains("Conta Azul"));
            assertTrue(textoExtraido.contains("Bacharelado em Engenharia de Software"));
            assertTrue(textoExtraido.contains("NutrIA"));

            // Verifica a ordem estrita das seções para leitura linear de sistemas ATS
            int idxNome = textoExtraido.indexOf("MARCO LEONE MERINI");
            int idxResumo = textoExtraido.indexOf("RESUMO PROFISSIONAL");
            int idxExperiencia = textoExtraido.indexOf("EXPERIÊNCIA PROFISSIONAL");
            int idxFormacao = textoExtraido.indexOf("FORMAÇÃO ACADÊMICA");
            int idxHabilidades = textoExtraido.indexOf("HABILIDADES TÉCNICAS");
            int idxProjetos = textoExtraido.indexOf("PROJETOS RELEVANTES");
            int idxIdiomas = textoExtraido.indexOf("IDIOMAS");

            assertTrue(idxNome >= 0 && idxNome < idxResumo, "Nome deve preceder Resumo Profissional");
            assertTrue(idxResumo < idxExperiencia, "Resumo Profissional deve preceder Experiência Profissional");
            assertTrue(idxExperiencia < idxFormacao, "Experiência Profissional deve preceder Formação Acadêmica");
            assertTrue(idxFormacao < idxHabilidades, "Formação Acadêmica deve preceder Habilidades Técnicas");
            assertTrue(idxHabilidades < idxProjetos, "Habilidades Técnicas deve preceder Projetos Relevantes");
            assertTrue(idxProjetos < idxIdiomas, "Projetos Relevantes deve preceder Idiomas");
        }
    }

    @Test
    @DisplayName("GET /api/health deve retornar o estado básico da API")
    void deveRetornarHealthCheck() throws Exception {
        mockMvc.perform(get("/api/health").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("UP")))
                .andExpect(jsonPath("$.servico", is("portfolio-api")))
                .andExpect(jsonPath("$.servicoEmailConfigurado", is(false)))
                .andExpect(jsonPath("$.timestamp", notNullValue()));
    }

    @Test
    @DisplayName("POST /api/contato com dados válidos deve responder com canais de envio quando o serviço de e-mail não está configurado")
    void deveProcessarContatoValidoComTransparencia() throws Exception {
        String payload = """
                {
                  "nome": "Recrutador Tech",
                  "email": "recrutamento@empresa.com.br",
                  "assunto": "Oportunidade Desenvolvedor .NET",
                  "mensagem": "Olá Marco, vimos seu projeto NutrIA e gostaríamos de conversar sobre uma vaga.",
                  "website": ""
                }
                """;

        mockMvc.perform(post("/api/contato")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.recebidoPelaApi", is(true)))
                .andExpect(jsonPath("$.emailEnviado", is(false)))
                .andExpect(jsonPath("$.modoEntrega", is("CANAL_DIRETO_RECOMENDADO")))
                .andExpect(jsonPath("$.protocolo", containsString("PORT-")))
                .andExpect(jsonPath("$.canaisAlternativos.mailtoUrl", containsString("mailto:marcoleonemerini@gmail.com")))
                .andExpect(jsonPath("$.canaisAlternativos.whatsappUrl", containsString("https://wa.me/5547991737051")));
    }

    @Test
    @DisplayName("POST /api/contato com dados inválidos deve retornar 400 Bad Request e detalhar os campos")
    void deveRejeitarContatoInvalido() throws Exception {
        String payloadInvalido = """
                {
                  "nome": "",
                  "email": "email-invalido",
                  "assunto": "Oi",
                  "mensagem": "Curta"
                }
                """;

        mockMvc.perform(post("/api/contato")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payloadInvalido))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status", is(400)))
                .andExpect(jsonPath("$.camposInvalidos.nome", notNullValue()))
                .andExpect(jsonPath("$.camposInvalidos.email", notNullValue()))
                .andExpect(jsonPath("$.camposInvalidos.assunto", notNullValue()))
                .andExpect(jsonPath("$.camposInvalidos.mensagem", notNullValue()));
    }

    @Test
    @DisplayName("POST /api/contato deve bloquear excesso de tentativas com 429 Too Many Requests")
    void deveAplicarRateLimitContraAbuso() throws Exception {
        String payload = """
                {
                  "nome": "Teste Limite",
                  "email": "teste@exemplo.com",
                  "assunto": "Contato técnico",
                  "mensagem": "Mensagem de teste com tamanho válido para verificação de limite."
                }
                """;

        for (int i = 0; i < 5; i++) {
            mockMvc.perform(post("/api/contato")
                            .header("X-Forwarded-For", "198.51.100.42")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(payload))
                    .andExpect(status().isAccepted());
        }

        mockMvc.perform(post("/api/contato")
                        .header("X-Forwarded-For", "198.51.100.42")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isTooManyRequests())
                .andExpect(header().exists("Retry-After"))
                .andExpect(jsonPath("$.status", is(429)));
    }
}
