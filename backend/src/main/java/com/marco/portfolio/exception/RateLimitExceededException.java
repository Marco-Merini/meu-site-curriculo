package com.marco.portfolio.exception;

public class RateLimitExceededException extends RuntimeException {
    private final long segundosParaTentarNovamente;

    public RateLimitExceededException(String message, long segundosParaTentarNovamente) {
        super(message);
        this.segundosParaTentarNovamente = segundosParaTentarNovamente;
    }

    public long getSegundosParaTentarNovamente() {
        return segundosParaTentarNovamente;
    }
}
