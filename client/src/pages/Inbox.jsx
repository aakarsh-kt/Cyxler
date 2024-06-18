import React from "react";
import NavBar from "../components/NavBar";
import { Chats, db } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, Outlet } from "react-router-dom";
export default function () {
  const [user, setUser] = React.useState(null); // Initialize user state with null
  const [messages, setMessages] = React.useState([{ sender: "", thread: [] }]); // Initialize messages state with an empty array
  React.useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser.email);
        // console.log(currentUser.email);
        // console.log(user);
      } else {
        setUser(null); // Reset user state if no user is logged in
        console.log("No user");
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from the listener
  }, []);

  React.useEffect(() => {
    if (user) {
      // console.log(user);
      findMessages();
    }
  }, [user]);

  //   React.useEffect(() => {
  function findMessages() {
    // console.log(user);
    const unsubscribe = onSnapshot(Chats, function (snapshot) {
      const chat = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      //   console.log(chat);
      chat.forEach((item) => {
        // console.log(user);
        if (item.receiver === user) {
          setMessages([
            ...messages,
            {
              sender: item.sender,
              thread: item.thread,
            },
          ]);

          //   console.log(item);
        }
      });
    });
    return unsubscribe;
  }
  //   }, [user]);
  return (
    <div>
      <NavBar />
      {/* <div>
        {messages.map((message, i) => {
          console.log(message);
          return (
            <div>
              <h1>{message.sender}</h1>
              <ul >
                {message.thread.map((msg) => {
                  return <li>{msg}</li>;
                })}
              </ul>
            </div>
          );
        })}
      </div> */}
      <div className="inbox">
        <h1 className="inbox-header">Inbox</h1>
        <div className="message-list">
          {messages.map((message) => (
            <div key={message.id} className="message">
              <Link
                to={`/app/booking/chat?user=${user}&sender=${message.sender}`}
              >
                <div className="message-sender">{message.sender}</div>
              </Link>
              {/* <div className="message-subject">{message.subject}</div> */}
              <div className="message-body">
                {message.thread.map((msg) => {
                  return <li>{msg}</li>;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// const Inbox = () => {
//   const location = useLocation();
//   const [user, setUser] = useState("");

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const userParam = searchParams.get("user");
//     setUser(userParam);
//   }, [location]);

//   return (
//     <div>
//       <h1>Inbox</h1>
//       <p>User: {user}</p>
//       {/* Rest of your inbox component */}
//     </div>
//   );
// };

// export default Inbox;

// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { collection, query, where, orderBy, getDocs, } from "firebase/firestore";
// import { db } from "../firebase";

// const Inbox = () => {
//   const location = useLocation();
//   const [user, setUser] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const userParam = searchParams.get("user");
//     setUser(userParam);

//     // Fetch messages for the user
//     fetchMessages(userParam);
//   }, [location]);

//   const fetchMessages = async (user) => {
//     try {
//       const q = query(
//         collection(db, "Chats"),
//         orderBy("timestamp", "desc"),
//         where("sender", "==", user)
//       );
//       const querySnapshot = await getDocs(q);
//       const messageList = [];
//       querySnapshot.forEach((doc) => {
//         messageList.push({ id: doc.id, ...doc.data() });
//       });
//       setMessages(messageList);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Inbox</h1>
//       <p>User: {user}</p>
//       {loading ? (
//         <p>Loading messages...</p>
//       ) : (
//         <div>
//           <h2>Messages</h2>
//           <ul>
//             {messages.map((message) => (
//               <li key={message.id}>
//                 <strong>{message.sender}:</strong> {message.text}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Inbox;
