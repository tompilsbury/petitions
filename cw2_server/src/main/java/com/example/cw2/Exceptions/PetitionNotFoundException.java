package com.example.cw2.Exceptions;

public class PetitionNotFoundException extends RuntimeException {
    public PetitionNotFoundException(int id) {
        super("Petition not found: " + id);
    }
}
