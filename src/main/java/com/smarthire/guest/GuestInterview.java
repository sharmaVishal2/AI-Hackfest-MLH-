package com.smarthire.guest;

import com.smarthire.interview.InterviewStatus;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

class GuestInterview {
    private final String id;
    private final Instant startedAt = Instant.now();
    private Instant completedAt;
    private InterviewStatus status = InterviewStatus.IN_PROGRESS;
    private Integer averageScore;
    private final List<GuestQuestion> questions = new ArrayList<>();

    GuestInterview(String id) {
        this.id = id;
    }

    String id() {
        return id;
    }

    Instant startedAt() {
        return startedAt;
    }

    Instant completedAt() {
        return completedAt;
    }

    InterviewStatus status() {
        return status;
    }

    Integer averageScore() {
        return averageScore;
    }

    List<GuestQuestion> questions() {
        return questions;
    }

    void recalculate() {
        List<GuestAnswer> answers = questions.stream().map(GuestQuestion::answer).filter(answer -> answer != null && answer.score() != null).toList();
        if (!answers.isEmpty()) {
            averageScore = (int) Math.round(answers.stream().mapToInt(GuestAnswer::score).average().orElse(0));
        }
        if (answers.size() == questions.size()) {
            status = InterviewStatus.COMPLETED;
            completedAt = Instant.now();
        }
    }
}
