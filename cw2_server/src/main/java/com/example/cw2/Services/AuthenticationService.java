package com.example.cw2.Services;
import com.example.cw2.DTOs.LoginPetitionerDTO;
import com.example.cw2.DTOs.RegisterPetitionerDTO;
import com.example.cw2.Exceptions.InvalidBioIDException;
import com.example.cw2.Exceptions.InvalidCredentialsException;
import com.example.cw2.Exceptions.InvalidPasswordException;
import com.example.cw2.Exceptions.UserAlreadyExistsException;
import com.example.cw2.Interfaces.BioIDRepository;
import com.example.cw2.Interfaces.PetitionerRepository;
import com.example.cw2.Models.BioID;
import com.example.cw2.Models.Petitioner;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final PetitionerRepository petitionerRepository;
    private final BioIDRepository bioIDRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            PetitionerRepository petitionerRepository,
            BioIDRepository bioIDRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.bioIDRepository = bioIDRepository;
        this.petitionerRepository = petitionerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Petitioner signup(RegisterPetitionerDTO input) {
        if (petitionerRepository.findByEmail(input.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User already exists: " + input.getEmail());
        }
        if (input.getPassword().length() < 6 || input.getPassword().length() > 20) {
            throw new InvalidPasswordException("Password must be between 6 and 20 characters.");
        }
        Petitioner petitioner = new Petitioner();
        petitioner.setEmail(input.getEmail());
        petitioner.setFullName(input.getFullName());
        petitioner.setPassword(passwordEncoder.encode(input.getPassword()));
        petitioner.setDob(input.getDob());
        BioID bioid = bioIDRepository.findById(input.getBioID())
                .orElseThrow(() -> new InvalidBioIDException("Invalid BioID: " + input.getBioID()));
        petitioner.setBioID(bioid);

        return petitionerRepository.save(petitioner);
    }

    public Petitioner authenticate(LoginPetitionerDTO input) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            input.getEmail(),
                            input.getPassword()
                    )
            );

            return petitionerRepository.findByEmail(input.getEmail())
                    .orElseThrow(() -> new InvalidCredentialsException("User not found"));

        } catch (BadCredentialsException e) {
            throw new InvalidCredentialsException("Invalid email or password");
        }
    }
}