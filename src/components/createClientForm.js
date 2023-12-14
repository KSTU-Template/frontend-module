// UserForm.js
import React, {useEffect, useState} from "react";
import {apiUrl} from "../config";
import '../styles/createClientForm.css'

const CreateClientForm = () => {
    const [formData, setFormData] = useState({
        gender: "",
        age: "",
        region: "",
    });
    const [clients, setClients] = useState([])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        const response = await fetch(`${apiUrl}/api/client`, {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            alert("Что-то пошло не так при отправке данных");
            return;
        }

        fetchClients();

        setFormData({
            gender: "",
            age: "",
            region: "",
        });
    };

    const fetchClients = async () => {
        const response = await fetch(`${apiUrl}/api/client/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            alert("Что-то пошло не так при загрузке клиентов");
            return;
        }

        const data = await response.json();
        setClients(data);
    };

    useEffect(() => {
        fetchClients();
    }, []);


    return (
        <div>
            <h2>Создать клиента</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Пол:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="gender"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Возраст:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="age"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Регион:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="region"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Отправить</button>
            </form>
            <h2>Созданные клиенты</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Пол</th>
                    <th>Возраст</th>
                    <th>Регион</th>
                </tr>
                </thead>
                <tbody>
                {clients.map((client) => (
                    <tr key={client.id}>
                        <td>{client.data.gender}</td>
                        <td>{client.data.age}</td>
                        <td>{client.data.region}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CreateClientForm;
