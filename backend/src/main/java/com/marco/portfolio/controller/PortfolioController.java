package com.marco.portfolio.controller;

import com.marco.portfolio.dto.ContatoRequestDto;
import com.marco.portfolio.dto.ContatoResponseDto;
import com.marco.portfolio.dto.HealthResponseDto;
import com.marco.portfolio.dto.PortfolioResponseDto;
import com.marco.portfolio.service.ContatoService;
import com.marco.portfolio.service.PortfolioService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/api")
public class PortfolioController {

    private final PortfolioService portfolioService;
    private final ContatoService contatoService;

    public PortfolioController(PortfolioService portfolioService, ContatoService contatoService) {
        this.portfolioService = portfolioService;
        this.contatoService = contatoService;
    }

    @GetMapping("/portfolio")
    public ResponseEntity<PortfolioResponseDto> obterPortfolio() {
        return ResponseEntity.ok(portfolioService.obterDadosPortfolio());
    }

    @GetMapping("/health")
    public ResponseEntity<HealthResponseDto> verificarSaude() {
        HealthResponseDto response = new HealthResponseDto(
                "UP",
                "portfolio-api",
                System.getProperty("java.version", "27"),
                contatoService.isServicoEmailConfigurado(),
                Instant.now()
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/contato")
    public ResponseEntity<ContatoResponseDto> enviarContato(
            @Valid @RequestBody ContatoRequestDto request,
            HttpServletRequest servletRequest
    ) {
        String ipOrigem = extrairIpOrigem(servletRequest);
        ContatoResponseDto response = contatoService.processarContato(request, ipOrigem);
        HttpStatus status = response.emailEnviado() ? HttpStatus.OK : HttpStatus.ACCEPTED;
        return ResponseEntity.status(status).body(response);
    }

    private String extrairIpOrigem(HttpServletRequest request) {
        String encaminhado = request.getHeader("X-Forwarded-For");
        if (encaminhado != null && !encaminhado.isBlank()) {
            return encaminhado.split(",")[0].trim();
        }
        return request.getRemoteAddr() != null ? request.getRemoteAddr() : "desconhecido";
    }
}
