package com.smarthire.guest;

class GuestQuestion {
    private final String id;
    private final int position;
    private final String text;
    private final String category;
    private GuestAnswer answer;

    GuestQuestion(String id, int position, String text, String category) {
        this.id = id;
        this.position = position;
        this.text = text;
        this.category = category;
    }

    String id() {
        return id;
    }

    int position() {
        return position;
    }

    String text() {
        return text;
    }

    String category() {
        return category;
    }

    GuestAnswer answer() {
        return answer;
    }

    void answer(GuestAnswer answer) {
        this.answer = answer;
    }
}
