package com.example.battleshipbackend.repository;

import com.example.battleshipbackend.model.Notification;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Tuple;
import javax.transaction.Transactional;
import java.util.List;

/**
 * Interfejs obsługujący zapytania do bazy danych związane z powiadomieniami
 */
@Repository
public interface NotificationRepository extends CrudRepository<Notification, Long> {

    /**
     * Zapytanie zwracające listę powiadomień danego użytkownika
     * @param userId ID użytkownika
     * @return lista powiadomień
     */
    @Query(value = "SELECT n.notification_id, n.from_user, u.username, n.notification_date, n.type FROM users_notifications n, users u WHERE n.user_id = ?1 AND n.from_user = u.user_id ORDER BY n.notification_date", nativeQuery = true)
    List<Tuple> getNotificationsByUserId(Long userId);

    /**
     * Zapytanie zwracające listę zapytań użytkownika userId otrzymanych od użytkownika fromUser typu type
     * @param userId ID użytkownika
     * @param fromUser ID nadawcy powiadomienia
     * @param type typ powiadomienia
     * @return lista pasujących powiadomień
     */
    @Query(value = "SELECT * FROM users_notifications WHERE user_id = ?1 AND from_user = ?2 AND type = ?3", nativeQuery = true)
    List<Notification> checkIfNotificationExists(Long userId, Long fromUser, String type);

    /**
     * Zapytanie usuwające dane powiadomienie
     * @param notificationId ID powiadomienia
     */
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM users_notifications WHERE notification_id = ?1", nativeQuery = true)
    void deleteNotification(Long notificationId);

    /**
     * Zapytanie usuwające dane powiadomienia
     * @param userId ID użytkownika
     * @param fromUser ID nadawcy powiadomienia
     */
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM users_notifications WHERE (user_id = ?1 AND from_user = ?2) OR (user_id = ?2 AND from_user = ?1)", nativeQuery = true)
    void deleteNotifications(Long userId, Long fromUser);

    /**
     * Zapytanie usuwające dane powiadomienia
     * @param userId ID użytkownika
     * @param fromUser ID nadawcy powiadomienia
     */
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM users_notifications WHERE user_id = ?1 AND from_user = ?2", nativeQuery = true)
    void deleteNotificationByUsersData(Long userId, Long fromUser);
}
