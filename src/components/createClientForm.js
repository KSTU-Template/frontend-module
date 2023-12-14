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
    const [clients, setClients] = useState([]);
    const [showForm, setShowForm] = useState(false);

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

    const handleDelete = async (clientId) => {
        const response = await fetch(`${apiUrl}/api/client/${clientId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            alert("Что-то пошло не так при удалении клиента");
            return;
        }

        fetchClients();
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            <button onClick={toggleForm} className="btn btn-primary mb-3">
                {showForm ? "Закрыть" : "Добавить клиента"}
            </button>

            {showForm && (
                <div>
                    <h3>Добавь нового клиента</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label>Пол:</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                name="gender"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-2">
                            <label>Возраст:</label>
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                name="age"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-2">
                            <label>Регион:</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                name="region"
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Добавить
                        </button>
                    </form>
                </div>
            )}

            <h3>Добавленные клиенты</h3>
            <table className="table">
                <thead>
                <tr>
                    <th>Пол</th>
                    <th>Возраст</th>
                    <th>Регион</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {clients.map((client) => (
                    <tr key={client.id}>
                        <td>{client.data.gender}</td>
                        <td>{client.data.age}</td>
                        <td>{client.data.region}</td>
                        <td>
                            <button className="btn btn-danger"
                                onClick={() => handleDelete(client.id)}
                            >
                                Удалить
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CreateClientForm;
