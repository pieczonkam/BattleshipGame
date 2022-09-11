package com.example.battleshipbackend.model;

public class Usernames {

    private String username1;
    private String username2;

    public Usernames() {
    }

    public Usernames(String username1, String username2) {
        this.username1 = username1;
        this.username2 = username2;
    }

    public String getUsername1() {
        return username1;
    }

    public String getUsername2() {
        return username2;
    }

    public void setUsername1(String username1) {
        this.username1 = username1;
    }

    public void setUsername2(String username2) {
        this.username2 = username2;
    }

    @Override
    public String toString() {
        return "Usernames [username1=" + username1 + ", username2=" + username2 + "]";
    }
}
