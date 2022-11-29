package com.codecool.fileshare.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
public class AppUser {
     private String email;
     private String password;
     private Collection<Role> roles = new ArrayList<>(){{
          add(new Role(0L,"USER"));
     }};

     public AppUser(String email, String password) {
          this.email = email;
          this.password = password;
     }

}
