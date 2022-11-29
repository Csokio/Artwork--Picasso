package com.codecool.fileshare.utility;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
@Slf4j
public class JwtUtility {
    private Algorithm algorithm = Algorithm.HMAC256(System.getenv("tokenkey").getBytes());

    public String createToken(String userName, List<String> roles, String issuer, Long validDuration){
        return JWT.create()
                .withSubject(userName)
                .withExpiresAt(new Date(System.currentTimeMillis() + validDuration))
                .withIssuer(issuer)
                .withClaim("roles", roles)
                .sign(algorithm);
    }

    public DecodedJWT verifyToken(String authToken){
        JWTVerifier verifier = JWT.require(algorithm).build();
        return verifier.verify(authToken);
    }

    public List<SimpleGrantedAuthority> extractAuthorities(DecodedJWT decodedAuthToken){
        List<String> roles = decodedAuthToken.getClaim("roles").asList(String.class);
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        roles.forEach(role -> {
            log.info("{} role found in the authorization token.", role);
            authorities.add(new SimpleGrantedAuthority(role));
        });
        return authorities;
    }
}
