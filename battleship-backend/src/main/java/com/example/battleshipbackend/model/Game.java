package com.example.battleshipbackend.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "games")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gameId;
    @Column(name = "user_1")
    private String user1;
    @Column(name = "user_2")
    private String user2;
    @Column(name = "game_date")
    private Date gameDate;
    @Column(name = "winner")
    private String winner;

    public Game() {
    }

    public Game(String user1, String user2, Date gameDate, String winner) {
        this.user1 = user1;
        this.user2 = user2;
        this.gameDate = gameDate;
        this.winner = winner;
    }

    public Long getGameId() {
        return gameId;
    }

    public String getUser1() {
        return user1;
    }

    public String getUser2() {
        return user2;
    }

    public Date getGameDate() {
        return gameDate;
    }

    public String getWinner() {
        return winner;
    }

    public void setUser1(String user1) {
        this.user1 = user1;
    }

    public void setUser2(String user2) {
        this.user2 = user2;
    }

    public void setGameDate(Date gameDate) {
        this.gameDate = gameDate;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    @Override
    public String toString() {
        return "Notification [id=" + gameId + ", user1=" + user1 + ", user2=" + user2 + ", gameDate=" + gameDate + ", winner=" + winner + "]";
    }
}

