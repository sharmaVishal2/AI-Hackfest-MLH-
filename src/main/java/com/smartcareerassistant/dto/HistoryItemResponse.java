package com.smartcareerassistant.dto;

import java.time.Instant;

public record HistoryItemResponse(
        String id,
        String userId,
        String jobDescription,
        String skills,
        GeneratedContentResponse generatedContent,
        Instant timestamp
) {
}
