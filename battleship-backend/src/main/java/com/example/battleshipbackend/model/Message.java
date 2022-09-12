package com.example.battleshipbackend.model;

/**
 * Klasa reprezentująca wiadomość przesyłaną protokołem WebSocket
 */
public class Message {

    /**
     * Nazwa nadawcy
     */
    private String senderName;
    /**
     * Nazwa odbiorcy
     */
    private String receiverName;
    /**
     * Treść wiadomości
     */
    private String message;
    /**
     * Data wysłania wiadomości
     */
    private String date;
    /**
     * Status wiadomości
     */
    private Status status;

    /**
     * Domyślny konstruktor
     */
    public Message() {
    }

    /**
     * Konstruktor przypisujący wartości poszczególnym polom
     * @param senderName nazwa nadawcy
     * @param receiverName nazwa odbiorcy
     * @param message treść wiadomości
     * @param date data wysłania wiadomości
     * @param status status wiadomości
     */
    public Message(String senderName, String receiverName, String message, String date, Status status) {
        this.senderName = senderName;
        this.receiverName = receiverName;
        this.message = message;
        this.date = date;
        this.status = status;
    }

    /**
     * Getter dla pola senderName
     * @return nazwa nadawcy
     */
    public String getSenderName() {
        return senderName;
    }

    /**
     * Getter dla pola receiverName
     * @return nazwa odbiorcy
     */
    public String getReceiverName() {
        return receiverName;
    }

    /**
     * Getter dla pola message
     * @return treść wiadomości
     */
    public String getMessage() {
        return message;
    }

    /**
     * Getter dla pola date
     * @return data wysłania wiadomości
     */
    public String getDate() {
        return date;
    }

    /**
     * Getter dla pola status
     * @return status wiadomości
     */
    public Status getStatus() {
        return status;
    }

    /**
     * Setter dla pola senderName
     * @param senderName nazwa nadawcy
     */
    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    /**
     * Setter dla pola receiverName
     * @param receiverName nazwa odbiorcy
     */
    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    /**
     * Setter dla pola message
     * @param message treść wiadomości
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * Setter dla pola date
     * @param date data wysłania wiadomości
     */
    public void setDate(String date) {
        this.date = date;
    }

    /**
     * Setter dla pola status
     * @param status status wiadomości
     */
    public void setStatus(Status status) {
        this.status = status;
    }

    /**
     * Metoda konwertująca obiekt Message do napisu
     * @return reprezentacja napisowa obiektu Message
     */
    @Override
    public String toString() {
        return "Message [senderName=" + senderName + ", receiverName=" + receiverName + ", message=" + message + ", date=" + date + ", status=" + status + "]";
    }
}