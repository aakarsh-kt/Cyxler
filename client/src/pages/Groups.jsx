import React from 'react';
import NavBar from '../components/NavBar';
import { Button } from 'antd';
export default function(){
    return(
        <div>
            <NavBar/>
            <div className='flex--column flex--gap'>
            <h4>Groups</h4>
            <Button type="primary">Create Group</Button>
            </div>
        </div>
    )
}