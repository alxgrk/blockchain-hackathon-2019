package com.aktivist.api.services;

import com.aktivist.api.models.*;
import com.aktivist.api.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DbHelper {

    private final UserRepository userRepository;

    private final VereinRepository vereinRepository;

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmailIgnoreCase(email);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
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
