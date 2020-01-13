package com.aktivist.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "Vereine")
@Data
public class Verein implements Actor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @Transient
    @Override
    // email is being treated as username
    public String getUsername() {
        return email;
    }

    @Column(nullable = false, unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String vereinsname;

    private int plz;

    private String ort;

    private long handynummer;

    private String beschreibung;

}
