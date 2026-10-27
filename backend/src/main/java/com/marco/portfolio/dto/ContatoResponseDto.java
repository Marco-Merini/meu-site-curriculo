package com.marco.portfolio.dto;

import java.time.Instant;
import java.util.Map;

public record ContatoResponseDto(
        boolean recebidoPelaApi,
        boolean emailEnviado,
        String modoEntrega,
        String mensagem,
        String protocolo,
        Instant timestamp,
        Map<String, String> canaisAlternativos
) {
}
