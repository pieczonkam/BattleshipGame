package com.example.battleshipbackend.service;

import com.example.battleshipbackend.model.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    Long count();
    List<User> findAll();
    Optional<User> findUser(Long id);
    void deleteUser(Long id);
}
