package com.example.cw2.Interfaces;

import com.example.cw2.Models.Petition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetitionRepository extends JpaRepository<Petition, Integer> {
}
