package com.example.battleshipbackend.controller;

import com.example.battleshipbackend.model.Game;
import com.example.battleshipbackend.service.IGameService;
import com.example.battleshipbackend.service.IUserService;
import com.example.battleshipbackend.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Tuple;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/games")
public class GamesController {

    @Autowired
    private IGameService gameService;
    @Autowired
    private IUserService userService;

    @GetMapping(path = "/getGames", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<HashMap<String, String>>> getGamesTest(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }

            List<Tuple> games = gameService.getGamesByUserId(JWTUtils.getIdFromJWT(jwt));
            List<HashMap<String, String>> _games = new ArrayList<>();

            for (Tuple g: games) {
                HashMap<String, String> game = new HashMap<>();
                game.put("opponent", userService.getUserById(((Number)g.get("opponent")).longValue()).getUsername());
                game.put("game_date", g.get("game_date").toString());
                game.put("result", g.get("result").toString());

                _games.add(game);
            }

            return new ResponseEntity<>(_games, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
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
