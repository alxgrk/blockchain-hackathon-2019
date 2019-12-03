package com.aktivist.api.models;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.sql.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String email;
    private String password_hash;
    private String vorname;
    private String nachname;
    private Date geburtsdatum;
    private int plz;
    private String ort;
    private long handynummer;
    private String profilbeschreibung;


    public User(){}

    public User(Long id, String email, String password_hash, String vorname, String nachname, Date geburtsdatum,
                int plz, String ort, long handynummer, String profilbeschreibung) {
        this.id = id;
        this.email = email;
        this.password_hash = password_hash;
        this.vorname = vorname;
        this.nachname = nachname;
        this.geburtsdatum = geburtsdatum;
        this.plz = plz;
        this.ort = ort;
        this.handynummer = handynummer;
        this.profilbeschreibung = profilbeschreibung;
    }

    public String getDataAsJson(){
        Gson gson = new Gson();
        return gson.toJson(this);
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword_hash() {
        return password_hash;
    }

    public void setPassword_hash(String password_hash) {
        this.password_hash = password_hash;
    }


    public String getVorname() {
        return vorname;
    }

    public void setVorname(String vorname) {
        this.vorname = vorname;
    }


    public String getNachname() {
        return nachname;
    }

    public void setNachname(String nachname) {
        this.nachname = nachname;
    }


    public Date getGeburtsdatum() {
        return geburtsdatum;
    }

    public void setGeburtsdatum(Date geburtsdatum) {
        this.geburtsdatum = geburtsdatum;
    }


    public int getPlz() {
        return plz;
    }

    public void setPlz(int plz) {
        this.plz = plz;
    }

    public String getOrt() {
        return ort;
    }

    public void setOrt(String ort) {
        this.ort = ort;
    }

    public long getHandynummer() {
        return handynummer;
    }

    public void setHandynummer(long handynummer) {
        this.handynummer = handynummer;
    }


    public String getProfilbeschreibung() {
        return profilbeschreibung;
    }

    public void setProfilbeschreibung(String profilbeschreibung) {
        this.profilbeschreibung = profilbeschreibung;
    }
}
