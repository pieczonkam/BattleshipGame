package com.example.battleshipbackend.service;

import com.example.battleshipbackend.model.Game;
import com.example.battleshipbackend.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Tuple;
import java.util.List;

/**
 * Klasa reprezentująca serwis odpowiedzialny za zapytania do bazy danych związane z grami
 */
@Service
public class GameService implements IGameService {

    /**
     * Obiekt GameRepository
     */
    @Autowired
    private GameRepository gameRepository;

    /**
     * Metoda zwracająca listę gier danego użytkownika
     * @param userId ID użytkownika
     * @return lista gier
     */
    @Override
    public List<Tuple> getGamesByUserId(Long userId) {
        return gameRepository.getGamesByUserId(userId);
    }

    /**
     * Metoda dodająca nową grę do bazy danych
     * @param game dane gry
     * @return dodana gra
     */
    @Override
    public Game addGame(Game game) {
        return gameRepository.save(game);
    }
}
