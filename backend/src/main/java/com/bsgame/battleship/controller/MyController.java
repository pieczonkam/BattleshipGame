package com.bsgame.battleship.controller;

import com.bsgame.battleship.model.User;
import com.bsgame.battleship.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public class MyController {

    @Autowired
    private IUserService userService;

    @GetMapping("/showUsers")
    public String findUsers(Model model) {

        var users = (List<User>) userService.findAll();

        model.addAttribute("users", users);

        return "showUsers";
    }
}
