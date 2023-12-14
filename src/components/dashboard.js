import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";

import {apiUrl} from "../config";

import UserInfo from "./userInfo";
import Sidebar from "./sidebar";
import ClientForm from "./client/clientForm";
import UserChat from "./userChat";

import '../styles/dashboard.css'

export default function Dashboard() {
    const [userData, setUserData] = useState("");
    const [clients, setClients] = useState([]);

    async function getInfoAboutMe() {
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
            window.location.href = "/login";
            return
        }

        const data = await response.json();
        setUserData(data);
    }

    async function fetchClients() {
        const response = await fetch(`${apiUrl}/api/client/`, {
            method: "GET", headers: {Authorization: `Bearer ${window.localStorage.getItem("token")}`,},
        });

        if (!response.ok) {
            alert("Что-то пошло не так при загрузке клиентов");
            return;
        }

        const data = await response.json();
        setClients(data);
    }

    useEffect(() => {
        getInfoAboutMe();
        fetchClients();
    }, []);

    return (<div>
        <div className="dashboard-wrapper">
            <div className="dashboard-inner">
                <Sidebar/>
                <Routes>
                    <Route path="/client" element={<ClientForm clients={clients} fetchClients={fetchClients}/>}/>
                    <Route path="/" element={<UserInfo userData={userData}/>}/>
                    <Route path="/chat" element={<UserChat/>}/>
                </Routes>
            </div>
        </div>
    </div>);
}
