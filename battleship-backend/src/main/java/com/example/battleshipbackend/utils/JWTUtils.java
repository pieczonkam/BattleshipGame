package com.example.battleshipbackend.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;

import java.util.Date;

public class JWTUtils {

    private static final String SECRET_KEY = "CED05FCEC49340FE38746A87EEB511B06A708E252051AF562A144C4F022A675C";
    private static final long ttlMillis = 86_400_000;

    public static String generateJWT(Long id) {
        return Jwts.builder().setId(id.toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + ttlMillis))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public static Long getIdFromJWT(String token) {
        return Long.parseLong(Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getId());
    }

    public static boolean validateJWT(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
