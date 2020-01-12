package com.aktivist.api.controllers;

import com.aktivist.api.models.Actor;
import com.aktivist.api.services.DbHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class WhoAmIController {

    private final DbHelper dbHelper;

    @CrossOrigin
    @RequestMapping("whoami")
    public Actor whoAmI(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        return dbHelper.getActorByUserDetails(userDetails).get();
    }
}
