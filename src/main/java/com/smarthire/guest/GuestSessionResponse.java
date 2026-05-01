package com.smarthire.guest;

public record GuestSessionResponse(String sessionId, int usedInterviews, int maxInterviews) {
}
