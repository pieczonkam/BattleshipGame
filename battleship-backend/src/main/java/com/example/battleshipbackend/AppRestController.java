package com.example.battleshipbackend;

import com.example.battleshipbackend.model.User;
import com.example.battleshipbackend.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class AppRestController {

    @Autowired
    private IUserService user_service;

    @GetMapping(path = "/getUsers", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getUsers() {

        var users = (List<User>) user_service.findAll();

        System.out.println(user_service.count());

        List<HashMap<String, String>> users_json = new ArrayList<>();

        for (int i = 0; i < users.size(); ++i) {
            HashMap<String, String> user_json = new HashMap<>();
            user_json.put("user_id", users.get(i).getUserId().toString());
            user_json.put("username", users.get(i).getUsername());
            user_json.put("email", users.get(i).getEmail());

            users_json.add(user_json);
        }

        return new ResponseEntity<>(users_json, HttpStatus.OK);
    }

    @GetMapping(path = "/getUser", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getUser(@RequestParam(name = "id") Long id) {
        var user_optional = user_service.findUser(id);

        System.out.println(user_service.count());

        if (user_optional.isPresent()) {
            User user = user_optional.get();

            HashMap<String, String> user_json = new HashMap<>();
            user_json.put("user_id", user.getUserId().toString());
            user_json.put("username", user.getUsername());
            user_json.put("email", user.getEmail());

            return new ResponseEntity<>(user_json, HttpStatus.OK);
        }

        return new ResponseEntity<>("{}", HttpStatus.NOT_FOUND);
    }

    @GetMapping(path = "/deleteUser", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> deleteUser(@RequestParam(name = "id") Long id) {
        try {
            user_service.deleteUser(id);

            return new ResponseEntity<>("{}", HttpStatus.OK);
        } catch (EmptyResultDataAccessException e) {
            return new ResponseEntity<>("{}", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "/addUser")
    public ResponseEntity<Object> addUser() {
        return new ResponseEntity<>("{}", HttpStatus.OK);
    }
}
