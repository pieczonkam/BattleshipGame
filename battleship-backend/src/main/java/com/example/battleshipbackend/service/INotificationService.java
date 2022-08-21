package com.example.battleshipbackend.service;

import com.example.battleshipbackend.model.Notification;

import java.util.List;

public interface INotificationService {

    Notification addNotification(Notification notification);
    void deleteNotification(Long id);
    List<Notification> getNotificationsByUserId(Long userId);
}
