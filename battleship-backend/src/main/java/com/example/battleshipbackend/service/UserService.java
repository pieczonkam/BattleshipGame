package com.example.battleshipbackend.service;

import com.example.battleshipbackend.model.User;
import com.example.battleshipbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Klasa reprezentująca serwis odpowiedzialny za zapytania do bazy danych związane z użytkownikami
 */
@Service
public class UserService implements IUserService {

    /**
     * Obiekt UserRepository
     */
    @Autowired
    private UserRepository userRepository;

    /**
     * Metoda zwracająca dane użytkownika
     * @param id ID użytkownika
     * @return dane użytkownika
     */
    @Override
    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        }

        return null;
    }

    /**
     * Metoda dodająca nowego użytkownika do bazy danych
     * @param user dane użytkownika
     * @return dodany użytkownik
     */
    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Metoda zwracająca dane użytkownika
     * @param username nazwa użytkownika
     * @return dane użytkownika
     */
    @Override
    public User getUserByUsername(String username) {
        return userRepository.getUserByUsername(username);
    }

    /**
     * Metoda zwracająca dane użytkownika
     * @param email adres e-mail użytkownika
     * @return dane użytkownika
     */
    @Override
    public User getUserByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }

    /**
     * Metoda zwracająca ID użytkownika
     * @param email adres e-mail użytkownika
     * @return ID użytkownika
     */
    @Override
    public Long getUserIdByEmail(String email) {
        return userRepository.getUserIdByEmail(email);
    }

    /**
     * Metoda zwracająca listę użytkowników, którzy nie są jeszcze znajomymi danego użytkownika i pasują do podanego wzorca
     * @param id ID użytkownika
     * @param pattern wzorzec
     * @return lista pasujących użytkowników
     */
    @Override
    public List<User> getPotentialFriendsById(Long id, String pattern) {
        return userRepository.getPotentialFriendsById(id, pattern);
    }

    /**
     * Metoda zwracająca listę użytkowników, którzy nie są jeszcze znajomymi danego użytkownika
     * @param id ID użytkownika
     * @return lista pasujących użytkowników
     */
    @Override
    public List<User> getPotentialFriendsByIdAll(Long id) {
        return userRepository.getPotentialFriendsByIdAll(id);
    }

    /**
     * Metoda zwracająca listę znajomych danego użytkownika
     * @param id ID użytkownika
     * @return lista pasujących użytkowników
     */
    @Override
    public List<User> getFriendsById(Long id) {
        return userRepository.getFriendsById(id);
    }
}
