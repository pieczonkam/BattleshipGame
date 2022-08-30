package com.example.battleshipbackend.model;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "games")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gameId;
    @Column(name = "user_1")
    private Long user1;
    @Column(name = "user_2")
    private Long user2;
    @Column(name = "game_date")
    private Timestamp gameDate;
    @Column(name = "winner")
    private Long winner;

    public Game() {
    }

    public Game(Long user1, Long user2, Timestamp gameDate, Long winner) {
        this.user1 = user1;
        this.user2 = user2;
        this.gameDate = gameDate;
        this.winner = winner;
    }

    public Long getGameId() {
        return gameId;
    }

    public Long getUser1() {
        return user1;
    }

    public Long getUser2() {
        return user2;
    }

    public Timestamp getGameDate() {
        return gameDate;
    }

    public Long getWinner() {
        return winner;
    }

    public void setUser1(Long user1) {
        this.user1 = user1;
    }

    public void setUser2(Long user2) {
        this.user2 = user2;
    }

    public void setGameDate(Timestamp gameDate) {
        this.gameDate = gameDate;
    }

    public void setWinner(Long winner) {
        this.winner = winner;
    }

    @Override
    public String toString() {
        return "Game [id=" + gameId + ", user1=" + user1 + ", user2=" + user2 + ", gameDate=" + gameDate + ", winner=" + winner + "]";
    }
}

