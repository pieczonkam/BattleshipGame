package com.example.battleshipbackend.service;

import com.example.battleshipbackend.model.User;

import java.util.List;

public interface IUserService {

    User getUserById(Long id);
    User addUser(User user);
    User getUserByUsername(String username);
    User getUserByEmail(String email);
    Long getUserIdByEmail(String email);
    List<User> getPotentialFriendsById(Long id, String pattern);
    List<User> getPotentialFriendsByIdAll(Long id);
    List<User> getFriendsById(Long id);
}
