package com.aktivist.api.controllers;

import com.aktivist.api.models.User;
import com.aktivist.api.services.DbHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequiredArgsConstructor
public class ProfilController {

    private final DbHelper dbHelper;

    @CrossOrigin
    @GetMapping("profil")
    public Iterable<User> getProfile() {
        return dbHelper.getAllUsers();
    }

    @CrossOrigin
    @GetMapping("profil/{id}")
    public ResponseEntity<?> getProfil(@PathVariable("id") long id) {
        return dbHelper.getUserById(id)
                .map(user -> (ResponseEntity) new ResponseEntity<>(user, HttpStatus.OK))
                .orElse(new ResponseEntity<>(
                        Collections.singletonMap("message", "User with id '" + id + "' not found."),
                        HttpStatus.NOT_FOUND));
    }

    @CrossOrigin
    @PostMapping("profil")
    public ResponseEntity<?> createProfil(@RequestBody User user) {
        if (!isValid(user)) {
            return new ResponseEntity<>(
                    Collections.singletonMap("message", "Posted user invalid."),
                    HttpStatus.BAD_REQUEST);
        }

        return dbHelper.getUserByEmail(user.getEmail())
                .map(existingUser -> new ResponseEntity<>(existingUser, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(dbHelper.saveUser(user), HttpStatus.CREATED));
    }

    private boolean isValid(User user) {
        return !StringUtils.isEmpty(user.getEmail())
                && !StringUtils.isEmpty(user.getPassword())
                && !StringUtils.isEmpty(user.getVorname())
                && !StringUtils.isEmpty(user.getNachname())
                && !StringUtils.isEmpty(user.getGeburtsdatum())
                && !StringUtils.isEmpty(user.getOrt());

    }
}
