package com.codecool.fileshare.filter;

import com.codecool.fileshare.dto.TokenDTO;
import com.codecool.fileshare.utility.JwtUtility;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import com.google.gson.Gson;

public class UserAuthFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtUtility jwtUtility;
    private static final Long ACCESS_TOKEN_VALID_DURATION = 86400000l; //in milliseconds
    private static final Long REFRESH_TOKEN_VALID_DURATION = 86400000l; //in milliseconds

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    private class AuthData{
        private String email;
        private String password;
    }

    @Autowired
    public UserAuthFilter(AuthenticationManager authenticationManager, JwtUtility jwtUtility) {
        this.authenticationManager = authenticationManager;
        this.jwtUtility = jwtUtility;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        AuthData authData = extractAuthDataFromRequest(request);
        String email = authData.getEmail();
        String password = authData.getPassword();
        UsernamePasswordAuthenticationToken authenticationToken = new  UsernamePasswordAuthenticationToken(email, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication auth) throws IOException, ServletException {
        User user = (User) auth.getPrincipal();
        String issuer = request.getRequestURL().toString();
        List<String> roles = user.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        String accessToken = jwtUtility.createToken(user.getUsername(), roles, issuer, ACCESS_TOKEN_VALID_DURATION);
        response.setHeader("access_token", accessToken);
        String refreshToken = jwtUtility.createToken(user.getUsername(), roles, issuer, REFRESH_TOKEN_VALID_DURATION);
        response.setHeader("refresh_token", refreshToken);
        TokenDTO tokenDTO = new TokenDTO(accessToken, refreshToken);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(response.getOutputStream(), tokenDTO);
    }

    private AuthData extractAuthDataFromRequest(HttpServletRequest request){
        BufferedReader reader = null;
        try {
            reader = request.getReader();
        } catch (IOException e) {
            e.printStackTrace();
        }
        Gson gson = new Gson();
        return gson.fromJson(reader, AuthData.class);
    }
}
