package com.smarthire.guest;

import java.util.List;

public record GuestStartInterviewResponse(String interviewId, List<GuestQuestionResponse> questions,
                                          int usedInterviews, int maxInterviews, String savePrompt) {
}
