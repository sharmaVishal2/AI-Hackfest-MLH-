package com.smartcareerassistant.dto;

import jakarta.validation.constraints.NotBlank;

public record GenerateRequest(
        @NotBlank(message = "Job description is required") String jobDescription,
        @NotBlank(message = "Skills are required") String skills
) {
}
