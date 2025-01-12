package com.example.cw2.Controllers;

import com.example.cw2.Interfaces.PetitionRepository;
import com.example.cw2.Models.Petition;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PublicPetitionController {
    private final PetitionRepository petitionRepo;

    public PublicPetitionController(PetitionRepository petitionRepo) {
        this.petitionRepo = petitionRepo;
    }

    @GetMapping("/slpp/petitions")
    List<Petition> getPetitions(@RequestParam(required = false) String status) {
        if (status != null) {
            return petitionRepo.findByStatus(status);
        }
        return petitionRepo.findAll();
    }
}
