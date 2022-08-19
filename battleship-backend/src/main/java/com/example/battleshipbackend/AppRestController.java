package com.example.battleshipbackend;

import com.example.battleshipbackend.model.User;
import com.example.battleshipbackend.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class AppRestController {

    @Autowired
    private IUserService user_service;

    @GetMapping(path = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getUsers() {
        try {
            var users = (List<User>) user_service.findAll();
            List<HashMap<String, String>> users_json = new ArrayList<>();

            for (int i = 0; i < users.size(); ++i) {
                HashMap<String, String> user_json = new HashMap<>();
                user_json.put("user_id", users.get(i).getUserId().toString());
                user_json.put("username", users.get(i).getUsername());
                user_json.put("email", users.get(i).getEmail());
                user_json.put("password", users.get(i).getPassword());

                users_json.add(user_json);
            }

            return new ResponseEntity<>(users_json, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/users/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getUser(@PathVariable Long id) {
        var user_optional = user_service.findUser(id);

        if (user_optional.isPresent()) {
            User user = user_optional.get();

            HashMap<String, String> user_json = new HashMap<>();
            user_json.put("user_id", user.getUserId().toString());
            user_json.put("username", user.getUsername());
            user_json.put("email", user.getEmail());
            user_json.put("password", user.getPassword());

            return new ResponseEntity<>(user_json, HttpStatus.OK);
        }

        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PostMapping(path = "/users")
    public ResponseEntity<Object> addUser(@RequestBody User user) {
        try {
            User _user = user_service.addUser(new User(user.getUsername(), user.getEmail(), user.getPassword()));

            return new ResponseEntity<>(_user, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/users/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> updateUser(@PathVariable Long id, @RequestBody User user) {
        var user_optional = user_service.findUser(id);

        if (user_optional.isPresent()) {
            User _user = user_optional.get();
            if (user.getUsername().length() > 0) {
                _user.setUsername(user.getUsername());
            }
            if (user.getEmail().length() > 0) {
                _user.setEmail(user.getEmail());
            }
            if (user.getPassword().length() > 0) {
                _user.setPassword(user.getPassword());
            }

            return new ResponseEntity<>(user_service.addUser(_user), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping(path = "/users/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long id) {
        try {
            user_service.deleteUser(id);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
