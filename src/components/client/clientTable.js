// UserForm.js
import React from "react";
import {apiUrl} from "../../config";
import '../../styles/createClientForm.css'

const ClientTable = ({clients, fetchClients}) => {
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

    return (<div>
        <h4>Ваши клиенты</h4>
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
    </div>);
};

export default ClientTable;
