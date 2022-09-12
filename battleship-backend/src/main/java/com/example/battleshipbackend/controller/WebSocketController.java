package com.example.battleshipbackend.controller;

import com.example.battleshipbackend.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

/**
 * Klasa pełniąca rolę kontrolera WebSocket
 */
@Controller
public class WebSocketController {

    /**
     * Obiekt SimpMessagingTemplate, służący do przesyłania wiadomości
     */
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    /**
     * Metoda przesyłająca otrzymaną wiadomość do właściwego odbiorcy
     * @param message wiadomość do przesłania
     * @return wiadomość do przesłania
     */
    @MessageMapping("/private-message")
    public Message recMessage(@Payload Message message) {
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(), "/private", message);
        return message;
    }
}
