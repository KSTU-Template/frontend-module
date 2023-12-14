import React from "react";
import {Link} from "react-router-dom";
import '../styles/sidebar.css'


const Sidebar = () => {
    return (
        <div className="sidebar m-3">
            <div className="sidebar-links">
                <Link to="/dashboard/">Обо мне</Link>
                <Link to="/dashboard/client">Клиенты</Link>
                <Link to="/dashboard/chat">Генерация предложения</Link>
                {/* Добавьте другие ссылки по мере необходимости */}
            </div>
        </div>
    );
};

export default Sidebar;

const sidebarNavItems = [
    {
        display: 'Обо мне',
        to: '/dashboard',
        section: ''
    },
    {
        display: 'Создать клиента',
        to: '/dashboard/client',
        section: ''
    },
]