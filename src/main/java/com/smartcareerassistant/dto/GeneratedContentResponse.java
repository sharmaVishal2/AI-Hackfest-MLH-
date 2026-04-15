package com.smartcareerassistant.dto;

import java.util.List;

public record GeneratedContentResponse(
        String summary,
        List<String> atsSkills,
        List<String> projectDescriptions,
        String coverLetter
) {
}
