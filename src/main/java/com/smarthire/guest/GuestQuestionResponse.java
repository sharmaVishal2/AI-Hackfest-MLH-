package com.smarthire.guest;

public record GuestQuestionResponse(String id, int position, String text, String category, GuestAnswerResponse answer) {
}
