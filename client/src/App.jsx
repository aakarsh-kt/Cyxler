import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Sidebar from "./components/sidebar";
import { getAuth } from "firebase/auth";
import Maps from "./components/Maps";
import Rent from "./components/Rent.jsx";
import Result from "./components/Result";
import { FloatButton } from "antd";
import Cycles from "./pages/cycles";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { Collection, db, Users,eventCollection,MarkerCollection } from "./firebase.js";
import AddCycle from "./components/AddCycle";
import Browse from "./components/browse";
import { Button } from "antd";
import { useLocation } from "react-router-dom";
import { auth } from "./firebase.js";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { coordinates } from "./components/coordinates.jsx";
import { nanoid } from "nanoid";
export default function () {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    from: "",
    to: "",
    time: 0,
  });
  // function reportUser(){
  //   navigate("/app/report");
  // }
  React.useEffect(() => {
    const unsubscribe = onSnapshot(Collection, function (snapshot) {
      const cycleArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(cycleArray);
    });

    return unsubscribe;
  }, []);
  const [data, setData] = React.useState([
    { from: "Y4", owner: "b22cs006@iitj.ac.in" },
    { from: "Y3", owner: "b22cs006@iitj.ac.in" },
    { from: "G4", owner: "b22cs006@iitj.ac.in" },
    { from: "G3", owner: "b22cs006@iitj.ac.in" },
    { from: "LHC", owner: "b22cs006@iitj.ac.in" },
  ]);
  const [eventList, setEventList] = React.useState([{}]);
  const [isMapVisible, setIsMapVisible] = React.useState(true);

  function rentCycle(input) {
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
  const [exportCord, setExportCord] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(MarkerCollection, function (snapshot) {
      const markerArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(markerArray);
      setExportCord(markerArray);
    });

    return unsubscribe;
  }, []);
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

  const auth = getAuth();
  const UserCurr = auth.currentUser;
  console.log(UserCurr?.email);
  const [markerPositions, setMarkerPositions] = React.useState([]);
  async function addCycle(event) {
    const cyc = { from: event.from, owner: UserCurr.email };
    const ref = await addDoc(Collection, cyc);

    setData([...data, { from: event.from, owner: UserCurr.email }]);
    const location = event.from;
    setMarkerPositions([...markerPositions, { location }]);
    console.log(location);
    // markerPositions.forEach((position,item) => {
    console.log("working");
    coordinates.forEach((cordi) => {
      // console.log(position);
      if (location === cordi.loc) {
        console.log("Match Found");
        const rf= addDoc(MarkerCollection, { id: nanoid(), cordi: cordi.cord });

        setExportCord([...exportCord, { id: nanoid(), cordi: cordi.cord }]);
      }
    });
    // });
    console.log(markerPositions);
    // console.log(data.length);
  }
  const [browse, setBrowse] = React.useState(false);
  function toggleBrowse() {
    setBrowse(!browse);
  }
  const [bookedCycles,setBookedCycles]=React.useState([]);  
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
  function addEvent(values) {
    const ref = addDoc(eventCollection, values);
    setEventList([...eventList, values]);
  }
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserFirebase(currentUser);
    });
    
    // console.log(userFirebase);
    return () => unsubscribe();
  }, []);
  const [en, setEn] = React.useState(false);
  function dis(){
    setEn(prev=>!prev);
    setIsMapVisible(!isMapVisible);
  }
  async function logout() {
    await signOut(auth);
    navigate("/");
  }
  const [grps,setGrps]=React.useState([]);
  console.log(user);
  // function addGroup(info) {
  //   setGrps([...grps, info]);
  // }
  return (
    <div className="mask">
      <NavBar user={user} logout={logout} />
      <br/>
      <h1>Your own IITJ Community</h1>
      <br/>

      <div className="division">
        <div className="mask1">
         
          
         {en && <Rent formData={formData} handleChange={rentCycle} />}
        {val && <Result dat={res} bookCycle={bookCycle} user={user} />}
         {en &&  <AddCycle addCycle={addCycle} />}
          {isMapVisible && (
            <Maps markerPositions={markerPositions} exportCord={exportCord} />
          )}
          <Button onClick={() => setIsMapVisible(!isMapVisible)}>
            {`${isMapVisible ? "Hide" : "Show"} Map`}
          </Button>
          <div>
            {console.log(markerPositions)}
            <Button type="primary" onClick={toggleBrowse}>
              Browse
            </Button>
            {browse && <Browse data={data} bookCycle={bookCycle} user={user} />}
          </div>
          <FloatButton.Group>
         <FloatButton href="https://forms.gle/hUB6nx529yaSXGdr8"  description="Report User" />
        <FloatButton href="https://forms.gle/VrNq9K45ykimTK1i8" description="Report Theft"/>

         </FloatButton.Group >
          {/* <Footer /> */}
        </div>
        <div className="mask2">
          <Sidebar  addEvent={addEvent}  dis={dis}/>
        </div>
      </div>
    </div>
  );
}
