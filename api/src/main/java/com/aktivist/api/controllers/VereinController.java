package com.aktivist.api.controllers;

import com.aktivist.api.models.Verein;
import com.aktivist.api.services.DbHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class VereinController {

    @Autowired
    DbHelper dbHelper;

    @CrossOrigin
    @GetMapping("verein")
    public Iterable<Verein> getVereine() {
        return dbHelper.getAllVereine();
    }

    @CrossOrigin
    @GetMapping("verein/{id}")
    public Verein getProfil(@PathVariable("id") long id) {
        return dbHelper.getVereinById(id).get();
    }
}
