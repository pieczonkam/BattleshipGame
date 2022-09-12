package com.example.battleshipbackend.service;

import com.example.battleshipbackend.model.Notification;
import com.example.battleshipbackend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Tuple;
import java.util.List;

/**
 * Klasa reprezentująca serwis odpowiedzialny za zapytania do bazy danych związane z powiadomieniami
 */
@Service
public class NotificationService implements INotificationService {

    /**
     * Obiekt NotificationRepository
     */
    @Autowired
    private NotificationRepository notificationRepository;

    /**
     * Metoda dodająca nowe powiadomienie do bazy danych
     * @param notification dane powiadomienia
     * @return dodane powiadomienie
     */
    @Override
    public Notification addNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    /**
     * Metoda usuwająca powiadomienie z bazy danych
     * @param id ID powiadomienia
     */
    @Override
    public void deleteNotification(Long id) {
        notificationRepository.deleteNotification(id);
    }

    /**
     * Metoda usuwająca z bazy danych powiadomienia powiązane z danym użytkownikiem i wysłane przez danego nadawcę
     * @param userId ID użytkownika
     * @param fromUser ID nadawcy powiadomienia
     */
    @Override
    public void deleteNotifications(Long userId, Long fromUser) {
        notificationRepository.deleteNotifications(userId, fromUser);
    }

    /**
     * Metoda usuwająca z bazy danych powiadomienia powiązane z danym użytkownikiem i wysłane przez danego nadawcę
     * @param userId ID użytkownika
     * @param fromUser ID nadawcy powiadomienia
     */
    @Override
    public void deleteNotificationByUsersData(Long userId, Long fromUser) {
        notificationRepository.deleteNotificationByUsersData(userId, fromUser);
    }

    /**
     * Metoda zwracająca listę powiadomień danego użytkownika
     * @param userId ID użytkownika
     * @return lista powiadomień
     */
    @Override
    public List<Tuple> getNotificationsByUserId(Long userId) {
        return notificationRepository.getNotificationsByUserId(userId);
    }

    /**
     * Metoda zwracająca listę powiadomień użytkownika userId wysłanych przez nadawcę fromUser typu type
     * @param userId ID użytkownika
     * @param fromUser ID nadawcy powiadomienia
     * @param type typ powiadomienia
     * @return lista pasujących powiadomień
     */
    @Override
    public List<Notification> checkIfNotificationExists(Long userId, Long fromUser, String type) {
        return notificationRepository.checkIfNotificationExists(userId, fromUser, type);
    }
}
