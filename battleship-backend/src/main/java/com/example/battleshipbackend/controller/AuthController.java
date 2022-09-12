package com.example.battleshipbackend.controller;

import com.example.battleshipbackend.model.User;
import com.example.battleshipbackend.service.IUserService;
import com.example.battleshipbackend.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

/**
 * Klasa pełniąca rolę kontrolera dla zapytań związanych z autentykacją
 */
@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {

    /**
     * Obiekt UserService pozwalający na wykonanie poszczególnych operacji na bazie danych
     */
    @Autowired
    private IUserService userService;

    /**
     * Metoda obsługująca żądanie logowania
     * @param user dane użytkownika, który chce się zalogować
     * @return status HTTP oraz odpowiedni komunikat
     */
    @PostMapping(path = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> login(@RequestBody User user) {
        try {
            User _user = userService.getUserByEmail(user.getEmail());
            if (_user == null) {
                return new ResponseEntity<>("Wrong email", HttpStatus.NOT_FOUND);
            }

            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (passwordEncoder.matches(user.getPassword(), _user.getPassword())) {
                return new ResponseEntity<>(JWTUtils.generateJWT(_user.getUserId()), HttpStatus.OK);
            }

            return new ResponseEntity<>("Wrong password", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Metoda obsługująca żądanie rejestracji
     * @param user dane użytkownika, który chce się zarejestrować
     * @return status HTTP oraz odpowiedni komunikat
     */
    @PostMapping(path = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            if (userService.getUserByEmail(user.getEmail()) != null) {
                return new ResponseEntity<>("Email taken", HttpStatus.BAD_REQUEST);
            }
            if (userService.getUserByUsername(user.getUsername()) != null) {
                return new ResponseEntity<>("Username taken", HttpStatus.BAD_REQUEST);
            }

            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            userService.addUser(user);

            return new ResponseEntity<>("Register successful", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Metoda sprawdzająca, czy przekazany token JWT jest poprawny
     * @param authorizationHeader nagłówek zawierający token JWT
     * @return status HTTP oraz wartość logiczna wskazująca, czy token JWT jest poprawny
     */
    @GetMapping(path = "/jwtValidation", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> jwtValidation(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            }

            return new ResponseEntity<>(false, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
