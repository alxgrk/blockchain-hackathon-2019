package com.aktivist.api.security;

import com.google.gson.Gson;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class BasicAuthFailureEntryPoint extends BasicAuthenticationEntryPoint {

    private static final Gson GSON = new Gson();

    static final String REALM = "DeveloperStack";

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authEx) throws IOException {
        response.addHeader("WWW-Authenticate", "Basic realm=" + getRealmName());
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        GSON.newJsonWriter(response.getWriter())
                .beginObject()
                .name("status").value(HttpServletResponse.SC_UNAUTHORIZED)
                .name("message").value(authEx.getMessage())
                .endObject();
    }

    @Override
    public void afterPropertiesSet() {
        setRealmName(REALM);
        super.afterPropertiesSet();
    }

}

