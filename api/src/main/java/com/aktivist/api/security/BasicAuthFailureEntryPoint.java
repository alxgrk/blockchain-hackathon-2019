package com.aktivist.api.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class BasicAuthFailureEntryPoint extends BasicAuthenticationEntryPoint {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    static final String REALM = "AktivistApp";

    @Override
    public void commence(HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authEx) throws IOException {
        response.addHeader("WWW-Authenticate", "Basic realm=" + getRealmName());
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        Map<String, Object> json = new HashMap<>();
        json.put("status", HttpServletResponse.SC_UNAUTHORIZED);
        json.put("message", authEx.getMessage());
        OBJECT_MAPPER.writeValue(response.getWriter(), json);
    }

    @Override
    public void afterPropertiesSet() {
        setRealmName(REALM);
        super.afterPropertiesSet();
    }

}

