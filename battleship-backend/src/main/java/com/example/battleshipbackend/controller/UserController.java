package com.example.battleshipbackend.controller;

import com.example.battleshipbackend.model.Notification;
import com.example.battleshipbackend.model.User;
import com.example.battleshipbackend.model.UserRelation;
import com.example.battleshipbackend.service.INotificationService;
import com.example.battleshipbackend.service.IUserRelationService;
import com.example.battleshipbackend.service.IUserService;
import com.example.battleshipbackend.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Tuple;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * Klasa pełniąca rolę kontrolera dla zapytań związanych z użytkownikami
 */
@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {

    /**
     * Obiekt UserService pozwalający na wykonanie poszczególnych operacji na bazie danych
     */
    @Autowired
    private IUserService userService;
    /**
     * Obiekt NotificationService pozwalający na wykonanie poszczególnych operacji na bazie danych
     */
    @Autowired
    private INotificationService notificationService;
    /**
     * Obiekt UserRelationService pozwalający na wykonanie poszczególnych operacji na bazie danych
     */
    @Autowired
    private IUserRelationService userRelationService;

    /**
     * Metoda obsługująca żądanie zwrócenia listy znajomych danego użytkownika
     * @param authorizationHeader nagłówek zawierający token JWT
     * @return status HTTP oraz lista znajomych danego użytkownika
     */
    @GetMapping(path = "/getFriends", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<User>> getFriends(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }

            List<User> friends = userService.getFriendsById(JWTUtils.getIdFromJWT(jwt));
            List<User> _friends = new ArrayList<>();

            for (User f: friends) {
                _friends.add(new User(f.getUserId(), f.getUsername(), f.getEmail()));
            }

            return new ResponseEntity<>(_friends, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Metoda obsługująca zwrócenie listy użytkowników pasujących do podanego wzorca
     * @param authorizationHeader nagłówek zawierający token JWT
     * @param pattern wzorzec, na podstawie którego wybierani są użytkownicy
     * @return status HTTP oraz lista użytkowników pasujących do wzorca
     */
    @GetMapping(path = "/getPotentialFriends/{pattern}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<User>> findUsers(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable String pattern) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }

            List<User> users;
            if (pattern.equals("*")) {
                users = userService.getPotentialFriendsByIdAll(JWTUtils.getIdFromJWT(jwt));
            } else {
                users = userService.getPotentialFriendsById(JWTUtils.getIdFromJWT(jwt), "%" + pattern + "%");
            }
            List<User> _users = new ArrayList<>();

            for (User user: users) {
                _users.add(new User(user.getUserId(), user.getUsername(), user.getEmail()));
            }

            return new ResponseEntity<>(_users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Metoda obsługująca żądanie zwrócenia danych użytkownika
     * @param authorizationHeader nagłówek zawierający token JWT
     * @return status HTTP oraz dane użytkownika
     */
    @GetMapping(path = "/getUser", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }

            User user = userService.getUserById(JWTUtils.getIdFromJWT(jwt));
            if (user == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(new User(user.getUserId(), user.getUsername(), user.getEmail()), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Metoda sprawdzająca, czy podane hasło jest poprawne
     * @param authorizationHeader nagłówek zawierający token JWT
     * @param user dane użytkownika
     * @return status HTTP oraz wartość logiczna wskazująca, czy hasło jest poprawne
     */
    @PostMapping(path = "/passwordCorrect", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> passwordCorrect(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody User user) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }

            User _user = userService.getUserById(JWTUtils.getIdFromJWT(jwt));
            if (_user == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }

            PasswordEncoder password_encoder = new BCryptPasswordEncoder();
            if (password_encoder.matches(user.getPassword(), _user.getPassword())) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            }

            return new ResponseEntity<>(false, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Metoda obsługująca żądanie zmiany hasła użytkownika
     * @param authorizationHeader nagłówek zawierający token JWT
     * @param user dane użytkownika
     * @return status HTTP
     */
    @PutMapping(path = "/changePassword", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HttpStatus> changePassword(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody User user) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            User _user = userService.getUserById(JWTUtils.getIdFromJWT(jwt));
            if (_user == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            _user.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.addUser(_user);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Metoda obsługująca żądanie zmiany adresu e-mail użytkownika
     * @param authorizationHeader nagłówek zawierający token JWT
     * @param user dane użytkownika
     * @return status HTTP
     */
    @PutMapping(path = "/changeEmail", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HttpStatus> changeEmail(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody User user) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            User _user = userService.getUserByEmail(user.getEmail());
            if (_user != null && !_user.getUserId().equals(JWTUtils.getIdFromJWT(jwt))) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }

            User __user = userService.getUserById(JWTUtils.getIdFromJWT(jwt));
            if (__user == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            __user.setEmail(user.getEmail());
            userService.addUser(__user);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Metoda obsługująca żądanie zmiany nazwy użytkownika
     * @param authorizationHeader nagłówek zawierający token JWT
     * @param user dane użytkownika
     * @return status HTTP
     */
    @PutMapping(path = "/changeUsername", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HttpStatus> changeUsername(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody User user) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            User _user = userService.getUserByUsername(user.getUsername());
            if (_user != null && !_user.getUserId().equals(JWTUtils.getIdFromJWT(jwt))) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }

            User __user = userService.getUserById(JWTUtils.getIdFromJWT(jwt));
            if (__user == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            __user.setUsername(user.getUsername());
            userService.addUser(__user);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Metoda obsługująca żądanie dodania nowego powiadomienia
     * @param authorizationHeader nagłówek zawierający token JWT
     * @param notification dane powiadomienia
     * @return status HTTP
     */
    @PostMapping(path = "/addNotification", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HttpStatus> addNotification(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody Notification notification) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            Long userId = notification.getUserId();
            Long fromUser = JWTUtils.getIdFromJWT(jwt);
            String notificationType = notification.getType();

            List<Notification> notifications = notificationService.checkIfNotificationExists(userId, fromUser, notificationType);

            if (notifications.size() > 1) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

            Instant nowUtc = Instant.now();
            ZoneId europeWarsaw = ZoneId.of("Europe/Warsaw");
            ZonedDateTime nowEuropeWarsaw = ZonedDateTime.ofInstant(nowUtc, europeWarsaw);
            Date currentTime = Date.from(nowEuropeWarsaw.toInstant());

            if (notifications.size() == 1) {
                Notification _notification = notifications.get(0);

                _notification.setNotificationDate(new Timestamp(currentTime.getTime()));
                notificationService.addNotification(_notification);

                return new ResponseEntity<>(HttpStatus.OK);
            }

            Boolean relationExists = userRelationService.checkIfRelationExists(userId, fromUser).size() > 0;

            if (notificationType.equals("invite-friend")) {
                if (!relationExists) {
                    notificationService.addNotification(new Notification(userId, fromUser, new Timestamp(currentTime.getTime()), notification.getType()));
                }
            } else if (notificationType.equals("invite-game")) {
                if (!relationExists) {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }

                notificationService.addNotification(new Notification(userId, fromUser, new Timestamp(currentTime.getTime()), notification.getType()));
            }

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Metoda obsługująca żądanie zwrócenia listy powiadomień
     * @param authorizationHeader nagłówek zawierający token JWT
     * @return status HTTP oraz lista powiadomień
     */
    @GetMapping(path = "/getNotifications", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<HashMap<String, String>>> getNotifications(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }

            List<Tuple> notifications = notificationService.getNotificationsByUserId(JWTUtils.getIdFromJWT(jwt));
            List<HashMap<String, String>> _notifications = new ArrayList<>();

            for (Tuple n: notifications) {
                HashMap<String, String> notification = new HashMap<>();
                notification.put("notification_id", n.get("notification_id").toString());
                notification.put("from_user", n.get("from_user").toString());
                notification.put("username", n.get("username").toString());
                notification.put("notification_date", n.get("notification_date").toString());
                notification.put("type", n.get("type").toString());

                _notifications.add(notification);
            }

            return new ResponseEntity<>(_notifications, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Metoda obsługująca żądanie usunięcia danego powiadomienia
     * @param authorizationHeader nagłówek zawierający token JWT
     * @param notificationId adres ID powiadomienia do usunięcia
     * @return status HTTP
     */
    @DeleteMapping(path = "/deleteNotification/{notificationId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HttpStatus> deleteNotification(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable Long notificationId) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            notificationService.deleteNotification(notificationId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Metoda obsługująca żądanie usunięcia danego powiadomienia, na podstawie nazwy użytkownika, do którego jest ono przypisane
     * @param authorizationHeader nagłówek zawierający token JWT
     * @param username nazwa użytkownika
     * @return status HTTP
     */
    @DeleteMapping(path = "/deleteNotificationByUsersData/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HttpStatus> deleteNotificationByUsersData(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable String username) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            notificationService.deleteNotificationByUsersData(userService.getUserByUsername(username).getUserId(), JWTUtils.getIdFromJWT(jwt));
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Metoda obsługująca żądanie dodania nowego przyjaciela
     * @param authorizationHeader nagłówek zawierający token JWT
     * @param userRelation obiekt zawierający informacje o nowym przyjacielu
     * @return status HTTP
     */
    @PostMapping(path = "/addFriend", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HttpStatus> addFriend(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody UserRelation userRelation) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            Long user1 = userRelation.getUser1();
            Long user2 = JWTUtils.getIdFromJWT(jwt);

            if (userRelationService.checkIfRelationExists(user1, user2).size() == 0) {
                userRelationService.addRelation(new UserRelation(user1, user2));
            }

            notificationService.deleteNotifications(user1, user2);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Metoda obsługująca żądanie usunięcia przyjaciela
     * @param authorizationHeader nagłówek zawierający token JWT
     * @param friendId adres ID przyjaciela
     * @return status HTTP
     */
    @DeleteMapping(path = "/deleteFriend/{friendId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HttpStatus> deleteFriend(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable Long friendId) {
        try {
            String jwt = authorizationHeader.replace("Bearer ", "");
            if (!JWTUtils.validateJWT(jwt)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            Long user1 = friendId;
            Long user2 = JWTUtils.getIdFromJWT(jwt);

            if (userRelationService.checkIfRelationExists(user1, user2).size() > 0) {
                userRelationService.deleteRelation(user1, user2);
            }

            notificationService.deleteNotifications(user1, user2);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
