package com.example.battleshipbackend.repository;

import com.example.battleshipbackend.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    @Query(value = "SELECT * FROM users WHERE username = ?1", nativeQuery = true)
    User getUserByUsername(String username);

    @Query(value = "SELECT * FROM users WHERE email = ?1", nativeQuery = true)
    User getUserByEmail(String email);

    @Query(value = "SELECT * FROM users WHERE user_id <> ?1", nativeQuery = true)
    List<User> getDifferentUsers(Long id);

    @Query(value = "SELECT user_id FROM users WHERE email = ?1", nativeQuery = true)
    Long getUserIdByEmail(String email);

    @Query(value = "SELECT * FROM users WHERE (username LIKE ?1 OR email LIKE ?1) AND user_id <> ?2", nativeQuery = true)
    List<User> getUsersByPattern(String pattern, Long id);
}
