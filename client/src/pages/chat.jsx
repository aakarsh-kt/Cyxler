import React, { useState, useRef, useEffect } from "react";
import NavBar from "../components/NavBar";
import { db } from "../firebase";
import { useLocation } from "react-router";
import io from "socket.io-client";
import { getAuth,onAuthStateChanged } from "firebase/auth";
export default function() {
  const socket = io("ws://localhost:3000");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.user);
  const user2 = searchParams.get("owner");
  const auth = getAuth();
  const [user1, setUser1] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser1(user);
      } else {
        setUser1(null); // If the user is not logged in
      }
    });
  
    return () => unsubscribe(); // Unsubscribe from the listener when the component unmounts
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
          {console.log(auth.currentUser)}
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

//  ChatWindow;

// import React, { useState, useRef, useEffect } from "react";
// import NavBar from "../components/NavBar";
// import { bd,Chats } from "../firebase";
// import { useLocation } from "react-router";
// import io from "socket.io-client";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { ref, push, set, onValue } from "firebase/database";

// const ChatWindow = () => {
//   const socket = io("ws://localhost:3000");
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const messagesEndRef = useRef(null);
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.user);
//   const user2 = searchParams.get("owner");
//   const auth = getAuth();
//   const [user1, setUser1] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser1(user);
//         // Load messages from Firebase Realtime Database
//         loadMessages(user.uid, user2);
//       } else {
//         setUser1(null); // If the user is not logged in
//       }
//     });
  
//     return () => unsubscribe(); // Unsubscribe from the listener when the component unmounts
//   }, []);

//   useEffect(() => {
//     socket.on("message", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//       // Save message to Firebase Realtime Database
//       saveMessage(message);
//     });
//   }, []);

//   function sendMessage() {
//     if (inputValue.trim() === "") return;

//     const message = {
//       sender: user1.uid, // Assuming user1 is the sender
//       receiver: user2,
//       text: inputValue,
//       timestamp: Date.now()
//     };

//     socket.emit("message", message); // Emit message through socket

//     setInputValue(""); // Clear input field
//   }

//   // Function to load messages from Firebase Realtime Database
//   function loadMessages(senderId, receiverId) {
//     const messagesRef = bd.ref(`messages/${senderId}/${receiverId}`);
//     messagesRef.on("value", (snapshot) => {
//       const messagesData = snapshot.val();
//       if (messagesData) {
//         const messagesArray = Object.values(messagesData);
//         setMessages(messagesArray);
//       }
//     });
//   }

//   // Function to save message to Firebase Realtime Database
//   function saveMessage(message) {
//     const { sender, receiver, text, timestamp } = message;
//     bd.ref(`messages/${sender}/${receiver}`).push({
//       text,
//       timestamp
//     });
//   }

//   return (
//     <div className="flex--column">
//       <NavBar />
//       <div className="chat-window">
//         <div className="chat-messages">
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={`message ${
//                 message.sender === user1.uid ? "sent" : "received"
//               }`}
//             >
//               <div className="message-text">{message.text}</div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//         <div className="input-container">
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             placeholder="Type a message..."
//             className="input-field"
//             onKeyDown={(e) => {
//               if (e.key === "Enter") sendMessage();
//             }}
//           />
//           <button onClick={sendMessage} className="send-button">
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;
// import React, { useState, useEffect } from "react";
// import NavBar from "../components/NavBar";
// import { db,Chats } from "../firebase";
// import { useLocation } from "react-router";
// import io from "socket.io-client";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { collection, addDoc, query, orderBy, limit, onSnapshot,doc,getDoc,setDoc } from "firebase/firestore";
// import { useRef } from "react";
// import { where } from "firebase/firestore";
// const ChatWindow = () => {
//   const socket = io("ws://localhost:3000");
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const messagesEndRef = useRef(null);
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const [user2,setUser2] =React.useState("");
//   // const user2= searchParams.get("sender"); 
//   const auth = getAuth();
//   const [user1, setUser1] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser1(user);
//         setUser2(searchParams.get("sender"));
//         // Load messages from Firestore
//         loadMessages(user1, user2);
//       } else {
//         setUser1(null); // If the user is not logged in
//       }
//     });
  
//     return () => unsubscribe(); // Unsubscribe from the listener when the component unmounts
//   }, []);

//   useEffect(() => {
//     socket.on("message", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//       // Save message to Firestore
//       saveMessage(message);
//     });
//   }, []);

//   function sendMessage() {
//     if (inputValue.trim() === "") return;

//     const message = {
//       sender: user1.email, // Assuming user1 is the sender
//       receiver: user2,
//       text: inputValue,
//       timestamp: Date.now()
//     };

//     socket.emit("message", message); // Emit message through socket

//     setInputValue(""); // Clear input field
//   }

//   // Function to load messages from Firestore
//   function loadMessages(senderId, receiverId) {
//     const q = query(
//       collection(db, "Chats"),
//       orderBy('timestamp', 'desc'),
//       limit(50),
//       where('sender', '==', senderId),
//       where('receiver', '==', receiverId)
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = [];
//       snapshot.forEach((doc) => {
//         data.push({ id: doc.id, ...doc.data() });
//       });
//       setMessages(data);
//     });

