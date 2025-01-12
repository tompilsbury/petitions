package com.example.cw2.DTOs;

public class RegisterPetitionerDTO {
    private String email;
    private String password;
    private String fullName;
    private String dob;
    private String bioID;

    // Getters and setters

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getBioID() {
        return bioID;
    }

    public void setBioID(String bioID) {
        this.bioID = bioID;
    }
}
