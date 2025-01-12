package com.example.cw2.Interfaces;

import com.example.cw2.Models.Settings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SettingsRepository extends JpaRepository<Settings, Integer> {
    Optional<Settings> findByName(String name);
}
