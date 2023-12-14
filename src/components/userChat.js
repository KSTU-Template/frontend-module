import React, { useState } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import "../styles/userChat.css"; // Создай файл стилей UserChat.css

const UserChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessages = [...messages, { sender: "user", text: inputMessage }];
    setMessages(newMessages);
    setInputMessage("");
    simulateBotReply(newMessages);
  };

  const simulateBotReply = (messages) => {
    setTimeout(() => {
      const botReply = { sender: "bot", text: "Привет, я бот! Как я могу помочь?" };
      setMessages([...messages, botReply]);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <ListGroup className="message-list">
        {messages.map((message, index) => (
          <ListGroup.Item key={index} className={`message ${message.sender}`}>
            {message.text}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Form onSubmit={handleSubmit} className="message-input">
        <Form.Group controlId="message">
          <Form.Control
            type="text"
            placeholder="Введите сообщение"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Отправить
        </Button>
      </Form>
    </div>
  );
};

export default UserChat;
