import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Maps from "./components/Maps";
import MainContent from "./components/Rent.jsx";
import Result from "./components/Result";
import { FloatButton } from "antd";

import { Outlet, Link } from "react-router-dom";
import {
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Collection, db, Users } from "./firebase.js";
import AddCycle from "./components/AddCycle";
import Browse from "./components/browse";
import { Button } from "antd";
import { useLocation } from "react-router-dom";
import { auth } from "./firebase.js";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { coordinates } from "./components/coordinates.jsx";
export default function () {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    from: "",
    to: "",
    time: 0,
  });
  const [data, setData] = React.useState([
    { from: "Y4", owner: "P1" },
    { from: "Y3", owner: "P2" },
    { from: "G4", owner: "P3" },
    { from: "G3", owner: "P4" },
    { from: "LHC", owner: "P5" },
  ]);
  const [isMapVisible, setIsMapVisible] = React.useState(false);
  function handleChange(input) {
    console.log(input);
    setFormData({
      from: input.from,
      to: input.to,
      time: input.time,
    });
    searchCycle(input);
  }
  const [res, setRes] = React.useState([{ from: "" }]);
  const [val, setVal] = React.useState(false);
  function searchCycle(input) {
    const dat = data.filter((item) => {
      if (item.from === input.from) {
        console.log("Match Found");
        return item;
      }
    });

    setRes(dat);
    if (dat.length == 0) {
      console.log("Match Not Found");
    } else {
      setVal(true);
    }
  }
  const [markerPositions, setMarkerPositions] = React.useState([]);
  function addCycle(event) {
    setData([...data, { from: event.from, owner: event.owner }]);
    const location = event.from;
    setMarkerPositions([...markerPositions, location]);
    console.log(location);
    console.log(markerPositions);
    // console.log(data.length);
  }
  const [browse, setBrowse] = React.useState(false);
  function toggleBrowse() {
    setBrowse(!browse);
  }
  const [bookData, setBookData] = React.useState({ from: "", owner: "" });
  function bookCycle(item) {
    console.log(item);
    setBookData((prev) => {
      return { ...prev, from: item.from, owner: item.owner };
    });
    // console.log(bookData);
  }
  // React.useEffect(() => {
  //   console.log(bookData);
  // }, [bookData]);
  const [email, setEmail] = React.useState("");
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email2 = searchParams.get("user");
  React.useEffect(() => {
    if (email2) {
      setEmail(email2);
      // console.log(email2); // Log email2 here for visibility
    }
  }, [email2]);
  const [userFirebase, setUserFirebase] = React.useState("");
  const [user, setUser] = React.useState({
    username: "",
    password: "",
    email: "",
  });

  React.useEffect(() => {
    async function getUserInfo(email) {
      try {
        const q = query(collection(db, "Users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const document = querySnapshot.docs[0].data();
          // console.log(document);
          return document;
        } else {
          return null;
        }
      } catch (e) {
        console.error(e);
      }
    }

    async function getUserEmail(email) {
      try {
        const data = await getUserInfo(email);
        // console.log(data);
        return data;
      } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
      }
    }

    async function fetchData() {
      const currUser = await getUserEmail(email);
      setUser(currUser);
      // console.log(user);
    }

    fetchData();
  }, [email]);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserFirebase(currentUser);
      // console.log(currentUser.email);
    });
    // console.log(userFirebase);
    return () => unsubscribe();
  }, []);
  async function logout() {
    await signOut(auth);
    navigate("/");
  }
  return (
    <div className="mask">
      {/* {console.log(user)} */}
      <NavBar user={user} logout={logout} />

      {/* <MainContent formData={formData} handleChange={handleChange} /> */}
      <AddCycle addCycle={addCycle} />
      {val && <Result dat={res} />}
      {isMapVisible && <Maps markerPositions={markerPositions} />}
      <Button onClick={() => setIsMapVisible(!isMapVisible)}>Show Map</Button>
      <div>
        <Button type="primary" onClick={toggleBrowse}>
          Browse
        </Button>
        {browse && <Browse data={data} bookCycle={bookCycle} />}
      </div>
      <FloatButton />
      {/* <Footer /> */}
    </div>
  );
}
