package com.smarthire.guest;

import java.time.Instant;

public record GuestResumeResponse(String fileName, String preview, Instant uploadedAt) {
    static GuestResumeResponse from(String fileName, String text, Instant uploadedAt) {
        String preview = text.length() > 500 ? text.substring(0, 500) + "..." : text;
        return new GuestResumeResponse(fileName, preview, uploadedAt);
    }
}
