import React, {useState} from "react";
import {Button, Form, ListGroup, Pagination} from "react-bootstrap";
import "../../styles/userChat.css";
import {apiUrl} from "../../config";

const ChatForm = ({infChannels}) => {
    const [messages, setMessages] = useState([]);
    const [items, setItems] = useState([]);
    const [pageMessages, setPageMessages] = useState([]);
    const [active, setActive] = useState(1);
    const [formData, setFormData] = useState({
        client_id: 0, product_name: "", channel_id: 1,
    });

    const getItems = () => {
        const items = [];
        const pages = (messages.length-1)/10+1;
        for (let number = 1; number <= pages; number++) {
            items.push(<Pagination.Item key={number} active={number === active} onClick={() => setActivePage(number)}>
                {number}
            </Pagination.Item>)
        }
        return items
    }

    const setActivePage = (number) => {
        const pageMessagesTemp = [];

        const messagesSlice = messages.slice((number-1)*10, number*10 > messages.length ? messages.length : number*10);
        messagesSlice.map(val => {
            pageMessagesTemp.push(val);
        })

        setActive(number);
        setPageMessages(pageMessagesTemp);
    }

    const addChat = (chat) => {
        const messagesTemp = messages;
        const pageMessagesTemp = [];
        const itemsTemp = []

        const question = {
            sender: "user",
            text: "Название продукта: "+formData.product_name+", Канал коммуникации: "+infChannels[formData.channel_id-1].name
        };
        const answer = {
            sender: "bot",
            text: chat.text
        };
        messagesTemp.push(question, answer);
        const messagesSlice = messagesTemp.slice(0, messagesTemp.length >= 10 ? 10 : messagesTemp.length%10);
        messagesSlice.map(val => {
            pageMessagesTemp.push(val);
        })

        setItems(itemsTemp);
        setMessages(messagesTemp);
        setPageMessages(pageMessagesTemp);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${apiUrl}/api/chat`, {
            method: "POST", headers: {
                "content-Type": "application/json", "authorization": `Bearer ${window.localStorage.getItem("token")}`,
            }, body: JSON.stringify(formData),
        });

        if (!response.ok) {
            alert("Что-то пошло не так при отправке данных");
            return;
        }

        const data = await response.json();
        addChat(data);
        setFormData({
            client_id: 0, product_name: "", channel_id: 1,
        });
    };

    return (
        <div className="chat-container">
            <Form onSubmit={handleSubmit} className="message-input">
                <Form.Group controlId="clientId">
                    <Form.Control
                        type="number"
                        placeholder="Введите идентификатор клиента"
                        value={formData.client_id}
                        name="client_id"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="productName">
                    <Form.Control
                        type="text"
                        placeholder="Введите название продукта"
                        value={formData.product_name}
                        name="product_name"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="productName">
                    <Form.Select
                        aria-label="Канал коммуникации"
                        name="channel_id"
                        value={formData.channel_id}
                        onChange={handleChange}
                    >
                        {infChannels.map(chan => {
                            return <option value={chan.id}>{chan.name}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!formData.client_id && !formData.product_name}>
                    Отправить
                </Button>
            </Form>

            <ListGroup className="message-list">
                {pageMessages.map((message, index) => (
                    <ListGroup.Item key={index} className={`message ${message.sender}`}>
                        {message.text}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Pagination>
                <Pagination.First/>
                <Pagination.Prev />
                {getItems()}
                <Pagination.Next />
                <Pagination.Last/>
            </Pagination>
        </div>
    );
};

export default ChatForm;
