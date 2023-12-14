import React, {useEffect, useState} from "react";

import UserInfo from "./userInfo";
import CreateClientForm from "./createClientForm";
import {apiUrl} from "../config";

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
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${window.localStorage.getItem("token")}`
            },
        })

        if (!response.ok) {
            alert("Токен истек войдите заново");
            window.localStorage.clear();
            window.location.href = "./login";
            return
        }

        const data = await response.json()
        setUserData(data);
    }, []);

    return <div>
        <div className="auth-wrapper">
            <div className="auth-inner">
                <UserInfo userData={userData}/>
                <CreateClientForm/>
                <button onClick={logOut} className="btn btn-primary">
                    Выйти
                </button>
            </div>
        </div>
    </div>;
}
