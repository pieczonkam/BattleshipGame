package com.example.battleshipbackend.service;

import com.example.battleshipbackend.model.Game;

import javax.persistence.Tuple;
import java.util.List;

public interface IGameService {

    List<Tuple> getGamesByUserId(Long userId);
    Game addGame(Game game);
}
