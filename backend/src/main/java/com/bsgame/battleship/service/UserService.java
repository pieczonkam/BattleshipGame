package com.bsgame.battleship.service;

import com.bsgame.battleship.model.User;
import com.bsgame.battleship.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository repository;

    @Override
    public List<User> findAll() {
        var users = (List<User>) repository.findAll();
        return users;
    }
}
