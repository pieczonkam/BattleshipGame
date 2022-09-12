package com.example.battleshipbackend.model;

/**
 * Typ wyliczeniowy zawierający różne statusy wiadomości przesyłanych protokołem WebSocket
 */
public enum Status {
    ACCEPT,
    DECLINE,
    CANCEL,
    READY,
    SURRENDER,
    TIME,
    COORDINATES,
    HIT,
    SHIP_SUNK,
    WIN
}
