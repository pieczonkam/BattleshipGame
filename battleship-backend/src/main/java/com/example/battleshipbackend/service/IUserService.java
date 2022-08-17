package com.example.battleshipbackend.service;

import com.example.battleshipbackend.model.User;

import java.util.List;

public interface IUserService {

    List<User> findAll();
}
