package com.example.battleshipbackend.repository;

import com.example.battleshipbackend.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Interfejs obsługujący zapytania do bazy danych związane z użytkownikami
 */
@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    /**
     * Zapytanie zwracające dane użytkownika
     * @param username nazwa użytkownika
     * @return dane użytkownika
     */
    @Query(value = "SELECT * FROM users WHERE username = ?1", nativeQuery = true)
    User getUserByUsername(String username);

    /**
     * Zapytanie zwracające dane użytkownika
     * @param email adres e-mail użytkownika
     * @return dane użytkownika
     */
    @Query(value = "SELECT * FROM users WHERE email = ?1", nativeQuery = true)
    User getUserByEmail(String email);

    /**
     * Zapytanie zwracające ID użytkownika
     * @param email adres e-mail użytkownika
     * @return ID użytkownika
     */
    @Query(value = "SELECT user_id FROM users WHERE email = ?1", nativeQuery = true)
    Long getUserIdByEmail(String email);

    /**
     * Zapytanie zwracające listę użytkowników, którzy nie są jeszcze znajomymi danego użytkownika i pasują do podanego wzorca
     * @param id ID użytkownika
     * @param pattern wzorzec
     * @return lista użytkowników
     */
    @Query(value = "SELECT * FROM users WHERE user_id NOT IN (SELECT CASE WHEN user_1 = ?1 THEN user_2 ELSE user_1 END person_id FROM users_relations WHERE user_1 = ?1 OR user_2 = ?1) AND user_id <> ?1 AND (username LIKE ?2 OR email LIKE ?2) ORDER BY username", nativeQuery = true)
    List<User> getPotentialFriendsById(Long id, String pattern);

    /**
     * Zapytanie zwracające listę użytkowników, którzy nie są jeszcze znajomymi danego użytkownika
     * @param id ID użytkownika
     * @return lista użytkowników
     */
    @Query(value = "SELECT * FROM users WHERE user_id NOT IN (SELECT CASE WHEN user_1 = ?1 THEN user_2 ELSE user_1 END person_id FROM users_relations WHERE user_1 = ?1 OR user_2 = ?1) AND user_id <> ?1 ORDER BY username", nativeQuery = true)
    List<User> getPotentialFriendsByIdAll(Long id);

    /**
     * Zapytanie zwracające listę znajomych danego użytkownika
     * @param id ID użytkownika
     * @return lista użytkowników
     */
    @Query(value = "SELECT * FROM users WHERE user_id IN (SELECT CASE WHEN user_1 = ?1 THEN user_2 ELSE user_1 END friend_id FROM users_relations WHERE user_1 = ?1 OR user_2 = ?1) ORDER BY username", nativeQuery = true)
    List<User> getFriendsById(Long id);
}
