package com.example.battleshipbackend.controller;

import com.example.battleshipbackend.model.Game;
import com.example.battleshipbackend.service.IGameService;
import com.example.battleshipbackend.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/games")
public class GamesController {

    @Autowired
    private IGameService gameService;

    @GetMapping(path = "/getGames", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Game>> getGames(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }

            String username = JWTUtils.getUsernameFromJWT(jwt);

            List<Game> games = gameService.getGamesByUsername(username);
            List<Game> _games = new ArrayList<>();

            for (Game game: games) {
                _games.add(new Game(game.getUser1().equals(username) ? game.getUser2() : game.getUser1(), "", game.getGameDate(), game.getWinner().equals(username) ? "Wygrana" : "Przegrana"));
            }

            return new ResponseEntity<>(_games, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/saveGame", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> saveGame(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody Game game) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }

            gameService.addGame(game);

            return new ResponseEntity<>("Game saved", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
