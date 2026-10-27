package com.marco.portfolio;

import com.marco.portfolio.service.ContatoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
    @DisplayName("GET /api/portfolio deve retornar todos os dados profissionais confirmados de Marco Leone Merini")
    void deveRetornarDadosDoPortfolio() throws Exception {
        mockMvc.perform(get("/api/portfolio").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.perfil.nomeCompleto", is("Marco Leone Merini")))
                .andExpect(jsonPath("$.perfil.titulo", is("Desenvolvedor de Software | Engenharia de Software")))
                .andExpect(jsonPath("$.perfil.localizacao", is("Joinville, Santa Catarina, Brasil")))
                .andExpect(jsonPath("$.formacao.curso", is("Engenharia de Software")))
                .andExpect(jsonPath("$.formacao.conclusao", is("Agosto de 2026")))
                .andExpect(jsonPath("$.formacao.status", is("Concluído")))
                .andExpect(jsonPath("$.experiencias", hasSize(2)))
                .andExpect(jsonPath("$.experiencias[0].empresa", is("WTTI Sistemas")))
                .andExpect(jsonPath("$.experiencias[1].empresa", is("Conta Azul")))
                .andExpect(jsonPath("$.habilidades", hasSize(greaterThanOrEqualTo(5))))
                .andExpect(jsonPath("$.projetoDestaque.nome", is("NutrIA")))
                .andExpect(jsonPath("$.projetoDestaque.repositorioUrl", is("https://github.com/Marco-Merini/NutrIA")))
                .andExpect(jsonPath("$.contato.email", is("marcoleonemerini@gmail.com")))
                .andExpect(jsonPath("$.contato.whatsappUrl", is("https://wa.me/5547991737051")));
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
    @DisplayName("POST /api/contato com dados válidos deve responder de forma honesta quando o serviço de e-mail não está configurado")
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
