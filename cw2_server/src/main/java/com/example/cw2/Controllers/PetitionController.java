package com.example.cw2.Controllers;

import com.example.cw2.DTOs.PetitionResponseDTO;
import com.example.cw2.Exceptions.PetitionNotFoundException;
import com.example.cw2.Interfaces.PetitionRepository;
import com.example.cw2.Interfaces.PetitionerRepository;
import com.example.cw2.Models.Petition;
import com.example.cw2.Models.Petitioner;
import com.example.cw2.Services.JwtService;
import io.jsonwebtoken.JwtException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PetitionController {
    private final PetitionRepository petitionRepo;
    private final PetitionerRepository petitionerRepo;
    private final JwtService jwtService;

    PetitionController(PetitionRepository petitionRepo, PetitionerRepository petitionerRepo, JwtService jwtService) {
        this.petitionRepo = petitionRepo;
        this.petitionerRepo = petitionerRepo;
        this.jwtService = jwtService;
    }

    @GetMapping("/petitions")
    List<Petition> getPetitions() {
        return petitionRepo.findAll();
    }

    @PostMapping("/petitions")
    Petition newPetition(@RequestBody Petition petition, @RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        try {
            String email = jwtService.extractUsername(token);
            petition.setPetitionerEmail(email);
            petition.setStatus("open");
            return petitionRepo.save(petition);

        } catch (Exception e) {
            throw new RuntimeException("Invalid token");
        }
    }

    @GetMapping("/petitions/{id}")
    Petition getPetition(@PathVariable int id) {
        return petitionRepo.findById(id)
                .orElseThrow(() -> new PetitionNotFoundException(id));
    }

    @PutMapping("/petitions/{id}")
    Petition updatePetition(@RequestBody Petition newPetition, @PathVariable int id) {
        return petitionRepo.findById(id)
                .map(petition -> {
                    petition.setTitle(newPetition.getTitle());
                    petition.setContent(newPetition.getContent());
                    petition.setStatus(newPetition.getStatus());
                    petition.setPetitionerEmail(newPetition.getPetitionerEmail());
                    return petitionRepo.save(petition);
                })
                .orElseGet(() -> {
                    return petitionRepo.save(newPetition);
                });
    }

    @PostMapping("/petitions/{id}/sign")
    Petition addSignature(@PathVariable int id, @RequestHeader("Authorization") String authorizationHeader) {
        Petition petition = petitionRepo.findById(id).orElseThrow(() -> new RuntimeException("Petition not found"));
        String token = authorizationHeader.replace("Bearer ", "");
        try {
            String email = jwtService.extractUsername(token);
            Petitioner existingPetitioner = petitionerRepo.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Petitioner not found"));
            if (petition.getSignatures().contains(existingPetitioner)) {
                throw new RuntimeException("Petitioner has already signed this petition");
            }
            petition.addSignature(existingPetitioner);
            return petitionRepo.save(petition);

        } catch (Exception e) {
            throw new RuntimeException("Invalid token");
        }
    }

    @GetMapping("/petitions/{id}/sign")
    boolean isSigned(@PathVariable int id, @RequestHeader("Authorization") String authorizationHeader) {
        Petition petition = petitionRepo.findById(id).orElseThrow(() -> new RuntimeException("Petition not found"));
        String token = authorizationHeader.replace("Bearer ", "");
        try {
            String email = jwtService.extractUsername(token);
            Petitioner existingPetitioner = petitionerRepo.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Petitioner not found"));
            return petition.getSignatures().contains(existingPetitioner);
        } catch (Exception e) {
            throw new RuntimeException("Invalid token");
        }
    }

    @PostMapping("/petitions/{id}/submit_response")
    Petition submitResponse(@PathVariable int id, @RequestHeader("Authorization") String authorizationHeader, @RequestBody PetitionResponseDTO response) {
        Petition petition = petitionRepo.findById(id).orElseThrow(() -> new RuntimeException("Petition not found"));
        String token = authorizationHeader.replace("Bearer ", "");
        try {
            String email = jwtService.extractUsername(token);
            Petitioner existingPetitioner = petitionerRepo.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Petitioner not found"));
            if (!existingPetitioner.isAdmin()) {
                throw new RuntimeException("Account does not have permission to do this.");
            }
            petition.setResponse(response.getResponseText());
            petition.setStatus("closed");
            return petitionRepo.save(petition);
        } catch (Exception e) {
            throw new RuntimeException("Invalid token");
        }
    }

    @DeleteMapping("/petitions/{id}")
    void deletePetition(@PathVariable int id, @RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        try {
            String email = jwtService.extractUsername(token);
            Petitioner existingPetitioner = petitionerRepo.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Petitioner not found"));
            if (!existingPetitioner.isAdmin()) {
                throw new RuntimeException("Account does not have permission to do this.");
            }
            petitionRepo.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Invalid token");
        }
    }
}
