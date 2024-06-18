import React from "react";
import NavBar from "../components/NavBar";
import Rent from "../components/Rent";
import AddCycle from "../components/AddCycle";
import { Button } from "antd";
import Sidebar from "../components/sidebar";
export default function(props){
    const [isRentVisible, setIsRentVisible] = React.useState(false);
    const [isAddVisible, setIsAddVisible] = React.useState(false);
    return(
        <div className="flex--column">
            <NavBar/>
            <h1>Want a Cycle</h1>
            <Button type="primary" onClick={() => setIsRentVisible(!isRentVisible)}>
                Rent
            </Button>
            {isRentVisible && <Rent />}
            <h1>Want to add a cycle</h1>

            <Button type="primary" onClick={() => setIsAddVisible(!isAddVisible)}>
                Add Cycle
            </Button>
            {isAddVisible && <AddCycle/>}
            {/* <h1>Cycles</h1> */}
        </div>
    )
}