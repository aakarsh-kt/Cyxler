import React, { useState, useRef, useEffect } from "react";
import NavBar from "../components/NavBar";
import { db } from "../firebase";
import { useLocation } from "react-router";
import io from "socket.io-client";
import { getAuth } from "firebase/auth";
const ChatWindow = () => {
  const socket = io("ws://localhost:3000");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user2 = searchParams.get("owner");
  const auth = getAuth();
  const [user1, setUser1] = useState(null);

  useEffect(() => {
    setUser1(auth.currentUser);
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  function sendMessage() {
    if (inputValue.trim() === "") return;

    const message = {
      sender: user1, // Assuming user1 is the sender
      text: inputValue,
    };

    socket.emit("message", message); // Emit message through socket

    setInputValue(""); // Clear input field
  }

  return (
    <div className="flex--column">
      <NavBar />
      <div className="chat-window">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === user1 ? "sent" : "received"
              }`}
            >
              <div className="message-text">{message.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="input-field"
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button onClick={sendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
