import React from "react";
import { useLocation } from "react-router";
export default function (props) {
    const location=useLocation();
    const searchParams=new URLSearchParams(location.search);
    const loc=searchParams.get("owner");
    return (
        <div>
            
        </div>
    )
}