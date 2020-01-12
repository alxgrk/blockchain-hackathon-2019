package com.aktivist.api.services;

import com.aktivist.api.models.*;
import com.aktivist.api.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DbHelper {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VereinRepository vereinRepository;

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(long id) {
        return userRepository.findById(id);
    }

    public Iterable<Verein> getAllVereine() {
        return vereinRepository.findAll();
    }

    public Optional<Verein> getVereinById(long id) {
        return vereinRepository.findById(id);
    }

    public Optional<Actor> getActorByUserDetails(UserDetails userDetails) {
        // email is being treated as username

        if (userDetails.getAuthorities().contains(UserPrincipal.ROLE_VEREIN)) {
            return vereinRepository.findByEmailIgnoreCase(userDetails.getUsername())
                    .map(v -> v);
        } else if (userDetails.getAuthorities().contains(UserPrincipal.ROLE_USER)) {
            return userRepository.findByEmailIgnoreCase(userDetails.getUsername())
                    .map(v -> v);
        } else {
            return Optional.empty();
        }
    }

}
