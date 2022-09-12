package com.example.battleshipbackend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * Klasa kontrolera przekierowującego wybrane żądania
 */
@Controller
public class IndexRedirectController {

    /**
     * Metoda przekierowująca wybrane żądania na stronę główną
     * @param request żądanie
     * @return adres pliku index.html
     */
    @RequestMapping(value = {"/", "/game", "/login", "/register", "/profile"})
    public String redirectToIndex(HttpServletRequest request) {
        return "/index.html";
    }
}
