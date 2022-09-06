package com.example.battleshipbackend.service;

import com.example.battleshipbackend.model.Notification;

import javax.persistence.Tuple;
import java.util.List;

public interface INotificationService {

    Notification addNotification(Notification notification);
    void deleteNotification(Long id);
    void deleteNotifications(Long userId, Long fromUser);
    List<Tuple> getNotificationsByUserId(Long userId);
    List<Notification> checkIfNotificationExists(Long userId, Long fromUser, String type);
}
