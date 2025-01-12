package com.example.cw2.Exceptions;

public class InvalidBioIDException extends RuntimeException {
    public InvalidBioIDException(String message) {
        super(message);
    }
}
