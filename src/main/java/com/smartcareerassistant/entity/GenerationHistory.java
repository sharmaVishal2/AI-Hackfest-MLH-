package com.smartcareerassistant.entity;

import com.smartcareerassistant.dto.GeneratedContentResponse;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "generation_history")
public class GenerationHistory {

    @Id
    private String id;

    private String userId;

    private String jobDescription;

    private String skills;

    private GeneratedContentResponse generatedContent;

    private Instant timestamp;
}
