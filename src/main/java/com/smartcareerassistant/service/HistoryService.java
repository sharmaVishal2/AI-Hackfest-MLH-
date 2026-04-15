package com.smartcareerassistant.service;

import com.smartcareerassistant.dto.HistoryItemResponse;
import com.smartcareerassistant.dto.HistorySaveRequest;
import com.smartcareerassistant.entity.GenerationHistory;
import com.smartcareerassistant.repository.GenerationHistoryRepository;
import java.time.Instant;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HistoryService {

    private final GenerationHistoryRepository generationHistoryRepository;

    public HistoryItemResponse save(String userId, HistorySaveRequest request) {
        GenerationHistory saved = generationHistoryRepository.save(
                GenerationHistory.builder()
                        .userId(userId)
                        .jobDescription(request.jobDescription())
                        .skills(request.skills())
                        .generatedContent(request.generatedContent())
                        .timestamp(Instant.now())
                        .build()
        );
        return mapToResponse(saved);
    }

    public List<HistoryItemResponse> getHistoryByUserId(String userId) {
        return generationHistoryRepository.findByUserIdOrderByTimestampDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private HistoryItemResponse mapToResponse(GenerationHistory history) {
        return new HistoryItemResponse(
                history.getId(),
                history.getUserId(),
                history.getJobDescription(),
                history.getSkills(),
                history.getGeneratedContent(),
                history.getTimestamp()
        );
    }
}
