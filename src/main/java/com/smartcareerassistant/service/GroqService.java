package com.smartcareerassistant.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartcareerassistant.config.GroqProperties;
import com.smartcareerassistant.dto.GenerateRequest;
import com.smartcareerassistant.dto.GeneratedContentResponse;
import com.smartcareerassistant.exception.AppException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class GroqService {

    private static final String SYSTEM_PROMPT = """
            Act as a professional resume writer.

            Return valid JSON with this exact shape:
            {
              "summary": "string",
              "atsSkills": ["string"],
              "projectDescriptions": ["string", "string"],
              "coverLetter": "string"
            }
            """;

    private static final String USER_PROMPT_TEMPLATE = """
            Given the job description:
            %s

            And candidate skills:
            %s

            Generate:

            1. Resume Summary
            2. ATS optimized skills list
            3. 2 strong project descriptions
            4. A professional cover letter

            Make the response structured and clean.
            """;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final GroqProperties groqProperties;

    public GeneratedContentResponse generateCareerContent(GenerateRequest request) {
        Map<String, Object> body = Map.of(
                "model", groqProperties.model(),
                "temperature", 0.4,
                "max_completion_tokens", 1200,
                "response_format", Map.of("type", "json_object"),
                "messages", List.of(
                        Map.of("role", "system", "content", SYSTEM_PROMPT),
                        Map.of(
                                "role", "user",
                                "content", USER_PROMPT_TEMPLATE.formatted(request.jobDescription(), request.skills())
                        )
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(groqProperties.apiKey());

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    groqProperties.url(),
                    HttpMethod.POST,
                    new HttpEntity<>(body, headers),
                    String.class
            );
            return parseGroqResponse(response.getBody());
        } catch (HttpStatusCodeException exception) {
            throw new AppException(extractGroqErrorMessage(exception), exception);
        } catch (RestClientException exception) {
            throw new AppException("Failed to connect to Groq API", exception);
        }
    }

    private GeneratedContentResponse parseGroqResponse(String responseBody) {
        try {
            JsonNode root = objectMapper.readTree(responseBody);
            JsonNode contentNode = root.path("choices").path(0).path("message").path("content");
            if (contentNode.isMissingNode() || contentNode.asText().isBlank()) {
                throw new AppException("Groq API returned an empty response");
            }

            JsonNode parsed = objectMapper.readTree(sanitizeJson(contentNode.asText()));
            return new GeneratedContentResponse(
                    parsed.path("summary").asText(""),
                    toStringList(parsed.path("atsSkills")),
                    toStringList(parsed.path("projectDescriptions")),
                    parsed.path("coverLetter").asText("")
            );
        } catch (Exception exception) {
            throw new AppException("Failed to parse Groq response", exception);
        }
    }

    private List<String> toStringList(JsonNode node) {
        List<String> values = new ArrayList<>();
        if (node != null && node.isArray()) {
            for (JsonNode item : node) {
                values.add(item.asText());
            }
        }
        return values;
    }

    private String sanitizeJson(String value) {
        return value
                .replace("```json", "")
                .replace("```", "")
                .trim();
    }

    private String extractGroqErrorMessage(HttpStatusCodeException exception) {
        String responseBody = exception.getResponseBodyAsString();
        if (responseBody == null || responseBody.isBlank()) {
            return "Groq API request failed with status %s".formatted(exception.getStatusCode().value());
        }

        try {
            JsonNode root = objectMapper.readTree(responseBody);
            String message = root.path("error").path("message").asText();
            if (!message.isBlank()) {
                return "Groq API error: %s".formatted(message);
            }
        } catch (Exception ignored) {
        }

        return "Groq API request failed with status %s".formatted(exception.getStatusCode().value());
    }
}
