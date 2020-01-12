package com.aktivist.api.models;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.Data;

import java.sql.Date;
import javax.persistence.*;

@Entity
@Table(name = "Users")
@Data
public class User {

    private static final Gson GSON = new Gson();

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // treated equivalent to a username
    @Column(nullable = false, unique = true)
    private String email;

    private String passwordHash;

    private String vorname;

    private String nachname;

    private Date geburtsdatum;

    private int plz;

    private String ort;

    private long handynummer;

    private String profilbeschreibung;

    public String getDataAsJson(){
        return GSON.toJson(this);
    }
}
