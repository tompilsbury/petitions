package com.example.cw2.Interfaces;

import com.example.cw2.Models.Petition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetitionRepository extends JpaRepository<Petition, Integer> {
    List<Petition> findByStatus(String status);
}
