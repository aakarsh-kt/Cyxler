import React from "react";
import NavBar from "../components/NavBar";
import { Button } from "antd";
import { grpCollection } from "../firebase.js";

import AddGroup from "../components/addGroup.jsx";
import { addDoc,onSnapshot } from "firebase/firestore";
export default function (props) {
  const [groups, setGroups] = React.useState([{}]);
  React.useEffect(() => {
    const unsubscribe = onSnapshot(grpCollection, function (snapshot) {
      const groupArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGroups(groupArray);
    });
    return unsubscribe;
  }, []);
  const [isFromVisible, setIsFormVisible] = React.useState(false);
  function addGroup() {
    setIsFormVisible(true);
}
async function  handleSubmit(info){
    console.log(info);
      const ref=await addDoc(grpCollection,info);
        console.log(ref);
        setIsFormVisible(false);
        setGroups([...groups,info]);


  }
  return (
    <div>
      <NavBar />
      <div className="flex--column flex--gap">
        <h4>Groups</h4>
        {groups.map((group) => (
          <div key={group.id}>{group.name}</div>
        ))}
        <Button type="primary" onClick={addGroup}>
          Create Group
        </Button>
        {isFromVisible && <AddGroup  handleSubmit={handleSubmit}/>}
      </div>
    </div>
  );
}
