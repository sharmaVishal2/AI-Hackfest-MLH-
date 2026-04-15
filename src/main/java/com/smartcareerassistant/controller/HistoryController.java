package com.smartcareerassistant.controller;

import com.smartcareerassistant.dto.HistoryItemResponse;
import com.smartcareerassistant.dto.HistorySaveRequest;
import com.smartcareerassistant.service.AuthenticatedUserService;
import com.smartcareerassistant.service.HistoryService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/history")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryService historyService;
    private final AuthenticatedUserService authenticatedUserService;

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public HistoryItemResponse save(@AuthenticationPrincipal Jwt jwt,
                                    @Valid @RequestBody HistorySaveRequest request) {
        String userId = authenticatedUserService.extractUserId(jwt);
        return historyService.save(userId, request);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<HistoryItemResponse>> getHistory(@AuthenticationPrincipal Jwt jwt,
                                                                @PathVariable String userId) {
        authenticatedUserService.assertSameUser(jwt, userId);
        return ResponseEntity.ok(historyService.getHistoryByUserId(userId));
    }
}
