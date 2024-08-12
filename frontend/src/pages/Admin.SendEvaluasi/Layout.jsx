import { useState } from "react";
import axios from "axios";
import "./style.scss";
import { urlApi } from "../../config";

const Layout = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${urlApi}/email/send-email`,
        {
          to,
          subject,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setResponse(res.data.message);
    } catch (error) {
      setResponse("Error sending email: " + error.message);
    }
  };

  return (
    <div className="send-email">
      <h1>Send Email</h1>
      <form onSubmit={sendEmail}>
        <div>
          <label htmlFor="to">To:</label>
          <input
            type="email"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="text">Text:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Send Email</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default Layout;
