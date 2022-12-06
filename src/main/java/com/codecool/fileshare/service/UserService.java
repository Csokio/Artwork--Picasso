package com.codecool.fileshare.service;

import com.codecool.fileshare.dto.UserDTO;
import com.codecool.fileshare.exception.UserAlreadyExistsException;
import com.codecool.fileshare.model.AppUser;
import com.codecool.fileshare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class UserService implements UserDetailsService {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public void saveUser(AppUser appUser) {
        if (userRepository.findByUsername(appUser.getEmail()) != null)
            throw new UserAlreadyExistsException("User " + appUser.getEmail() + " already exists.");
        else {
            String encryptedPass = passwordEncoder.encode(appUser.getPassword());
            appUser.setPassword(encryptedPass);
            userRepository.save(appUser);
        }
    }

    public List<UserDTO> getAll() {
        List<UserDTO> userDTOs = new ArrayList<>();
        List<AppUser> users = userRepository.getAppUsers();
        for (AppUser u : users) {
            UserDTO userDTO = new UserDTO(
                    u.getEmail()
            );
            userDTOs.add(userDTO);
        }
        return userDTOs;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = userRepository.findByUsername(username);
        if (appUser == null) {
            throw new UsernameNotFoundException("User not found with name: " + username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        appUser.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new User(appUser.getEmail(), appUser.getPassword(), authorities);
    }
}
