package com.aktivist.api.controllers;

import com.aktivist.api.models.Actor;
import com.aktivist.api.services.DbHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class WhoAmIController {

    private final DbHelper dbHelper;

    @CrossOrigin
    @GetMapping("whoami")
    public Actor whoAmI(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        return dbHelper.getActorByUserDetails(userDetails)
                .orElseThrow(() -> new UsernameNotFoundException("Bad credentials"));
    }
}
