package com.example.battleshipbackend.model;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Klasa reprezentująca instancję Game z tabeli games
 */
@Entity
@Table(name = "games")
public class Game {
    /**
     * ID gry
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gameId;
    /**
     * ID pierwszego gracza
     */
    @Column(name = "user_1")
    private Long user1;
    /**
     * ID drugiego gracza
     */
    @Column(name = "user_2")
    private Long user2;
    /**
     * Data rozegrania gry
     */
    @Column(name = "game_date")
    private Timestamp gameDate;
    /**
     * ID zwycięzcy
     */
    @Column(name = "winner")
    private Long winner;

    /**
     * Domyślny konstruktor
     */
    public Game() {
    }

    /**
     * Konstruktor przypisujący wartości poszczególnym polom
     * @param user1 ID pierwszego gracza
     * @param user2 ID drugiego gracza
     * @param gameDate data rozegrania gry
     * @param winner ID zwycięzcy
     */
    public Game(Long user1, Long user2, Timestamp gameDate, Long winner) {
        this.user1 = user1;
        this.user2 = user2;
        this.gameDate = gameDate;
        this.winner = winner;
    }

    /**
     * Getter dla pola gameID
     * @return ID gry
     */
    public Long getGameId() {
        return gameId;
    }

    /**
     * Getter dla pola user1
     * @return ID pierwszego gracza
     */
    public Long getUser1() {
        return user1;
    }

    /**
     * Getter dla pola user2
     * @return ID drugiego gracza
     */
    public Long getUser2() {
        return user2;
    }

    /**
     * Getter dla pola gameDate
     * @return data rozegrania gry
     */
    public Timestamp getGameDate() {
        return gameDate;
    }

    /**
     * Getter dla pola winner
     * @return ID zwycięzcy
     */
    public Long getWinner() {
        return winner;
    }

    /**
     * Setter dla pola user1
     * @param user1 ID pierwszego gracza
     */
    public void setUser1(Long user1) {
        this.user1 = user1;
    }

    /**
     * Setter dla pola user2
     * @param user2 ID drugiego gracza
     */
    public void setUser2(Long user2) {
        this.user2 = user2;
    }

    /**
     * Setter dla pola gameDate
     * @param gameDate data rozegrania gry
     */
    public void setGameDate(Timestamp gameDate) {
        this.gameDate = gameDate;
    }

    /**
     * Setter dla pola winner
     * @param winner ID zwycięzcy
     */
    public void setWinner(Long winner) {
        this.winner = winner;
    }

    /**
     * Metoda konwertująca obiekt Game do napisu
     * @return reprezentacja napisowa obiektu Game
     */
    @Override
    public String toString() {
        return "Game [id=" + gameId + ", user1=" + user1 + ", user2=" + user2 + ", gameDate=" + gameDate + ", winner=" + winner + "]";
    }
}

