package com.smarthire.interview;

import java.util.List;

public record StartInterviewResponse(String interviewId, List<QuestionResponse> questions) {
}
