package com.marco.portfolio.exception;

import com.marco.portfolio.dto.ApiErrorResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponseDto> handleValidationException(
            MethodArgumentNotValidException ex,
            HttpServletRequest request
    ) {
        Map<String, String> erros = new LinkedHashMap<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            erros.putIfAbsent(fieldError.getField(), fieldError.getDefaultMessage());
        }

        log.info("Falha de validação na requisição para {}: campos inválidos={}",
                request.getRequestURI(), erros.keySet());

        ApiErrorResponseDto body = new ApiErrorResponseDto(
                HttpStatus.BAD_REQUEST.value(),
                "Dados inválidos",
                "Verifique os campos obrigatórios destacados e tente novamente.",
                request.getRequestURI(),
                Instant.now(),
                erros
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiErrorResponseDto> handleMalformedJson(
            HttpMessageNotReadableException ex,
            HttpServletRequest request
    ) {
        log.warn("Corpo JSON inválido recebido em {}", request.getRequestURI());

        ApiErrorResponseDto body = new ApiErrorResponseDto(
                HttpStatus.BAD_REQUEST.value(),
                "Requisição malformada",
                "O corpo da requisição não pôde ser interpretado como um JSON válido.",
                request.getRequestURI(),
                Instant.now(),
                Map.of()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(RateLimitExceededException.class)
    public ResponseEntity<ApiErrorResponseDto> handleRateLimit(
            RateLimitExceededException ex,
            HttpServletRequest request
    ) {
        log.warn("Limite de requisições atingido em {} (aguardar {}s)",
                request.getRequestURI(), ex.getSegundosParaTentarNovamente());

        ApiErrorResponseDto body = new ApiErrorResponseDto(
                HttpStatus.TOO_MANY_REQUESTS.value(),
                "Limite de tentativas excedido",
                ex.getMessage(),
                request.getRequestURI(),
                Instant.now(),
                Map.of()
        );
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                .header(HttpHeaders.RETRY_AFTER, String.valueOf(ex.getSegundosParaTentarNovamente()))
                .body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponseDto> handleGenericException(
            Exception ex,
            HttpServletRequest request
    ) {
        log.error("Erro inesperado ao processar requisição em {}: {}",
                request.getRequestURI(), ex.getClass().getSimpleName());

        ApiErrorResponseDto body = new ApiErrorResponseDto(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Erro interno do servidor",
                "Não foi possível concluir a operação no momento. Utilize os canais diretos de contato.",
                request.getRequestURI(),
                Instant.now(),
                Map.of()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }
}
