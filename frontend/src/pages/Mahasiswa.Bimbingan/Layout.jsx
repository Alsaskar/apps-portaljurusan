import { useState, useEffect, useContext, useRef, useCallback } from "react";
import ProfileNoImage from "../../assets/images/profile_no_image.png";
import "./style.scss";
import { BsSendFill } from "react-icons/bs";
import { TbSquareRoundedArrowDownFilled } from "react-icons/tb";
import { HiDotsHorizontal } from "react-icons/hi";
import { MahasiswaContext } from "../../context/MahasiswaContext";
import axios from "axios";
import { urlApi, urlStaticAssetsDosen } from "../../config";
import ModalDeleteChat from "./ModalDeleteChat";
import { useSocket } from "../../context/useSocket";
import getDateLabel from "../../utils/getDateLabel";
import moment from "moment";

const LayoutMahasiswa = () => {
  const { result } = useContext(MahasiswaContext) || {};
  const { socket } = useSocket();
  const [namaDosen, setNamaDosen] = useState("Nama Dosen Pembimbing");
  const [dosenFoto, setDosenFoto] = useState(null);
  const [messages, setMessages] = useState({});
  const [messageText, setMessageText] = useState("");
  const [recipientId, setRecipientId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (result?.id && socket) {
      fetchMahasiswaWithDosen(result.id);
      socket.emit("register", result.id);

      const handleReceiveMessage = (message) => {
        setMessages((prevMessages) => {
          const formattedTimestamp = moment(message.timestamp).format("HH:mm");
          const dateLabel = getDateLabel(message.timestamp);

          const newMessages = {
            ...prevMessages,
            [dateLabel]: [
              ...(prevMessages[dateLabel] || []),
              {
                ...message,
                timestamp: formattedTimestamp,
              },
            ],
          };
          return newMessages;
        });
      };

      const handleDeleteMessage = (messageId) => {
        setMessages((prevMessages) => {
          const newMessages = Object.keys(prevMessages).reduce(
            (acc, dateLabel) => {
              const filteredMessages = prevMessages[dateLabel].filter(
                (msg) => msg.id !== messageId
              );
              if (filteredMessages.length > 0) {
                acc[dateLabel] = filteredMessages;
              }
              return acc;
            },
            {}
          );
          return newMessages;
        });
      };

      socket.on("receiveMessage", handleReceiveMessage);
      socket.on("deleteMessage", handleDeleteMessage);

      return () => {
        socket.off("receiveMessage", handleReceiveMessage);
        socket.off("deleteMessage", handleDeleteMessage);
      };
    }
  }, [result, socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMahasiswaWithDosen = async (id) => {
    try {
      const res = await axios.get(
        `${urlApi}/bimbingan/dosen-mahasiswa/${id}/dosen`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const mahasiswa = res.data.mahasiswa;
      setNamaDosen(mahasiswa.dosenWali || "Nama Dosen Pembimbing");
      setDosenFoto(mahasiswa.dosenFoto); // Set foto dosen
      setRecipientId(mahasiswa.dosenId);
      fetchMessages(id, mahasiswa.dosenId);
    } catch (error) {
      console.error("Error fetching mahasiswa with dosen:", error);
      setNamaDosen("Nama Dosen Pembimbing");
    }
  };

  const fetchMessages = async (senderId, recipientId) => {
    if (!senderId || !recipientId) {
      console.error("Invalid senderId or recipientId");
      return;
    }

    try {
      const res = await axios.get(
        `${urlApi}/chat/messages/${senderId}/${recipientId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const messagesWithDateLabels = res.data.map((msg) => {
        const formattedTimestamp = moment(msg.timestamp).format("HH:mm");
        const dateLabel = getDateLabel(msg.timestamp);
        return {
          ...msg,
          timestamp: formattedTimestamp,
          dateLabel,
        };
      });

      const groupedMessages = messagesWithDateLabels.reduce((acc, message) => {
        (acc[message.dateLabel] = acc[message.dateLabel] || []).push(message);
        return acc;
      }, {});

      setMessages(groupedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = useCallback(() => {
    if (!messageText.trim() || !result?.id || !recipientId) {
      console.error("Message text, senderId, or recipientId is missing");
      return;
    }

    if (socket && socket.connected) {
      const newMessage = {
        senderId: result.id,
        senderRole: "mahasiswa",
        recipientId,
        recipientRole: "dosen",
        message: messageText,
      };

      socket.emit("sendMessage", newMessage, async (response) => {
        if (response.success) {
          await fetchMessages(result.id, recipientId);
        } else {
          console.error("Failed to send message:", response.message);
        }
      });

      setMessageText("");
    } else {
      console.error("Socket is not connected.");
    }
  }, [messageText, result?.id, recipientId, socket]);

  const handleDeleteMessage = useCallback(() => {
    if (!messageToDelete || !result?.id || !recipientId) {
      console.error("Message ID to delete, result.id, or recipientId is missing");
      return;
    }

    if (socket && socket.connected) {
      socket.emit("deleteMessage", messageToDelete, async (response) => {
        if (response.success) {
          await fetchMessages(result.id, recipientId);
        } else {
          console.error("Failed to delete message:", response.message);
        }
      });
      setMessageToDelete(null);
      setShowModal(false);
    } else {
      console.error("Socket is not connected.");
    }
  }, [socket, messageToDelete, result?.id, recipientId]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const truncatedNamaDosen = truncateText(namaDosen, 20);

  return (
    <div className="chat-mahasiswa">
      <div className="header-chat-mahasiswa">
        <div className="profile-section">
          <img
            src={dosenFoto ? `${urlStaticAssetsDosen}/${dosenFoto}` : ProfileNoImage}
            alt="dosen-img"
            className="dosen-img"
          />
          <p className="dosen-name">{truncatedNamaDosen}</p>
        </div>

        <div className="down" onClick={scrollToBottom}>
          <TbSquareRoundedArrowDownFilled size={16} />
        </div>
      </div>
      <div className="chat-body-mahasiswa" ref={chatContainerRef}>
        <div className="chat-container-mahasiswa">
          {Object.keys(messages).map((dateLabel) => (
            <div key={dateLabel} className="date-section">
              <p className="date-label">{dateLabel}</p>
              {messages[dateLabel].map((message) => (
                <div
                  key={message.id}
                  className={`chat-message ${
                    message.senderRole === "mahasiswa"
                      ? "user-message"
                      : "dosen-message"
                  }`}
                >
                  <p className="message-text">{message.message}</p>
                  <p className="message-timestamp">{message.timestamp}</p>
                  {message.senderRole === "mahasiswa" && (
                    <HiDotsHorizontal
                      className="message-options-icon"
                      onClick={() => {
                        setShowModal(true);
                        setMessageToDelete(message.id);
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-chat">
        <input
          type="text"
          placeholder="Ketik pesan..."
          className="message-input"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button
          className="send-button"
          onClick={handleSendMessage}
          disabled={messageText.trim() === ""}
        >
          <BsSendFill className="icon-send" />
        </button>
      </div>
      <ModalDeleteChat
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteMessage}
      />
    </div>
  );
};

export default LayoutMahasiswa;
