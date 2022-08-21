package com.example.battleshipbackend.repository;

import com.example.battleshipbackend.model.Game;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends CrudRepository<Game, Long> {

    @Query(value = "SELECT * FROM games WHERE user_1 = ?1 OR user_2 = ?1", nativeQuery = true)
    List<Game> getGamesByUsername(String username);
}

