import React from "react";
import { useState, useEffect } from 'react'
import axios from 'axios'
import './Admin.css'
import Btn from "../Btn";

function Admin() {
    const [userData, setuserData] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3001/users`).then((res) => {
            setuserData(res.data);
        });
    }, []);
    async function Deluser(a){
        await axios.delete(`http://localhost:3001/users/${a}`);
        console.log(a);
        await axios.get(`http://localhost:3001/users`).then((res) => {
            setuserData(res.data);
        });
    }
    return (
        <div className="Container">
            {userData.map((x) =>
            (<div className="box">
                <h2>Username:{x.username}, Email:{x.email}, Password:{x.password},</h2>
                 <h2>tours:</h2>{x.tours.map((item) => (<div>
                      <h3>From - {item.from}</h3>
                      <h3>To - {item.to}</h3>
                      <h3>Number of Adults- {item.adult}</h3>
                      <h3>Number of Child- {item.child}</h3>
                      <h3>Date of Departure- {item.depart}</h3>
                      <h3>Date of Arrival- {item.arrival}</h3>
                    </div>))}
                    <Btn value="Delete" onClick={()=>Deluser(x.id)}/>
            </div>)
            )}
        </div>
    )
}

export default Admin