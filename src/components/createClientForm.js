// UserForm.js
import React, {useState} from "react";
import {apiUrl} from "../config";

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
                <div>
                    <label>Пол:</label>
                    <input
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Возраст:</label>
                    <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Регион:</label>
                    <input
                        type="text"
                        name="region"
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
