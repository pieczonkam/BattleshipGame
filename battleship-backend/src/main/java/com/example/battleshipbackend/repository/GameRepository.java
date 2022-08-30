package com.example.battleshipbackend.repository;

import com.example.battleshipbackend.model.Game;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Tuple;
import java.util.List;

@Repository
public interface GameRepository extends CrudRepository<Game, Long> {

    @Query(value = "SELECT CASE WHEN user_1 = ?1 THEN user_2 ELSE user_1 END opponent, game_date, CASE WHEN winner = ?1 THEN 'Wygrana' ELSE 'Przegrana' END result FROM games WHERE user_1 = ?1 OR user_2 = ?1 ORDER BY game_date, opponent, result DESC", nativeQuery = true )
    List<Tuple> getGamesByUserId(Long userId);
}

