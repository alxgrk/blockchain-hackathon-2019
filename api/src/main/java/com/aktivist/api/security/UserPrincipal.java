package com.aktivist.api.security;

import com.aktivist.api.models.Actor;
import com.aktivist.api.models.Verein;
import lombok.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Value
public class UserPrincipal implements UserDetails {

    public static final SimpleGrantedAuthority ROLE_VEREIN = new SimpleGrantedAuthority(
            "ROLE_VEREIN");

    public static final SimpleGrantedAuthority ROLE_USER = new SimpleGrantedAuthority("ROLE_USER");

    private final Actor actor;

    @Override public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(
                actor instanceof Verein
                        ? ROLE_VEREIN
                        : ROLE_USER);
    }

    @Override public String getPassword() {
        return actor.getPassword();
    }

    @Override public String getUsername() {
        return actor.getUsername();
    }

    @Override public boolean isAccountNonExpired() {
        return true;
    }

    @Override public boolean isAccountNonLocked() {
        return true;
    }

    @Override public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override public boolean isEnabled() {
        return true;
    }

}