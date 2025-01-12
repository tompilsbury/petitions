package com.example.cw2.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Entity
public class Settings {
    @Id
    @GeneratedValue
    private int id;
    @Column
    private String name;
    @Column
    private String value;
    @Column
    private LocalDateTime updatedAt;

    Settings(String name, String value) {
        this.name = name;
        this.value = value;
        this.updatedAt = LocalDateTime.now(ZoneOffset.UTC);
    }

    public Settings() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
