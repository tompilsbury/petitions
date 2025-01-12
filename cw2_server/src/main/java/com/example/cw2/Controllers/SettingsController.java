package com.example.cw2.Controllers;

import com.example.cw2.Interfaces.PetitionerRepository;
import com.example.cw2.Models.Petitioner;
import com.example.cw2.Models.Settings;
import com.example.cw2.Services.JwtService;
import com.example.cw2.Services.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class SettingsController {
    @Autowired
    private SettingsService settingsService;
    @Autowired
    PetitionerRepository petitionerRepository;
    @Autowired
    private final JwtService jwtService;

    public SettingsController(SettingsService settingsService, PetitionerRepository petitionerRepository, JwtService jwtService) {
        this.settingsService = settingsService;
        this.petitionerRepository = petitionerRepository;
        this.jwtService = jwtService;
    }

    @GetMapping("/settings/{id}")
    public String getSetting(@PathVariable int id) {

        return settingsService.getSettingValue(id);
    }



    @PostMapping("/settings/{id}")
    public void updateSetting(@PathVariable int id, @RequestBody String value, @RequestHeader("Authorization") String authorizationHeader) {
        // Authorisation
        String token = authorizationHeader.replace("Bearer ", "");
        String email = jwtService.extractUsername(token);
        Petitioner existingPetitioner = petitionerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Petitioner not found"));
        if (!existingPetitioner.isAdmin()) {
            throw new RuntimeException("Account does not have permission to do this.");
        }

        settingsService.updateSetting(id, value);
    }

    @PostMapping("/settings")
    public void newSetting(@RequestBody Settings setting, @RequestHeader("Authorization") String authorizationHeader) {
        // Authorisation
        String token = authorizationHeader.replace("Bearer ", "");
        String email = jwtService.extractUsername(token);
        Petitioner existingPetitioner = petitionerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Petitioner not found"));
        if (!existingPetitioner.isAdmin()) {
            throw new RuntimeException("Account does not have permission to do this.");
        }

        settingsService.newSetting(setting);
    }
}
