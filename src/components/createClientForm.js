// UserForm.js
import React, {useState} from "react";
import {apiUrl} from "../config";
import '../styles/createClientForm.css'

const CreateClientForm = () => {
    const [formData, setFormData] = useState({
        gender: "",
        age: "",
        region: "",
    });

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

        // Дополнительная логика, если необходимо обработать успешный ответ
        alert("Данные успешно отправлены!");
    };

    return (
        <div>
            <h2>Создать клиента</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Пол:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.gender}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Возраст:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Регион:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.region}
                        onChange={handleChange}
                    />
                </div>
                {/* Добавьте другие поля по необходимости */}
                <button type="submit" className="btn btn-primary">Отправить</button>
            </form>
        </div>
    );
};

export default CreateClientForm;
