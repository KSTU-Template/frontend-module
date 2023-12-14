import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import UserInfo from "./userInfo";
import Sidebar from './sidebar';
import CreateClientForm from "./createClientForm";
import {apiUrl} from "../config";
import '../styles/dashboard.css'

export default function Dashboard() {
    const [userData, setUserData] = useState("");
    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./login";
    };

    useEffect(async () => {
        const response = await fetch(`${apiUrl}/api/auth/`, {
            method: "GET", crossDomain: true, headers: {
                "content-Type": "application/json",
                "accept": "application/json",
                "access-Control-Allow-Origin": "*",
                "authorization": `Bearer ${window.localStorage.getItem("token")}`
            },
        });

        if (!response.ok) {
            alert("Токен истек войдите заново");
            window.localStorage.clear();
            window.location.href = "./login";
            return
        }

        const data = await response.json()
        setUserData(data);
    }, []);

    return (<div>
        <div className="dashboard-wrapper">
            <div className="dashboard-inner">
                <Sidebar/>
                <Routes>
                    <Route path="/client" element={<CreateClientForm/>}/>
                    <Route path="/" element={<UserInfo userData={userData}/>}/>
                    {/* Добавьте другие маршруты по мере необходимости */}
                </Routes>
            </div>
        </div>
    </div>);
}
