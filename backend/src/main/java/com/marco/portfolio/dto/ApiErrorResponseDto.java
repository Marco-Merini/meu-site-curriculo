package com.marco.portfolio.dto;

import java.time.Instant;
import java.util.Map;

public record ApiErrorResponseDto(
        int status,
        String erro,
        String mensagem,
        String caminho,
        Instant timestamp,
        Map<String, String> camposInvalidos
) {
}
