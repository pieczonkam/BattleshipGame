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

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {

    @Autowired
    private IUserService userService;

    @GetMapping(path = "/getUsers", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<User>> getUsers(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }

            List<User> users = userService.getDifferentUsers(JWTUtils.getIdFromJWT(jwt));
            List<User> _users = new ArrayList<>();

            for (User user: users) {
                _users.add(new User(user.getUserId(), user.getUsername(), user.getEmail()));
            }

            return new ResponseEntity<>(_users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/getUser", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }

            User user = userService.getUserById(JWTUtils.getIdFromJWT(jwt));
            if (user == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(new User(user.getUserId(), user.getUsername(), user.getEmail()), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path = "/users/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/findUsers/{pattern}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<User>> findUsers(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable String pattern) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }

            List<User> users = userService.getUsersByPattern("%" + pattern + "%", JWTUtils.getIdFromJWT(jwt));
            List<User> _users = new ArrayList<>();

            for (User user: users) {
                _users.add(new User(user.getUserId(), user.getUsername(), user.getEmail()));
            }

            return new ResponseEntity<>(_users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/passwordCorrect", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> passwordCorrect(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody User user) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }

            User _user = userService.getUserById(JWTUtils.getIdFromJWT(jwt));
            if (_user == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }

            PasswordEncoder password_encoder = new BCryptPasswordEncoder();
            if (password_encoder.matches(user.getPassword(), _user.getPassword())) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            }

            return new ResponseEntity<>(false, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/changePassword", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> changePassword(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody User user) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }

            User _user = userService.getUserById(JWTUtils.getIdFromJWT(jwt));
            if (_user == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }

            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            _user.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.addUser(_user);

            return new ResponseEntity<>("Password changed", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/changeEmail", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HttpStatus> changeEmail(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody User user) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            User _user = userService.getUserByEmail(user.getEmail());
            if (_user != null && !_user.getUserId().equals(JWTUtils.getIdFromJWT(jwt))) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }

            User __user = userService.getUserById(JWTUtils.getIdFromJWT(jwt));
            if (__user == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            __user.setEmail(user.getEmail());
            userService.addUser(__user);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/changeUsername", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HttpStatus> changeUsername(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody User user) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            User _user = userService.getUserByUsername(user.getUsername());
            if (_user != null && !_user.getUserId().equals(JWTUtils.getIdFromJWT(jwt))) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }

            User __user = userService.getUserById(JWTUtils.getIdFromJWT(jwt));
            if (__user == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            __user.setUsername(user.getUsername());
            userService.addUser(__user);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
