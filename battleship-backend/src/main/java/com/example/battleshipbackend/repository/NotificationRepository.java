package com.example.battleshipbackend.repository;

import com.example.battleshipbackend.model.Notification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends CrudRepository<Notification, Long> {

    @Query(value = "SELECT * FROM users_notification WHERE user_id = ?1", nativeQuery = true)
    List<Notification> getNotificationsByUserId(Long userId);
}
