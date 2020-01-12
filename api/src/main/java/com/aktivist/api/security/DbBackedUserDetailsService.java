package com.aktivist.api.security;

import com.aktivist.api.models.User;
import com.aktivist.api.models.UserRepository;
import com.aktivist.api.models.Verein;
import com.aktivist.api.models.VereinRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DbBackedUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    private final VereinRepository vereinRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        // email is being treated as username

        Optional<User> user = userRepository.findByEmailIgnoreCase(username);
        if (user.isPresent()) {
            return new UserPrincipal(user.get());
        }

        Optional<Verein> verein = vereinRepository.findByEmailIgnoreCase(username);
        if (verein.isPresent()) {
            return new UserPrincipal(verein.get());
        }

        // if there is neither an user nor an verein, throw exception
        throw new UsernameNotFoundException(username);
    }
}