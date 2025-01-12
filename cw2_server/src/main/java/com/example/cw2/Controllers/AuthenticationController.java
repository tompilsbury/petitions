package com.example.cw2.Controllers;

import com.example.cw2.DTOs.LoginPetitionerDTO;
import com.example.cw2.DTOs.RegisterPetitionerDTO;
import com.example.cw2.Models.Petition;
import com.example.cw2.Models.Petitioner;
import com.example.cw2.Services.AuthenticationService;
import com.example.cw2.Services.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }
    @PostMapping("/signup")
    public ResponseEntity<Petitioner> register(@RequestBody RegisterPetitionerDTO registerUserDto) {
        Petitioner registeredUser = authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginPetitionerDTO loginUserDto) {
        Petitioner authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser, authenticatedUser.isAdmin());

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
}
