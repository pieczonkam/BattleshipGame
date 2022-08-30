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

    @Query(value = "SELECT user_id FROM users WHERE email = ?1", nativeQuery = true)
    Long getUserIdByEmail(String email);

    @Query(value = "SELECT * FROM users WHERE user_id NOT IN (SELECT CASE WHEN user_1 = ?1 THEN user_2 ELSE user_1 END person_id FROM users_relations WHERE user_1 = ?1 OR user_2 = ?1) AND user_id <> ?1 AND (username LIKE ?2 OR email LIKE ?2) ORDER BY username", nativeQuery = true)
    List<User> getPotentialFriendsById(Long id, String pattern);

    @Query(value = "SELECT * FROM users WHERE user_id NOT IN (SELECT CASE WHEN user_1 = ?1 THEN user_2 ELSE user_1 END person_id FROM users_relations WHERE user_1 = ?1 OR user_2 = ?1) AND user_id <> ?1 ORDER BY username", nativeQuery = true)
    List<User> getPotentialFriendsByIdAll(Long id);

    @Query(value = "SELECT * FROM users WHERE user_id IN (SELECT CASE WHEN user_1 = ?1 THEN user_2 ELSE user_1 END friend_id FROM users_relations WHERE user_1 = ?1 OR user_2 = ?1) ORDER BY username", nativeQuery = true)
    List<User> getFriendsById(Long id);
}
