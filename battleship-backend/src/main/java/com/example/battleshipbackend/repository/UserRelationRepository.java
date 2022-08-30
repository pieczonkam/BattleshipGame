package com.example.battleshipbackend.repository;

import com.example.battleshipbackend.model.UserRelation;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface UserRelationRepository extends CrudRepository<UserRelation, Long> {

    @Query(value = "SELECT * FROM users_relations WHERE (user_1 = ?1 AND user_2 = ?2) OR (user_1 = ?2 AND user_2 = ?1)", nativeQuery = true)
    List<UserRelation> checkIfRelationExists(Long id1, Long id2);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM users_relations WHERE (user_1 = ?1 AND user_2 = ?2) OR (user_1 = ?2 AND user_2 = ?1)", nativeQuery = true)
    void deleteRelation(Long id1, Long id2);
}
