package com.example.cw2.Controllers;

import com.example.cw2.Exceptions.PetitionerNotFoundException;
import com.example.cw2.Interfaces.BioIDRepository;
import com.example.cw2.Interfaces.PetitionerRepository;
import com.example.cw2.Models.BioID;
import com.example.cw2.Models.Petitioner;
import com.example.cw2.DTOs.RegisterPetitionerDTO;
import com.example.cw2.Services.JwtService;
import org.springframework.dao.PermissionDeniedDataAccessException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PetitionerController {
    private final PetitionerRepository petitionerRepo;

    PetitionerController(PetitionerRepository petitionerRepo) {
        this.petitionerRepo = petitionerRepo;
    }

    @DeleteMapping("/petitioners/{email}")
    void deletePetitioner(@PathVariable String email) {
        petitionerRepo.deleteByEmail(email);
    }

}
