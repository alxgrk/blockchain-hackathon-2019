package com.aktivist.api.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;

import static com.aktivist.api.security.BasicAuthFailureEntryPoint.REALM;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final BasicAuthFailureEntryPoint authEntryPoint;

    private final DataSource dataSource;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                .antMatchers("/verein/**").hasRole("VEREIN")
                .antMatchers("/profil/**").hasRole("USER")
                .and()
                .httpBasic()
                .realmName(REALM)
                .authenticationEntryPoint(authEntryPoint)
                .and()
                // We don't need sessions to be created.
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                //                .jdbcAuthentication().dataSource(dataSource);
                .inMemoryAuthentication()
                .withUser("User").password(getPasswordEncoder().encode("User")).roles("USER")
                .and()
                .withUser("Verein").password(getPasswordEncoder().encode("Verein")).roles("VEREIN");

    }

    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
