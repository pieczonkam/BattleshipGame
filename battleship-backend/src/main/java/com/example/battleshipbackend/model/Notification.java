package com.example.battleshipbackend.model;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Klasa reprezentująca instancję Notification z tabeli users_notifications
 */
@Entity
@Table(name = "users_notifications")
public class Notification {
    /**
     * ID powiadomienia
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;
    /**
     * ID użytkownika
     */
    @Column(name = "user_id")
    private Long userId;
    /**
     * ID nadawcy powiadomienia
     */
    @Column(name = "from_user")
    private Long fromUser;
    /**
     * Data wysłania powiadomienia
     */
    @Column(name = "notification_date")
    private Timestamp notificationDate;
    /**
     * Typ powiadomienia
     */
    @Column(name = "type")
    private String type;

    /**
     * Domyślny konstruktor
     */
    public Notification() {
    }

    /**
     * Konstruktor przypisujący wartości poszczególnym polom
     * @param userId ID użytkownika
     * @param fromUser ID nadawcy powiadomienia
     * @param notificationDate data wysłania powiadomienia
     * @param type typ powiadomienia
     */
    public Notification(Long userId, Long fromUser, Timestamp notificationDate, String type) {
        this.userId = userId;
        this.fromUser = fromUser;
        this.notificationDate = notificationDate;
        this.type = type;
    }

    /**
     * Getter dla pola notificationID
     * @return ID powiadomienia
     */
    public Long getNotificationId() {
        return notificationId;
    }

    /**
     * Getter dla pola userID
     * @return ID użytkownika
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * Getter dla pola fromUser
     * @return ID nadawcy powiadomienia
     */
    public Long getFromUser() {
        return fromUser;
    }

    /**
     * Getter dla pola notificationDate
     * @return data wysłania powiadomienia
     */
    public Timestamp getNotificationDate() {
        return notificationDate;
    }

    /**
     * Getter dla pola type
     * @return typ powiadomienia
     */
    public String getType() {
        return type;
    }

    /**
     * Setter dla pola userId
     * @param userId ID użytkownika
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * Setter dla pola fromUser
     * @param fromUser ID nadawcy powiadomienia
     */
    public void setFromUser(Long fromUser) {
        this.fromUser = fromUser;
    }

    /**
     * Setter dla pola notificationDate
     * @param notificationDate data wysłania powiadomienia
     */
    public void setNotificationDate(Timestamp notificationDate) {
        this.notificationDate = notificationDate;
    }

    /**
     * Setter dla pola type
     * @param type typ powiadomienia
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * Metoda konwertująca obiekt Notification do napisu
     * @return reprezentacja napisowa obiektu Notification
     */
    @Override
    public String toString() {
        return "Notification [id=" + notificationId + ", userId=" + userId + ", fromUser=" + fromUser + ", notificationDate=" + notificationDate + ", type=" + type + "]";
    }
}
