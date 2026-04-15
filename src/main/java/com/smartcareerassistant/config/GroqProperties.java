package com.smartcareerassistant.config;

import jakarta.validation.constraints.NotBlank;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "app.groq")
public record GroqProperties(
        @NotBlank String apiKey,
        @NotBlank String model,
        @NotBlank String url
) {
}
