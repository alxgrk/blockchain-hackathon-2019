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
@Table(name = "Vereine")
public class Verein {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String email;
    private String password_hash;
    private String vereinsname;
    private int plz;
    private String ort;
    private long handynummer;
    private String beschreibung;


    public Verein(){}

    public Verein(Long id, String email, String password_hash, String vereinsname,
                int plz, String ort, long handynummer, String beschreibung) {
        this.id = id;
        this.email = email;
        this.password_hash = password_hash;
        this.vereinsname = vereinsname;
        this.plz = plz;
        this.ort = ort;
        this.handynummer = handynummer;
        this.beschreibung = beschreibung;
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

    public String getVereinsname() {
        return vereinsname;
    }

    public void setVereinsname(String vereinsname) {
        this.vereinsname = vereinsname;
    }

    public String getBeschreibung() {
        return beschreibung;
    }

    public void setBeschreibung(String beschreibung) {
        this.beschreibung = beschreibung;
    }
}
