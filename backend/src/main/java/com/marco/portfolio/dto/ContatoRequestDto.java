package com.marco.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContatoRequestDto(
        @NotBlank(message = "O nome é obrigatório.")
        @Size(min = 2, max = 100, message = "O nome deve ter entre 2 e 100 caracteres.")
        String nome,

        @NotBlank(message = "O e-mail é obrigatório.")
        @Email(message = "Informe um endereço de e-mail válido.")
        @Size(max = 150, message = "O e-mail deve ter no máximo 150 caracteres.")
        String email,

        @NotBlank(message = "O assunto é obrigatório.")
        @Size(min = 3, max = 140, message = "O assunto deve ter entre 3 e 140 caracteres.")
        String assunto,

        @NotBlank(message = "A mensagem é obrigatória.")
        @Size(min = 10, max = 2000, message = "A mensagem deve ter entre 10 e 2000 caracteres.")
        String mensagem,

        @Size(max = 0, message = "Submissão inválida detectada.")
        String website
) {
}
