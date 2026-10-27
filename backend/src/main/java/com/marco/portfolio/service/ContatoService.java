package com.marco.portfolio.service;

import com.marco.portfolio.dto.ContatoRequestDto;
import com.marco.portfolio.dto.ContatoResponseDto;
import com.marco.portfolio.exception.RateLimitExceededException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ContatoService {

    private static final Logger log = LoggerFactory.getLogger(ContatoService.class);
    private static final int MAX_REQUESTS_PER_WINDOW = 5;
    private static final Duration RATE_LIMIT_WINDOW = Duration.ofMinutes(10);

    private static final String EMAIL_DESTINO = "marcoleonemerini@gmail.com";
    private static final String WHATSAPP_BASE = "https://wa.me/5547991737051";

    private final boolean mailEnabled;
    private final String mailWebhookUrl;
    private final String mailApiToken;
    private final String mailFromAddress;
    private final HttpClient httpClient;
    private final Map<String, Deque<Instant>> historicoPorOrigem = new ConcurrentHashMap<>();

    public ContatoService(
            @Value("${portfolio.mail.enabled:false}") boolean mailEnabled,
            @Value("${portfolio.mail.webhook-url:}") String mailWebhookUrl,
            @Value("${portfolio.mail.api-token:}") String mailApiToken,
            @Value("${portfolio.mail.from:}") String mailFromAddress
    ) {
        this.mailEnabled = mailEnabled;
        this.mailWebhookUrl = mailWebhookUrl != null ? mailWebhookUrl.trim() : "";
        this.mailApiToken = mailApiToken != null ? mailApiToken.trim() : "";
        this.mailFromAddress = mailFromAddress != null ? mailFromAddress.trim() : "";
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(5))
                .build();
    }

    public boolean isServicoEmailConfigurado() {
        return mailEnabled && !mailWebhookUrl.isBlank();
    }

    public ContatoResponseDto processarContato(ContatoRequestDto request, String chaveOrigem) {
        verificarLimiteRequisicoes(chaveOrigem);

        String protocolo = "PORT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        Instant agora = Instant.now();

        Map<String, String> canaisAlternativos = construirCanaisAlternativos(request);

        if (!isServicoEmailConfigurado()) {
            log.info("Solicitação de contato validada [protocolo={}, servicoEmailConfigurado=false]", protocolo);
            return new ContatoResponseDto(
                    true,
                    false,
                    "CANAL_DIRETO_RECOMENDADO",
                    "Sua mensagem foi validada pela API, porém o serviço de disparo automático de e-mail não está configurado neste ambiente. Para garantir que sua mensagem chegue imediatamente ao Marco, utilize abaixo o envio direto por aplicativo de e-mail ou WhatsApp com o texto já preenchido.",
                    protocolo,
                    agora,
                    canaisAlternativos
            );
        }

        boolean enviadoComSucesso = dispararWebhookEmail(request, protocolo);
        if (enviadoComSucesso) {
            log.info("Mensagem de contato encaminhada ao provedor de e-mail [protocolo={}, servicoEmailConfigurado=true]", protocolo);
            return new ContatoResponseDto(
                    true,
                    true,
                    "EMAIL_ENVIADO",
                    "Mensagem enviada com sucesso para Marco Merini! Caso prefira um retorno ainda mais rápido, você também pode iniciar uma conversa pelo WhatsApp.",
                    protocolo,
                    agora,
                    canaisAlternativos
            );
        }

        log.warn("Falha ao comunicar com o provedor externo de e-mail [protocolo={}]", protocolo);
        return new ContatoResponseDto(
                true,
                false,
                "FALHA_PROVEDOR_EXTERNO",
                "Os dados foram validados, mas o provedor externo de e-mail não confirmou a entrega no momento. Por transparência, nenhuma mensagem foi dada como enviada — utilize um dos canais diretos abaixo com sua mensagem pronta.",
                protocolo,
                agora,
                canaisAlternativos
        );
    }

    public void limparRateLimitParaTestes() {
        historicoPorOrigem.clear();
    }

    private void verificarLimiteRequisicoes(String chaveOrigem) {
        String chave = (chaveOrigem == null || chaveOrigem.isBlank()) ? "anon" : chaveOrigem;
        Instant agora = Instant.now();
        Instant limiteInferior = agora.minus(RATE_LIMIT_WINDOW);

        Deque<Instant> timestamps = historicoPorOrigem.computeIfAbsent(chave, k -> new ArrayDeque<>());
        synchronized (timestamps) {
            while (!timestamps.isEmpty() && timestamps.peekFirst().isBefore(limiteInferior)) {
                timestamps.pollFirst();
            }
            if (timestamps.size() >= MAX_REQUESTS_PER_WINDOW) {
                Instant maisAntigo = timestamps.peekFirst();
                long segundosRestantes = maisAntigo != null
                        ? Math.max(10L, Duration.between(agora, maisAntigo.plus(RATE_LIMIT_WINDOW)).getSeconds())
                        : 60L;
                throw new RateLimitExceededException(
                        "Muitas tentativas de envio em um curto período. Aguarde alguns instantes ou utilize o contato direto por e-mail ou WhatsApp.",
                        segundosRestantes
                );
            }
            timestamps.addLast(agora);
        }
    }

    private boolean dispararWebhookEmail(ContatoRequestDto request, String protocolo) {
        try {
            String payloadJson = String.format(
                    "{\"protocolo\":\"%s\",\"from\":\"%s\",\"to\":\"%s\",\"replyTo\":\"%s\",\"nome\":\"%s\",\"assunto\":\"%s\",\"mensagem\":\"%s\"}",
                    escaparJson(protocolo),
                    escaparJson(mailFromAddress.isBlank() ? EMAIL_DESTINO : mailFromAddress),
                    escaparJson(EMAIL_DESTINO),
                    escaparJson(request.email()),
                    escaparJson(request.nome()),
                    escaparJson(request.assunto()),
                    escaparJson(request.mensagem())
            );

            HttpRequest.Builder builder = HttpRequest.newBuilder()
                    .uri(URI.create(mailWebhookUrl))
                    .timeout(Duration.ofSeconds(8))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(payloadJson, StandardCharsets.UTF_8));

            if (!mailApiToken.isBlank()) {
                builder.header("Authorization", "Bearer " + mailApiToken);
            }

            HttpResponse<String> response = httpClient.send(builder.build(), HttpResponse.BodyHandlers.ofString());
            return response.statusCode() >= 200 && response.statusCode() < 300;
        } catch (Exception ex) {
            log.warn("Exceção ao tentar enviar e-mail via provedor configurado: {}", ex.getClass().getSimpleName());
            return false;
        }
    }

    private Map<String, String> construirCanaisAlternativos(ContatoRequestDto request) {
        String assuntoFormatado = "[Portfólio] " + request.assunto().trim();
        String corpoFormatado = String.format(
                "Olá Marco,%n%nMeu nome é %s (%s).%n%n%s",
                request.nome().trim(),
                request.email().trim(),
                request.mensagem().trim()
        );

        String mailtoUrl = String.format(
                "mailto:%s?subject=%s&body=%s",
                EMAIL_DESTINO,
                codificarParametroUrl(assuntoFormatado),
                codificarParametroUrl(corpoFormatado)
        );

        String textoWhatsapp = String.format(
                "Olá Marco! Meu nome é %s (%s). Assunto: %s. %s",
                request.nome().trim(),
                request.email().trim(),
                request.assunto().trim(),
                request.mensagem().trim()
        );

        String whatsappUrl = WHATSAPP_BASE + "?text=" + codificarParametroUrl(textoWhatsapp);

        Map<String, String> canais = new LinkedHashMap<>();
        canais.put("emailDestino", EMAIL_DESTINO);
        canais.put("mailtoUrl", mailtoUrl);
        canais.put("whatsappUrl", whatsappUrl);
        canais.put("linkedinUrl", "https://www.linkedin.com/in/marcomerini/");
        return canais;
    }

    private String codificarParametroUrl(String valor) {
        return URLEncoder.encode(valor, StandardCharsets.UTF_8).replace("+", "%20");
    }

    private String escaparJson(String valor) {
        if (valor == null) {
            return "";
        }
        return valor
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\r", "\\r")
                .replace("\n", "\\n")
                .replace("\t", "\\t");
    }
}
