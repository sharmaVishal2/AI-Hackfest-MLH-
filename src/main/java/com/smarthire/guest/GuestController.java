package com.smarthire.guest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping({"/api/guest", "/guest"})
@RequiredArgsConstructor
public class GuestController {
    private final GuestSessionService guestSessionService;

    @PostMapping("/sessions")
    GuestSessionResponse createSession() {
        return guestSessionService.createSession();
    }

    @PostMapping("/resumes")
    GuestResumeResponse uploadResume(@RequestHeader("X-Guest-Session") String sessionId,
                                     @RequestParam("file") MultipartFile file) {
        return guestSessionService.uploadResume(sessionId, file);
    }

    @PostMapping("/interviews/start")
    GuestStartInterviewResponse startInterview(@RequestHeader("X-Guest-Session") String sessionId) {
        return guestSessionService.startInterview(sessionId);
    }

    @PostMapping("/interviews/{id}/answers")
    GuestQuestionResponse submitAnswer(@RequestHeader("X-Guest-Session") String sessionId,
                                       @PathVariable String id,
                                       @Valid @RequestBody GuestSubmitAnswerRequest request) {
        return guestSessionService.submitAnswer(sessionId, id, request);
    }

    @GetMapping("/interviews/{id}")
    GuestInterviewResponse detail(@RequestHeader("X-Guest-Session") String sessionId, @PathVariable String id) {
        return guestSessionService.detail(sessionId, id);
    }
}
