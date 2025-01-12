package com.example.cw2.Models;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "petitioners")
public class Petitioner implements UserDetails {
    @Id
    @Column(name = "petitioner_email")
    private String email;
    @Column(name = "password_hash")
    private String password;
    @Column(name = "fullname")
    private String fullName;
    private String dob;
    private boolean isAdmin = false;
    @ManyToOne
    @JoinColumn(name = "bioid", referencedColumnName = "code")
    private BioID bioid;
    @ManyToMany(mappedBy = "signatures", cascade = CascadeType.ALL)
    private List<Petition> signedPetitions = new ArrayList<>();

    //Init
    public Petitioner() {}

    public Petitioner(String email, String password, String fullName, String dob, BioID Bioid) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.dob = dob;
        this.bioid = Bioid;
    }

    // Getters and setters

    public List<Petition> getSignedPetitions() {
        return signedPetitions;
    }

    public void addSignedPetition(Petition petition) {
        this.signedPetitions.add(petition);
    }

    public void removeSignedPetition(Petition petition) {
        this.signedPetitions.remove(petition);
    }

    public BioID getBioID() {
        return bioid;
    }

    public void setBioID(BioID bioid) {
        this.bioid = bioid;
        if (bioid != null) {
            Integer currentUsage = bioid.getUsed();
            bioid.setUsed((currentUsage == null ? 0 : currentUsage) + 1);
        }
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public boolean isAdmin() {
        return isAdmin;
    }
}
