package com.example.cw2.Interfaces;

import com.example.cw2.Models.Petitioner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PetitionerRepository extends JpaRepository<Petitioner, Integer> {
    Optional<Petitioner> findByEmail(String email);
    void deleteByEmail(String email);
}
