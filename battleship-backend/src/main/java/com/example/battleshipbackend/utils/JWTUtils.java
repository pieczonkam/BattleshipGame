package com.example.battleshipbackend.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

public class JWTUtils {

    private static final String SECRET_KEY = "CED05FCEC49340FE38746A87EEB511B06A708E252051AF562A144C4F022A675C";
    private static final long ttlMillis = 86_400_000;

    public static String generateJWT(Long id, String subject, String issuer) {
        return Jwts.builder().setId(id.toString()).setSubject(subject).setIssuer(issuer)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + ttlMillis))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public static Long getIdFromJWT(String token) {
        return Long.parseLong(Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getId());
    }

    public static String getEmailFromJWT(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getSubject();
    }

    public static String getUsernameFromJWT(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getIssuer();
    }

    public static boolean validateJWT(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            System.out.println("Invalid JWT signature: " + e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println("Invalid JWT token: " + e.getMessage());
        } catch (ExpiredJwtException e) {
            System.out.println("JWT token is expired: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("JWT token is unsupported: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("JWT claims string is empty: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("JWT Exception: " + e.getMessage());
        }

        return false;
    }
}
