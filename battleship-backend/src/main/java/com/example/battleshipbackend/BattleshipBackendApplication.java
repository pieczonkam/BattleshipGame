package com.example.battleshipbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class BattleshipBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BattleshipBackendApplication.class, args);
    }
}
