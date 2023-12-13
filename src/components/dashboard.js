import React, {useEffect, useState} from "react";

import UserInfo from "./userInfo";

export default function Dashboard() {
    const [userData, setUserData] = useState("");

    useEffect(async () => {
        const response = await fetch("http://localhost:8000/api/auth/", {
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

    return <UserInfo userData={userData}/>;
}
