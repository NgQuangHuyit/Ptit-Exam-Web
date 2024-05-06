package com.ptit.ptitexam.exceptions;

public class UsernameOrEmailAlreadyExists extends RuntimeException {
    private String message = "Username or email already exists";

    public UsernameOrEmailAlreadyExists() {
        super("Username or email already exists");

    }

    public UsernameOrEmailAlreadyExists(String message) {
        super(message);
    }

}
