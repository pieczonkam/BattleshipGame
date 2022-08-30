package com.example.battleshipbackend.model;

import javax.persistence.*;

@Entity
@Table(name = "users_relations")
public class UserRelation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long relationId;
    @Column(name = "user_1")
    private Long user1;
    @Column(name = "user_2")
    private Long user2;

    public UserRelation() {
    }

    public UserRelation(Long user1, Long user2) {
        this.user1 = user1;
        this.user2 = user2;
    }

    public Long getUser1() {
        return user1;
    }

    public Long getUser2() {
        return user2;
    }

    public void setUser1(Long user1) {
        this.user1 = user1;
    }

    public void setUser2(Long user2) {
        this.user2 = user2;
    }

    @Override
    public String toString() {
            return "UserRelation [id=" + relationId + ", user1=" + user1 + ", user2=" + user2 + "]";
        }
}
