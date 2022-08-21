package com.example.battleshipbackend.service;

import com.example.battleshipbackend.model.Game;

import java.util.List;

public interface IGameService {

    List<Game> getGamesByUsername(String username);
    Game addGame(Game game);
}
