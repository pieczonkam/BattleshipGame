package com.example.battleshipbackend.controller;

import com.example.battleshipbackend.model.Game;
import com.example.battleshipbackend.model.Usernames;
import com.example.battleshipbackend.service.IGameService;
import com.example.battleshipbackend.service.IUserService;
import com.example.battleshipbackend.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Tuple;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;

/**
 * Klasa pełniąca rolę kontrolera dla zapytań związanych z grami
 */
@RestController
@CrossOrigin
@RequestMapping("/games")
public class GamesController {

    /**
     * Obiekt GameService pozwalający na wykonanie poszczególnych operacji na bazie danych
     */
    @Autowired
    private IGameService gameService;
    /**
     * Obiekt UserService pozwalający na wykonanie poszczególnych operacji na bazie danych
     */
    @Autowired
    private IUserService userService;

    /**
     * Metoda obsługująca żądanie zwrócenia gier danego użytkownika
     * @param authorizationHeader nagłówek zawierający token JWT
     * @return status HTTP oraz lista gier danego użytkownika
     */
    @GetMapping(path = "/getGames", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<HashMap<String, String>>> getGames(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
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
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Metoda obsługująca żądanie zapisu gry dwóch użytkowników
     * @param authorizationHeader nagłówek zawierający token JWT
     * @param usernames obiekt zawierający nazwy dwóch użytkowników
     * @return status HTTP oraz stosowny komunikat
     */
    @PostMapping(path = "/saveGame", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> saveGame(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody Usernames usernames) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }

            Long id1 = userService.getUserByUsername(usernames.getUsername1()).getUserId();
            Long id2 = userService.getUserByUsername(usernames.getUsername2()).getUserId();

            Instant nowUtc = Instant.now();
            ZoneId europeWarsaw = ZoneId.of("Europe/Warsaw");
            ZonedDateTime nowEuropeWarsaw = ZonedDateTime.ofInstant(nowUtc, europeWarsaw);
            Date currentTime = Date.from(nowEuropeWarsaw.toInstant());

            gameService.addGame(new Game(id1, id2, new Timestamp(currentTime.getTime()), id1));

            return new ResponseEntity<>("Game saved", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
