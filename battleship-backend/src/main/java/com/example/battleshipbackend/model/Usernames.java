package com.example.battleshipbackend.model;

/**
 * Klasa reprezentująca parę nazw użytkowników
 */
public class Usernames {

    /**
     * Nazwa pierwszego użytkownika
     */
    private String username1;
    /**
     * Nazwa drugiego użytkownika
     */
    private String username2;

    /**
     * Domyślny konstruktor
     */
    public Usernames() {
    }

    /**
     * Konstruktor przypisujący wartości poszczególnym polom
     * @param username1 nazwa pierwszego użytkownika
     * @param username2 nazwa drugiego użytkownika
     */
    public Usernames(String username1, String username2) {
        this.username1 = username1;
        this.username2 = username2;
    }

    /**
     * Getter dla pola username1
     * @return nazwa pierwszego użytkownika
     */
    public String getUsername1() {
        return username1;
    }

    /**
     * Getter dla pola username2
     * @return nazwa drugiego użytkownika
     */
    public String getUsername2() {
        return username2;
    }

    /**
     * Setter dla pola username1
     * @param username1 nazwa pierwszego użytkownika
     */
    public void setUsername1(String username1) {
        this.username1 = username1;
    }

    /**
     * Setter dla pola username2
     * @param username2 nazwa drugiego użytkownika
     */
    public void setUsername2(String username2) {
        this.username2 = username2;
    }

    /**
     * Metoda konwertująca obiekt Usernames do napisu
     * @return reprezentacja napisowa obiektu Usernames
     */
    @Override
    public String toString() {
        return "Usernames [username1=" + username1 + ", username2=" + username2 + "]";
    }
}
