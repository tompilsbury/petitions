package com.example.cw2.Controllers;

import com.example.cw2.Exceptions.PetitionerNotFoundException;
import com.example.cw2.Interfaces.BioIDRepository;
import com.example.cw2.Interfaces.PetitionerRepository;
import com.example.cw2.Models.BioID;
import com.example.cw2.Models.Petitioner;
import com.example.cw2.DTOs.RegisterPetitionerDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PetitionerController {
    private final PetitionerRepository petitionerRepo;
    private final BioIDRepository bioIDRepo;

    PetitionerController(PetitionerRepository petitionerRepo, BioIDRepository bioIDRepo) {
        this.petitionerRepo = petitionerRepo;
        this.bioIDRepo = bioIDRepo;
    }

    @GetMapping("/petitioners")
    List<Petitioner> getPetitioners() {
        return petitionerRepo.findAll();
    }

    @PostMapping("/petitioners")
    Petitioner newPetitioner(@RequestBody RegisterPetitionerDTO registerPetitionerDTO) {
        if (petitionerRepo.findByEmail(registerPetitionerDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("User already exists: " + registerPetitionerDTO.getEmail());
        }

        BioID bioid = bioIDRepo.findById(registerPetitionerDTO.getBioID())
                .orElseThrow(() -> new IllegalArgumentException("Invalid BioID: " + registerPetitionerDTO.getBioID()));

        Petitioner petitioner = new Petitioner();
        petitioner.setEmail(registerPetitionerDTO.getEmail());
        petitioner.setPassword(registerPetitionerDTO.getPassword());
        petitioner.setFullName(registerPetitionerDTO.getFullName());
        petitioner.setDob(registerPetitionerDTO.getDob());
        petitioner.setBioID(bioid);
        return petitionerRepo.save(petitioner);
    }


    @GetMapping("/petitioners/{email}")
    Petitioner getPetitionerByEmail(@PathVariable String email, @RequestBody String password) {
//        return petitionerRepo.findByEmail(email).orElseThrow(() -> new PetitionerNotFoundException(email));
        Petitioner petitioner = petitionerRepo.findByEmail(email).orElseThrow(() -> new PetitionerNotFoundException(email));
        if (petitioner.getPassword().equals(password)) {
            return petitioner;
        } else {
            throw new PetitionerNotFoundException(email);
        }
    }

    @PutMapping("/petitioners/{email}")
    Petitioner updatePetitioner(@RequestBody Petitioner newPetitioners, @PathVariable String email) {
        return petitionerRepo.findByEmail(email)
                .map(petitioners -> {
                    petitioners.setEmail(newPetitioners.getEmail());
                    petitioners.setPassword(newPetitioners.getPassword());
                    petitioners.setFullName(newPetitioners.getFullName());
                    petitioners.setDob(newPetitioners.getDob());
                    petitioners.setBioID(newPetitioners.getBioID());
                    return petitionerRepo.save(petitioners);
                })
                .orElseGet(() -> {
                    return petitionerRepo.save(newPetitioners);
                });
    }

    @DeleteMapping("/petitioners/{email}")
    void deletePetitioner(@PathVariable String email) {
        petitionerRepo.deleteByEmail(email);
    }

}
