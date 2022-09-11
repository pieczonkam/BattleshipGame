package com.example.battleshipbackend.repository;

import com.example.battleshipbackend.model.Notification;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Tuple;
import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface NotificationRepository extends CrudRepository<Notification, Long> {

    @Query(value = "SELECT n.notification_id, n.from_user, u.username, n.notification_date, n.type FROM users_notifications n, users u WHERE n.user_id = ?1 AND n.from_user = u.user_id ORDER BY n.notification_date", nativeQuery = true)
    List<Tuple> getNotificationsByUserId(Long userId);

    @Query(value = "SELECT * FROM users_notifications WHERE user_id = ?1 AND from_user = ?2 AND type = ?3", nativeQuery = true)
    List<Notification> checkIfNotificationExists(Long userId, Long fromUser, String type);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM users_notifications WHERE notification_id = ?1", nativeQuery = true)
    void deleteNotification(Long notificationId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM users_notifications WHERE (user_id = ?1 AND from_user = ?2) OR (user_id = ?2 AND from_user = ?1)", nativeQuery = true)
    void deleteNotifications(Long userId, Long fromUser);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM users_notifications WHERE user_id = ?1 AND from_user = ?2", nativeQuery = true)
    void deleteNotificationByUsersData(Long userId, Long fromUser);
}
