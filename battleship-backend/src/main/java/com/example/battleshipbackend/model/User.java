package com.example.battleshipbackend.model;

import javax.persistence.*;

/**
 * Klasa reprezentująca instancję User z tabeli users
 */
@Entity
@Table(name = "users")
public class User {

    /**
     * ID użytkownika
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    /**
     * Nazwa użytkownika
     */
    @Column(name = "username")
    private String username;
    /**
     * Adres e-mail użytkownika
     */
    @Column(name = "email")
    private String email;
    /**
     * Hasło użytkownika
     */
    @Column(name = "password")
    private String password;

    /**
     * Domyślny konstruktor
     */
    public User() {
    }

    /**
     * Konstruktor przypisujący wartości poszczególnym polom
     * @param username nazwa użytkownika
     * @param email adres e-mail użytkownika
     * @param password hasło użytkownika
     */
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    /**
     * Konstruktor przypisujący wartości poszczególnym polom
     * @param userId ID użytkownika
     * @param username nazwa użytkownika
     * @param email adres e-mail użytkownika
     */
    public User(Long userId, String username, String email) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.password = "";
    }

    /**
     * Getter dla pola userId
     * @return ID użytkownika
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * Getter dla pola username
     * @return nazwa użytkownika
     */
    public String getUsername() {
        return username;
    }

    /**
     * Getter dla pola email
     * @return adres e-mail użytkownika
     */
    public String getEmail() {
        return email;
    }

    /**
     * Getter dla pola password
     * @return hasło użytkownika
     */
    public String getPassword() {
        return password;
    }

    /**
     * Setter dla pola username
     * @param username nazwa użytkownika
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Setter dla pola email
     * @param email adres e-mail użytkownika
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Setter dla pola password
     * @param password hasło użytkownika
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Metoda konwertująca obiekt User do napisu
     * @return reprezentacja napisowa obiektu User
     */
    @Override
    public String toString() {
        return "User [id=" + userId + ", username=" + username + ", email=" + email + "]";
    }
}
