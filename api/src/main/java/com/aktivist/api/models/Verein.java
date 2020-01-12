package com.aktivist.api.models;

import com.google.gson.Gson;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "Vereine")
@Data
public class Verein {

    private static final Gson GSON = new Gson();

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // treated equivalent to a username
    @Column(nullable = false, unique = true)
    private String email;

    private String password_hash;

    private String vereinsname;

    private int plz;

    private String ort;

    private long handynummer;

    private String beschreibung;

    public String getDataAsJson(){
        return GSON.toJson(this);
    }

}
