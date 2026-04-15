package com.smartcareerassistant.controller;

import com.smartcareerassistant.dto.GenerateRequest;
import com.smartcareerassistant.dto.GeneratedContentResponse;
import com.smartcareerassistant.service.GroqService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final GroqService groqService;

    @PostMapping("/generate")
    public ResponseEntity<GeneratedContentResponse> generate(@Valid @RequestBody GenerateRequest request) {
        return ResponseEntity.ok(groqService.generateCareerContent(request));
    }
}
