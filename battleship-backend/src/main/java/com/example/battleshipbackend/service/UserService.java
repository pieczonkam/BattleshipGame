package com.example.battleshipbackend.service;

import com.example.battleshipbackend.model.User;
import com.example.battleshipbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService{

    @Autowired
    private UserRepository repository;

    @Autowired
    public Long count() {
        return repository.count();
    }

    @Override
    public List<User> findAll() {
        var users = (List<User>) repository.findAll();

        return users;
    }

    @Override
    public Optional<User> findUser(Long id) {
        return repository.findById(id);
    }

    @Override
    public void deleteUser(Long id) {
        repository.deleteById(id);
    }
}
