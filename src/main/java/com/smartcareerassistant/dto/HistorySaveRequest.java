package com.smartcareerassistant.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record HistorySaveRequest(
        @NotBlank(message = "Job description is required") String jobDescription,
        @NotBlank(message = "Skills are required") String skills,
        @Valid @NotNull(message = "Generated content is required") GeneratedContentResponse generatedContent
) {
}
