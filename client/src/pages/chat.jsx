import React, { useState, useRef, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Chats, db } from "../firebase";
import { useLocation } from "react-router";
import io from "socket.io-client";
import {
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { on } from "events";
const ChatWindow = () => {
  const socket = io("ws://localhost:3000");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const loc = searchParams.get("loc");
  const user2 = searchParams.get("owner");
  const user = searchParams.get("user");
  const auth = getAuth();
  const [user1, setUser1] = React.useState(null);

  const [chatId, setChatId] = useState("");
  const user1Promise = new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // setUser1(currentUser.email);
        // console.log(currentUser.email);
        resolve(currentUser.email); // Resolve the Promise with user1 value
      } else {
        reject(new Error("No user")); // Reject the Promise if there is no user
      }
    });
  });
  React.useEffect(() => {
    const unsubscribe = onSnapshot(Chats, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (
          (data.sender === user1 && data.receiver === user2) ||
          (data.sender === user2 && data.receiver === user1)
        ) {
          setChatId(doc.id);
          // setMessages(data.thread);
        }
      });
      // Handle snapshot changes
    });

    return () => {
      unsubscribe(); // Unsubscribe from snapshot listener when component unmounts
    };
  }, []);

  user1Promise.then((user1) => {
    console.log(user1, user2);

    console.log(chatId);
  });
  // console.log(user1Promise);
  console.log("Hello there mate!!");
  async function addMessage(inputValue, chatId) {
    const ref = doc(db, "Chats", chatId);
    await updateDoc(ref, {
      thread: arrayUnion(inputValue),
    });
  }
  async function deleteChat(id) {
    const docRef = doc(db, "Chats", id);
    await deleteDoc(docRef);
  }
  return (
    <div className="flex--column">
      <NavBar />
      <div className="chat-window">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              // className={`message ${
              //   message.sender === user1Promise.finally ? "sent" : "received"
              // }`}
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
          <button
            //  onClick={sendMessage}
            className="send-button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
