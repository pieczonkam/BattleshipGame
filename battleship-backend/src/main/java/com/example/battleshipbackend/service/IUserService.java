package com.example.battleshipbackend.service;

import com.example.battleshipbackend.model.User;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    List<User> getUsers();
    User getUserById(Long id);
    User addUser(User user);
    void deleteUser(Long id);
    User getUserByUsername(String username);
    User getUserByEmail(String email);
    List<User> getDifferentUsers(Long id);
    Long getUserIdByEmail(String email);

    List<User> getUsersByPattern(String pattern, Long id);

}
