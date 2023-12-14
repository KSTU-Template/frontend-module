import React, {useState} from "react";

import {apiUrl} from "../../config";

import '../../styles/createClientForm.css'

const CreateClientForm = ({fetchClients}) => {
    const [formData, setFormData] = useState({
        gender: "", age: "", region: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${apiUrl}/api/client`, {
            method: "POST", headers: {
                "content-Type": "application/json", "authorization": `Bearer ${window.localStorage.getItem("token")}`,
            }, body: JSON.stringify(formData),
        });

        if (!response.ok) {
            alert("Что-то пошло не так при отправке данных");
            return;
        }

        setFormData({
            gender: "", age: "", region: "",
        });

        fetchClients();
    };

    return (<div>
        <h4>Новый клиент</h4>
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <label>Пол:</label>
                <input
                    type="text"
                    autoComplete="off"
                    className="form-control form-control-sm"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-2">
                <label>Возраст:</label>
                <input
                    type="number"
                    autoComplete="off"
                    className="form-control form-control-sm"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-2">
                <label>Регион:</label>
                <input
                    type="text"
                    autoComplete="off"
                    className="form-control form-control-sm"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Добавить
            </button>
        </form>
    </div>);
};

export default CreateClientForm;
