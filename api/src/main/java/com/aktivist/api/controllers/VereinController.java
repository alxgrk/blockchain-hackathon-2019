package com.aktivist.api.controllers;

import com.aktivist.api.services.DbHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class VereinController {

    @Autowired
    DbHelper dbHelper;

    @CrossOrigin
    @RequestMapping("verein/{id}")
    public String getProfil(@PathVariable("id") long id) {
        var verein = dbHelper.getVereinById(id);
        return verein.getDataAsJson();
    }
}