//     return () => unsubscribe();
//   }

//   // Function to save message to Firestore
//   async function saveMessage(message) {
//     try {
//       const messageId = `${message.sender}-${message.receiver}-${message.timestamp}`;
  
//       // Check if the message already exists in Firestore
//       const messageRef = doc(db, 'Chats', messageId);
//       const docSnapshot = await getDoc(messageRef);
  
//       if (docSnapshot.exists()) {
//         // Document exists, update its content
//         await updateDoc(messageRef, {
//           sender: message.sender,
//           receiver: message.receiver,
//           text: message.text,
//           timestamp: message.timestamp
//         });
//       } else {
//         // Document doesn't exist, create a new one
//         await setDoc(messageRef, {
//           sender: message.sender,
//           receiver: message.receiver,
//           text: message.text,
//           timestamp: message.timestamp
//         });
//       }
//     } catch (error) {
//       console.error('Error saving message:', error);
//     }
//   }
  
  
//   return (
//     <div className="flex--column">
//       <NavBar />
//       {console.log(user1)}
//       {console.log(user2)}
//       <div className="chat-window">
//         <div className="chat-messages">
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={`message ${
//                 message.sender === user1.email ? "sent" : "received"
//               }`}
//             >
//               <div className="message-text">{message.text}</div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//         <div className="input-container">
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             placeholder="Type a message..."
//             className="input-field"
//             onKeyDown={(e) => {
//               if (e.key === "Enter") sendMessage();
//             }}
//           />
//           <button onClick={sendMessage} className="send-button">
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;
// import React, { useState, useEffect } from "react";
// import NavBar from "../components/NavBar";
// import { db } from "../firebase";
// import { useLocation } from "react-router";
// import io from "socket.io-client";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { collection, query, orderBy, limit, where, doc, setDoc, addDoc, onSnapshot } from "firebase/firestore";
// import { useRef } from "react";

// const ChatWindow = () => {
//   const socket = io("ws://localhost:3000");
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const messagesEndRef = useRef(null);
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const [user2, setUser2] = React.useState("");
//   const auth = getAuth();
//   const [user1, setUser1] = useState(null);
//   const [conversationId, setConversationId] = useState("");

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser1(user);
//         setUser2(searchParams.get("sender"));
//         setConversationId(generateConversationId(user.uid, searchParams.get("sender")));
//         loadMessages(conversationId);
//       } else {
//         setUser1(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     socket.on("message", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//       saveMessage(message);
//     });
//   }, []);

//   function sendMessage() {
//     if (inputValue.trim() === "") return;

//     const message = {
//       sender: user1.email,
//       receiver: user2,
//       text: inputValue,
//       timestamp: Date.now()
//     };

//     socket.emit("message", message);
//     setInputValue("");
//   }

//   function generateConversationId(user1Id, user2Id) {
//     // Generate a unique conversation id based on user ids
//     return user1Id < user2Id ? `${user1Id}_${user2Id}` : `${user2Id}_${user1Id}`;
//   }

//   function loadMessages(conversationId) {
//     const q = query(
//       collection(db, "Chats"),
//       orderBy('timestamp', 'desc'),
//       where('conversationId', '==', conversationId),
//       limit(50)
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = [];
//       snapshot.forEach((doc) => {
//         data.push({ id: doc.id, ...doc.data() });
//       });
//       setMessages(data);
//     });

//     return () => unsubscribe();
//   }

//   async function saveMessage(message) {
//     try {
//       await addDoc(collection(db, 'Chats'), {
//         sender: message.sender,
//         receiver: message.receiver,
//         text: message.text,
//         timestamp: message.timestamp,
//         conversationId: conversationId
//       });
//     } catch (error) {
//       console.error('Error saving message:', error);
//     }
//   }

//   return (
//     <div className="flex--column">
//       <NavBar />
//       <div className="chat-window">
//         <div className="chat-messages">
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={`message ${
//                 message.sender === user1.email ? "sent" : "received"
//               }`}
//             >
//               <div className="message-text">{message.text}</div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//         <div className="input-container">
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             placeholder="Type a message..."
//             className="input-field"
//             onKeyDown={(e) => {
//               if (e.key === "Enter") sendMessage();
//             }}
//           />
//           <button onClick={sendMessage} className="send-button">
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;
// import React, { useState, useEffect } from "react";
// import NavBar from "../components/NavBar";
// import { db } from "../firebase";
// import { useLocation } from "react-router";
// import io from "socket.io-client";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { collection, addDoc, query, orderBy, limit, onSnapshot, where } from "firebase/firestore";
// import { useRef } from "react";

// const ChatWindow = () => {
//   const socket = io("ws://localhost:3000");
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const messagesEndRef = useRef(null);
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const [user2, setUser2] = React.useState("");
//   const auth = getAuth();
//   const [user1, setUser1] = useState(null);
//   const [conversationId, setConversationId] = useState("");

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser1(user);
//         setUser2(searchParams.get("sender"));
//         setConversationId(generateConversationId(user.uid, searchParams.get("sender")));
//         loadMessages();
//       } else {
//         setUser1(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     socket.on("message", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//       saveMessage(message);
//     });
//   }, []);

