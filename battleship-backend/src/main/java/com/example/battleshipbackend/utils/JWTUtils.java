package com.example.battleshipbackend.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;

import java.util.Date;

/**
 * Klasa odpowiedzialna za operacje związane z tokenem JWT
 */
public class JWTUtils {

    /**
     * Sekretny klucz służący do generowania tokenu JWT
     */
    private static final String SECRET_KEY = "CED05FCEC49340FE38746A87EEB511B06A708E252051AF562A144C4F022A675C";
    /**
     * Czas życia tokenu JWT w milisekundach
     */
    private static final long ttlMillis = 86_400_000;

    /**
     * Metoda generująca token JWT na podstawie przekazanego ID użytkownika
     * @param id ID użytkownika
     * @return wygenerowany token JWT
     */
    public static String generateJWT(Long id) {
        return Jwts.builder().setId(id.toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + ttlMillis))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    /**
     * Metoda pozyskująca ID użytkownika z przekazanego tokenu JWT
     * @param token token JWT
     * @return ID użytkownika
     */
    public static Long getIdFromJWT(String token) {
        return Long.parseLong(Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getId());
    }

    /**
     * Metoda sprawdzająca, czy przekazany token JWT jest poprawny
     * @param token token JWT
     * @return wartość logiczna wskazująca, czy token JWT jest poprawny
     */
    public static boolean validateJWT(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
