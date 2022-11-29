package com.codecool.fileshare.repository;

import com.codecool.fileshare.exception.UserAlreadyExistsException;
import com.codecool.fileshare.model.AppUser;

import java.util.List;

public interface UserRepository {
    AppUser findByUsername(String username);
    void save(AppUser appUser) throws UserAlreadyExistsException;

    List<AppUser> getAppUsers();
}
