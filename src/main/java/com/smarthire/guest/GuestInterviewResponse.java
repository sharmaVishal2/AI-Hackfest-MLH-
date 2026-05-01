package com.smarthire.guest;

import com.smarthire.interview.InterviewStatus;

import java.time.Instant;
import java.util.List;

public record GuestInterviewResponse(String interviewId, InterviewStatus status, Integer averageScore,
                                     Instant startedAt, Instant completedAt, List<GuestQuestionResponse> questions,
                                     String savePrompt) {
}
