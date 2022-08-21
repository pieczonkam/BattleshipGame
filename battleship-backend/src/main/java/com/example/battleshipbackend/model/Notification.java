package com.example.battleshipbackend.model;

import javax.persistence.*;

@Entity
@Table(name = "users_notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "from_user")
    private Long fromUser;
    @Column(name = "type")
    private String type;

    public Notification() {
    }

    public Notification(Long userId, Long fromUser, String type) {
        this.userId = userId;
        this.fromUser = fromUser;
        this.type = type;
    }

    public Long getNotificationId() {
        return notificationId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getFromUser() {
        return fromUser;
    }

    public String getType() {
        return type;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setFromUser(Long fromUser) {
        this.fromUser = fromUser;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "Notification [id=" + notificationId + ", userId=" + userId + ", fromUser=" + fromUser + ", type=" + type + "]";
    }
}
