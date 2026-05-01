package com.smarthire.guest;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

class GuestSession {
    private final String id;
    private String resumeFileName;
    private String resumeText;
    private Instant resumeUploadedAt;
    private int usedInterviews;
    private final Map<String, GuestInterview> interviews = new LinkedHashMap<>();

    GuestSession(String id) {
        this.id = id;
    }

    String id() {
        return id;
    }

    String resumeFileName() {
        return resumeFileName;
    }

    String resumeText() {
        return resumeText;
    }

    Instant resumeUploadedAt() {
        return resumeUploadedAt;
    }

    int usedInterviews() {
        return usedInterviews;
    }

    Map<String, GuestInterview> interviews() {
        return interviews;
    }

    void setResume(String fileName, String text) {
        this.resumeFileName = fileName;
        this.resumeText = text;
        this.resumeUploadedAt = Instant.now();
    }

    void incrementInterviews() {
        this.usedInterviews++;
    }
}
