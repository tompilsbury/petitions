package com.example.cw2.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "petitions")
public class Petition {
    @Id
    @GeneratedValue
    @Column(name = "petition_id")
    private int id;
    @Column(name = "petitioner_email")
    private String petitionerEmail;
    private String title;
    private String content;
    @ManyToMany
    @JoinTable(
            name = "petition_signatures",
            joinColumns = @JoinColumn(name = "petition_id"),
            inverseJoinColumns = @JoinColumn(name = "petitioner_email")
    )
    @JsonIgnore
    private List<Petitioner> signatures = new ArrayList<>();
    private String status;
    private String response;
    @Column(name = "signature_count")
    @Transient
    private int signatureCount;

    public Petition() {}

    public Petition(String title, String content) {
        this.title = title;
        this.content = content;
    }
    // Getters and setters
    public int getSignatureCount() {
        return signatures.size();
    }

    public void addSignature(Petitioner petitioner) {
        this.signatures.add(petitioner);
    }

    public void removeSignature(Petitioner petitioner) {
        this.signatures.remove(petitioner);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public String getPetitionerEmail() {
        return petitionerEmail;
    }

    public void setPetitionerEmail(String email) {
        this.petitionerEmail = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Petitioner> getSignatures() {
        return signatures;
    }

    public void setSignatures(List<Petitioner> signatures) {
        this.signatures = signatures;
    }
}
