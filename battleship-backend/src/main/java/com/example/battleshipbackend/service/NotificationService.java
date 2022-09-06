package com.example.battleshipbackend.service;

import com.example.battleshipbackend.model.Notification;
import com.example.battleshipbackend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Tuple;
import java.util.List;

@Service
public class NotificationService implements INotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public Notification addNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public void deleteNotification(Long id) {
        notificationRepository.deleteNotification(id);
    }

    @Override
    public void deleteNotifications(Long userId, Long fromUser) {
        notificationRepository.deleteNotifications(userId, fromUser);
    }

    @Override
    public List<Tuple> getNotificationsByUserId(Long userId) {
        return notificationRepository.getNotificationsByUserId(userId);
    }

    @Override
    public List<Notification> checkIfNotificationExists(Long userId, Long fromUser, String type) {
        return notificationRepository.checkIfNotificationExists(userId, fromUser, type);
    }
}
