package com.codecool.fileshare.filter;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.codecool.fileshare.utility.JwtUtility;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;

@Slf4j
public class RequestAuthFilter extends OncePerRequestFilter {
    private static final String EXPECTED_AUTH_HEADER_PREFIX = "Bearer ";
    private static final String LOGIN_URL = "/api/login";
    private static final String SIGNUP_URL = "/api/signup";
    private final JwtUtility jwtUtility;

    public RequestAuthFilter(JwtUtility jwtUtility) {
        this.jwtUtility = jwtUtility;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if(request.getServletPath().equals(LOGIN_URL) || request.getServletPath().equals(SIGNUP_URL)){
            filterChain.doFilter(request,response);
        } else {
            String authHeader = request.getHeader(AUTHORIZATION);
            if(authHeader == null){
                log.error("Missing authorization header in  {} request to {}!",request.getMethod(), request.getRequestURL());
                filterChain.doFilter(request, response);
                return;
            }
            if(!authHeader.startsWith(EXPECTED_AUTH_HEADER_PREFIX)){
                log.error("Invalid authorization header prefix in  {} request to {}! authorization header should look like this:{}tokenheader.payload.signature",request.getMethod(), request.getRequestURL(),EXPECTED_AUTH_HEADER_PREFIX);
                filterChain.doFilter(request, response);
                return;
            }
            try{
                String authToken = authHeader.substring(EXPECTED_AUTH_HEADER_PREFIX.length());
                DecodedJWT decodedAuthToken = jwtUtility.verifyToken(authToken);
                String email = decodedAuthToken.getSubject();
                List<SimpleGrantedAuthority> authorities = jwtUtility.extractAuthorities(decodedAuthToken);
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(email, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                filterChain.doFilter(request, response);
            }catch (Exception exception){
                log.error("Auth error during  {} request to {}: {}", request.getMethod(), request.getRequestURL(), exception.getMessage());
                response.sendError(FORBIDDEN.value());
            }
        }
    }
}
