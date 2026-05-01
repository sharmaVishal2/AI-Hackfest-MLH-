package com.smarthire.guest;

import com.smarthire.ai.AiService;
import com.smarthire.ai.EvaluationResult;
import com.smarthire.ai.GeneratedQuestion;
import com.smarthire.common.AppException;
import com.smarthire.resume.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class GuestSessionService {
    private static final int MAX_GUEST_INTERVIEWS = 2;
    private static final String SAVE_PROMPT = "Login to save your resume, scores, and interview history.";

    private final ResumeService resumeService;
    private final AiService aiService;
    private final Map<String, GuestSession> sessions = new ConcurrentHashMap<>();

    public GuestSessionResponse createSession() {
        String id = UUID.randomUUID().toString();
        sessions.put(id, new GuestSession(id));
        return new GuestSessionResponse(id, 0, MAX_GUEST_INTERVIEWS);
    }

    public GuestResumeResponse uploadResume(String sessionId, MultipartFile file) {
        GuestSession session = session(sessionId);
        String text = resumeService.extractText(file);
        session.setResume(file.getOriginalFilename(), text);
        return GuestResumeResponse.from(session.resumeFileName(), session.resumeText(), session.resumeUploadedAt());
    }

    public GuestStartInterviewResponse startInterview(String sessionId) {
        GuestSession session = session(sessionId);
        if (session.resumeText() == null || session.resumeText().isBlank()) {
            throw new AppException(HttpStatus.BAD_REQUEST, "Upload a resume before starting an interview");
        }
        if (session.usedInterviews() >= MAX_GUEST_INTERVIEWS) {
            throw new AppException(HttpStatus.TOO_MANY_REQUESTS, "Guest limit reached. Login to continue and save progress.");
        }
        List<GeneratedQuestion> generated = aiService.generateQuestions(session.resumeText()).join();
        GuestInterview interview = new GuestInterview(UUID.randomUUID().toString());
        for (int i = 0; i < generated.size(); i++) {
            GeneratedQuestion item = generated.get(i);
            interview.questions().add(new GuestQuestion(UUID.randomUUID().toString(), i + 1, item.question(), item.category()));
        }
        session.interviews().put(interview.id(), interview);
        session.incrementInterviews();
        return new GuestStartInterviewResponse(interview.id(), questions(interview), session.usedInterviews(), MAX_GUEST_INTERVIEWS, SAVE_PROMPT);
    }

    public GuestQuestionResponse submitAnswer(String sessionId, String interviewId, GuestSubmitAnswerRequest request) {
        GuestSession session = session(sessionId);
        GuestInterview interview = interview(session, interviewId);
        GuestQuestion question = interview.questions().stream()
                .filter(item -> item.id().equals(request.questionId()))
                .findFirst()
                .orElseThrow(() -> new AppException(HttpStatus.NOT_FOUND, "Question not found"));
        EvaluationResult evaluation = aiService.evaluate(question.text(), request.answer(), session.resumeText()).join();
        question.answer(new GuestAnswer(request.answer().trim(), evaluation.score(), evaluation.feedback()));
        interview.recalculate();
        return question(question);
    }

    public GuestInterviewResponse detail(String sessionId, String interviewId) {
        GuestInterview interview = interview(session(sessionId), interviewId);
        return new GuestInterviewResponse(interview.id(), interview.status(), interview.averageScore(),
                interview.startedAt(), interview.completedAt(), questions(interview), SAVE_PROMPT);
    }

    private GuestSession session(String sessionId) {
        if (sessionId == null || sessionId.isBlank()) {
            throw new AppException(HttpStatus.BAD_REQUEST, "Guest session is required");
        }
        GuestSession session = sessions.get(sessionId);
        if (session == null) {
            throw new AppException(HttpStatus.NOT_FOUND, "Guest session expired. Start again as guest or login.");
        }
        return session;
    }

    private GuestInterview interview(GuestSession session, String interviewId) {
        GuestInterview interview = session.interviews().get(interviewId);
        if (interview == null) {
            throw new AppException(HttpStatus.NOT_FOUND, "Guest interview not found");
        }
        return interview;
    }

    private List<GuestQuestionResponse> questions(GuestInterview interview) {
        return interview.questions().stream().map(this::question).toList();
    }

    private GuestQuestionResponse question(GuestQuestion question) {
        GuestAnswer answer = question.answer();
        return new GuestQuestionResponse(question.id(), question.position(), question.text(), question.category(),
                answer == null ? null : new GuestAnswerResponse(answer.content(), answer.score(), answer.feedback()));
    }
}
