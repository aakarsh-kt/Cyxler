import React  from 'react';
import { TextField } from '@mui/material';
import { Button } from 'antd';
import { useLocation } from 'react-router';
export default function (props) {

    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const user = searchParams.get("user");
 
    return(
        <div>
            <h1>Profile</h1>
            <h2>{user}</h2>
            <TextField id="standard-basic" placeholder="Name"/>
            <TextField id="standard-basic" placeholder="Email"/>
            <TextField id="standard-basic" placeholder="Phone"/>
            <Button type="primary">Save</Button>
        </div>
    )
}