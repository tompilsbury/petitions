package com.example.cw2.Interfaces;

import com.example.cw2.Models.BioID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BioIDRepository extends JpaRepository<BioID, String> {
}
