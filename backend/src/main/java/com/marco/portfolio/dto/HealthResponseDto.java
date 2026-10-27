package com.marco.portfolio.dto;

import java.time.Instant;

public record HealthResponseDto(
        String status,
        String servico,
        String javaVersion,
        boolean servicoEmailConfigurado,
        Instant timestamp
) {
}
