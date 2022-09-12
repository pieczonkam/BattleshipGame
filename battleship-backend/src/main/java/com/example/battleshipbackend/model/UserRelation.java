package com.example.battleshipbackend.model;

import javax.persistence.*;

/**
 * Klasa reprezentująca instancję UserRelation z tabeli users_relations
 */
@Entity
@Table(name = "users_relations")
public class UserRelation {
    /**
     * ID relacji
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long relationId;
    /**
     * ID pierwszego użytkownika
     */
    @Column(name = "user_1")
    private Long user1;
    /**
     * ID drugiego użytkownika
     */
    @Column(name = "user_2")
    private Long user2;

    /**
     * Domyślny konstruktor
     */
    public UserRelation() {
    }

    /**
     * Konstruktor przypisujący wartości poszczególnym polom
     * @param user1 ID pierwszego użytkownika
     * @param user2 ID drugiego użytkownika
     */
    public UserRelation(Long user1, Long user2) {
        this.user1 = user1;
        this.user2 = user2;
    }

    /**
     * Getter dla pola user1
     * @return ID pierwszego użytkownika
     */
    public Long getUser1() {
        return user1;
    }

    /**
     * Getter dla pola user2
     * @return ID drugiego użytkownika
     */
    public Long getUser2() {
        return user2;
    }

    /**
     * Setter dla pola user1
     * @param user1 ID pierwszego użytkownika
     */
    public void setUser1(Long user1) {
        this.user1 = user1;
    }

    /**
     * Setter dla pola user2
     * @param user2 ID drugiego użytkownika
     */
    public void setUser2(Long user2) {
        this.user2 = user2;
    }

    /**
     * Metoda konwertująca obiekt UserRelation do napisu
     * @return reprezentacja napisowa obiektu UserRelation
     */
    @Override
    public String toString() {
            return "UserRelation [id=" + relationId + ", user1=" + user1 + ", user2=" + user2 + "]";
        }
}
