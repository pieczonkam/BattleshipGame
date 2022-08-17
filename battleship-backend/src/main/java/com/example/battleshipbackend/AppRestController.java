package com.example.battleshipbackend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AppRestController {

    @GetMapping("/")
    public String index() {
        return "This is the default page";
    }

    @GetMapping("/hello")
    public String sayHello(@RequestParam(value = "myName", defaultValue = "World") String name) {
        return "Hello " + name + "!";
    }
}
