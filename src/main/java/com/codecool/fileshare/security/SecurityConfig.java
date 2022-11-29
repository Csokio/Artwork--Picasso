package com.codecool.fileshare.security;

import com.codecool.fileshare.filter.UserAuthFilter;
import com.codecool.fileshare.filter.RequestAuthFilter;
import com.codecool.fileshare.utility.JwtUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtUtility jwtUtility;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();  //https://security.stackexchange.com/questions/170388/do-i-need-csrf-token-if-im-using-bearer-jwt
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests().antMatchers("/api/login").permitAll();
        http.authorizeRequests().antMatchers("/api/signup").permitAll();
        http.authorizeRequests().antMatchers(GET,"/api/artwork/**").hasAnyAuthority("USER");
        http.authorizeRequests().antMatchers(POST,"/api/artwork/**").hasAnyAuthority("USER");
        http.authorizeRequests().antMatchers(DELETE,"/api/artwork/**").hasAnyAuthority("USER");
        http.authorizeRequests().antMatchers(PATCH,"/api/artwork/**").hasAnyAuthority("USER");
        http.authorizeRequests().anyRequest().authenticated();
        UserAuthFilter userAuthFilter = new UserAuthFilter(authenticationManagerBean(), jwtUtility);
        userAuthFilter.setFilterProcessesUrl("/api/login");
        http.addFilter(userAuthFilter);
        http.addFilterBefore(new RequestAuthFilter(jwtUtility), UsernamePasswordAuthenticationFilter.class);
    }

}













