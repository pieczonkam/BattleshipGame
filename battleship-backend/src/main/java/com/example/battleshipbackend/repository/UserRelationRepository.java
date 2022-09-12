package com.example.battleshipbackend.repository;

import com.example.battleshipbackend.model.UserRelation;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Interfejs obsługujący zapytania do bazy danych związane z relacjami
 */
@Repository
public interface UserRelationRepository extends CrudRepository<UserRelation, Long> {

    /**
     * Zapytanie zwracające listę relacji pomiędzy dwoma użytkownikami
     * @param id1 ID pierwszego użytkownika
     * @param id2 ID drugiego użytkownika
     * @return lista pasujących relacji
     */
    @Query(value = "SELECT * FROM users_relations WHERE (user_1 = ?1 AND user_2 = ?2) OR (user_1 = ?2 AND user_2 = ?1)", nativeQuery = true)
    List<UserRelation> checkIfRelationExists(Long id1, Long id2);

    /**
     * Zapytanie usuwające relacje pomiędzy dwoma użytkownikami
     * @param id1 ID pierwszego użytkownika
     * @param id2 ID drugiego użytkownika
     */
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM users_relations WHERE (user_1 = ?1 AND user_2 = ?2) OR (user_1 = ?2 AND user_2 = ?1)", nativeQuery = true)
    void deleteRelation(Long id1, Long id2);
}
