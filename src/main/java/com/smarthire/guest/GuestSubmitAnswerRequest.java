package com.smarthire.guest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record GuestSubmitAnswerRequest(
        @NotBlank String questionId,
        @NotBlank @Size(min = 5, max = 5000) String answer
) {
}
