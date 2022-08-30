package com.example.battleshipbackend.service;

import com.example.battleshipbackend.model.Game;
import com.example.battleshipbackend.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Tuple;
import java.util.List;

@Service
public class GameService implements IGameService {

    @Autowired
    private GameRepository gameRepository;

    @Override
    public List<Tuple> getGamesByUserId(Long userId) {
        return gameRepository.getGamesByUserId(userId);
    }

    @Override
    public Game addGame(Game game) {
        return gameRepository.save(game);
    }
}
