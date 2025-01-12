package com.example.cw2.Exceptions;

public class PetitionerNotFoundException extends RuntimeException{

    public PetitionerNotFoundException(String email) {
        super("Could not find Petitioner: " + email);
    }
}