//   function generateConversationId(user1Id, user2Id) {
//     // Generate a unique conversation id based on user ids
//     return user1Id < user2Id ? `${user1Id}_${user2Id}` : `${user2Id}_${user1Id}`;
//   }

//   function loadMessages() {
//     const q = query(
//       collection(db, "Chats"),
//       orderBy('timestamp', 'desc'),
//       where('conversationId', '==', conversationId),
//       limit(50)
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = [];
//       snapshot.forEach((doc) => {
//         data.push({ id: doc.id, ...doc.data() });
//       });
//       setMessages(data);
//     });

//     return () => unsubscribe();
//   }

//   function sendMessage() {
//     if (inputValue.trim() === "") return;

//     const message = {
//       sender: user1.email,
//       receiver: user2,
//       text: inputValue,
//       timestamp: Date.now(),
//       conversationId: conversationId // Ensure conversationId is included in the message
//     };

//     socket.emit("message", message);
//     setInputValue("");
//   }

//   async function saveMessage(message) {
//     try {
//       await addDoc(collection(db, 'Chats'), message);
//     } catch (error) {
//       console.error('Error saving message:', error);
//     }
//   }

//   return (
//     <div className="flex--column">
//       <NavBar />
//       <div className="chat-window">
//         <div className="chat-messages">
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={`message ${
//                 message.sender === user1.email ? "sent" : "received"
//               }`}
//             >
//               <div className="message-text">{message.text}</div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//         <div className="input-container">
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             placeholder="Type a message..."
//             className="input-field"
//             onKeyDown={(e) => {
//               if (e.key === "Enter") sendMessage();
//             }}
//           />
//           <button onClick={sendMessage} className="send-button">
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;
// import React, { useState, useEffect } from "react";
// import NavBar from "../components/NavBar";
// import { db } from "../firebase";
// import { useLocation } from "react-router";
// import io from "socket.io-client";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { collection, addDoc, query, orderBy, limit, onSnapshot, where, doc, setDoc ,getDoc} from "firebase/firestore";
// import { useRef } from "react";

// const ChatWindow = () => {
//   const socket = io("ws://localhost:3000");
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const messagesEndRef = useRef(null);
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const [user2, setUser2] = React.useState("");
//   const auth = getAuth();
//   const [user1, setUser1] = useState(null);
//   const [conversationId, setConversationId] = useState("");

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser1(user);
//         setUser2(searchParams.get("sender"));
//         setConversationId(generateConversationId(user.uid, searchParams.get("sender")));
//         loadMessages();
//       } else {
//         setUser1(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     socket.on("message", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//       saveMessage(message);
//     });
//   }, []);

//   function generateConversationId(user1Id, user2Id) {
//     // Generate a unique conversation id based on user ids
//     return user1Id < user2Id ? `${user1Id}_${user2Id}` : `${user2Id}_${user1Id}`;
//   }

//   function loadMessages() {
//     const q = query(
//       collection(db, "Chats"),
//       orderBy('timestamp', 'desc'),
//       where('conversationId', '==', conversationId),
//       limit(50)
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = [];
//       snapshot.forEach((doc) => {
//         data.push({ id: doc.id, ...doc.data() });
//       });
//       setMessages(data);
//     });

//     return () => unsubscribe();
//   }

//   function sendMessage() {
//     if (inputValue.trim() === "") return;
  
//     const message = {
//       sender: user1.email,
//       receiver: user2,
//       text: inputValue,
//       timestamp: Date.now(),
//       conversationId: conversationId
//     };
  
//     console.log("Sending message:", message); // Add this line to check if message is being sent
  
//     socket.emit("message", message);
//     setInputValue("");
//   }
  

//   async function saveMessage(message) {
//     try {
//       const conversationId = message.conversationId;
//       const messageId = `${conversationId}-${message.timestamp}`;
  
//       // Check if the message already exists in Firestore
//       const messageRef = doc(db, 'Chats', conversationId, 'Messages', messageId);
//       const docSnapshot = await getDoc(messageRef);
  
//       if (docSnapshot.exists()) {
//         // Document exists, update its content
//         await setDoc(messageRef, {
//           ...message,
//           id: messageId // Ensure message id is set
//         });
//       } else {
//         // Document doesn't exist, create a new one
//         await setDoc(messageRef, {
//           ...message,
//           id: messageId // Ensure message id is set
//         });
//       }
//     } catch (error) {
//       console.error('Error saving message:', error);
//     }
//   }
  
  
//   return (
//     <div className="flex--column">
//       <NavBar />
//       <div className="chat-window">
//         <div className="chat-messages">
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={`message ${
//                 message.sender === user1.email ? "sent" : "received"
//               }`}
//             >
//               <div className="message-text">{message.text}</div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//         <div className="input-container">
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             placeholder="Type a message..."
//             className="input-field"
//             onKeyDown={(e) => {
//               if (e.key === "Enter") sendMessage();
//             }}
//           />
//           <button onClick={sendMessage} className="send-button">
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;
