package com.example.battleshipbackend.controller;

import com.example.battleshipbackend.model.User;
import com.example.battleshipbackend.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class AppController {

    @Autowired
    private IUserService user_service;

    @GetMapping("/showUsers")
    public String findUsers(Model model) {
        var users = (List<User>) user_service.findAll();

        model.addAttribute("users", users);

        return "showUsers";
    }
}
