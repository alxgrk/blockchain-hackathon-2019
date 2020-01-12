package com.aktivist.api.controllers;

import com.aktivist.api.models.User;
import com.aktivist.api.services.DbHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfilController {

    @Autowired
    DbHelper dbHelper;

    @CrossOrigin
    @RequestMapping("profil")
    public Iterable<User> getProfile() {
        return dbHelper.getAllUsers();
    }

    @CrossOrigin
    @RequestMapping("profil/{id}")
    public User getProfil(@PathVariable("id") long id) {
        return dbHelper.getUserById(id).get();
    }
}
