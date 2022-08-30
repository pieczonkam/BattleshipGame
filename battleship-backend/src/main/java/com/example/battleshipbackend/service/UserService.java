package com.example.battleshipbackend.service;

import com.example.battleshipbackend.model.User;
import com.example.battleshipbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        }

        return null;
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.getUserByUsername(username);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }

    @Override
    public Long getUserIdByEmail(String email) {
        return userRepository.getUserIdByEmail(email);
    }

    @Override
    public List<User> getPotentialFriendsById(Long id, String pattern) {
        return userRepository.getPotentialFriendsById(id, pattern);
    }

    @Override
    public List<User> getPotentialFriendsByIdAll(Long id) {
        return userRepository.getPotentialFriendsByIdAll(id);
    }

    @Override
    public List<User> getFriendsById(Long id) {
        return userRepository.getFriendsById(id);
    }
}
