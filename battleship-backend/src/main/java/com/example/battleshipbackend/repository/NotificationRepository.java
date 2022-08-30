package com.example.battleshipbackend.repository;

import com.example.battleshipbackend.model.Notification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Tuple;
import java.util.List;

@Repository
public interface NotificationRepository extends CrudRepository<Notification, Long> {

    @Query(value = "SELECT n.notification_id, n.from_user, u.username, n.notification_date, n.type FROM users_notifications n, users u WHERE n.user_id = ?1 AND n.from_user = u.user_id ORDER BY n.notification_date", nativeQuery = true)
    List<Tuple> getNotificationsByUserId(Long userId);

    @Query(value = "SELECT * FROM users_notifications WHERE user_id = ?1 AND from_user = ?2", nativeQuery = true)
    List<Notification> checkIfNotificationExists(Long userId, Long fromUser);
}
