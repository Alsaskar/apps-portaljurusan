// Layout.js

import { useState } from "react";
import "./style.scss";
import DosenImg from "../../assets/images/profile_imagee.png";
import { BsSendFill } from "react-icons/bs";

const Layout = () => {
  const [messages] = useState([
    { id: 1, text: "Halo, ada yang bisa bantu?", sender: "dosen", timestamp: "12:00 AM" },
    { id: 2, text: "Halo, saya memiliki pertanyaan tentang tugas ini.", sender: "user", timestamp: "24:59 AM" },
    { id: 2, text: "Halo", sender: "user", timestamp: "10:03 AM" },
    { id: 1, text: "Halo juga", sender: "dosen", timestamp: "10:12 AM" },
    { id: 1, text: "Halo juga", sender: "dosen", timestamp: "10:12 AM" },
    { id: 1, text: "Halo juga", sender: "dosen", timestamp: "10:12 AM" },
  ]);

  return (
    <div className="chat">
      <div className="header-chat">
        <img src={DosenImg} alt="dosen-img" className="dosen-img" />
        <p className="dosen-name">Asep Napi Rudon</p>
      </div>
      <div className="chat-body">
        <div className="chat-container">
          {messages.map((message) => (
            <div key={message.id} className={`chat-message ${message.sender === "user" ? "user-message" : "dosen-message"}`}>
              <p className="message-text">{message.text}</p>
              <p className="message-timestamp">{message.timestamp}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-chat">
        <input type="text" placeholder="Type a message..." className="message-input" />
        <button className="send-button">
          <BsSendFill className="icon-send" />
        </button>
      </div>
    </div>
  );
};

export default Layout;
