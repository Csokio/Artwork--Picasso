package com.codecool.fileshare;

import com.codecool.fileshare.model.AppUser;
import com.codecool.fileshare.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class FileshareApplication {

    public static void main(String[] args) {
        SpringApplication.run(FileshareApplication.class, args);
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner run(UserService userService){
        return args -> {
            if(userService.getAll().size() == 0){
                userService.saveUser(new AppUser(
                        System.getenv("defaultemail"),
                        System.getenv("defaultpassword")));
            }
        };
    }

}
