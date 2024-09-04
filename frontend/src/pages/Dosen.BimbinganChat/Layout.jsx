import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import ProfileNoImage from "../../assets/images/profile_image_black.png";
import { BsSendFill } from "react-icons/bs";
import { TbSquareRoundedArrowDownFilled } from "react-icons/tb";
import { HiDotsHorizontal } from "react-icons/hi";
import { DosenContext } from "../../context/DosenContext";
import axios from "axios";
import { urlApi, urlStaticAssets } from "../../config";
import { useSocket } from "../../context/useSocket";
import ModalDeleteChat from "./ModalDeleteChat";
import getDateLabel from "../../utils/getDateLabel";
import moment from "moment";
import Swal from "sweetalert2";

const LayoutDosen = () => {
  const { result } = useContext(DosenContext) || {};
  const { socket } = useSocket();
  const { mahasiswaId } = useParams(); // Get mahasiswaId from URL params
  const [namaMahasiswa, setNamaMahasiswa] = useState("Nama Mahasiswa");
  const [mahasiswaFoto, setMahasiswaFoto] = useState(ProfileNoImage);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [truncatedNamaMahasiswa, setTruncatedNamaMahasiswa] = useState(namaMahasiswa);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (result?.id && mahasiswaId) {
      fetchMahasiswaData(mahasiswaId);

      if (socket) {
        socket.emit("register", result.id);

        const handleReceiveMessage = () => {
          fetchMessages(result.id, mahasiswaId);
        };

        const handleDeleteMessage = () => {
          fetchMessages(result.id, mahasiswaId);
        };

        socket.on("receiveMessage", handleReceiveMessage);
        socket.on("deleteMessage", handleDeleteMessage);

        return () => {
          socket.off("receiveMessage", handleReceiveMessage);
          socket.off("deleteMessage", handleDeleteMessage);
        };
      }
    }
  }, [result, socket, mahasiswaId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMahasiswaData = async (mahasiswaId) => {
    try {
      // Endpoint yang diperbarui untuk mendapatkan data mahasiswa berdasarkan ID
      const res = await axios.get(`${urlApi}/mahasiswa/${mahasiswaId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const mahasiswa = res.data.result;

      if (mahasiswa && typeof mahasiswa.fullname === "string") {
        setNamaMahasiswa(mahasiswa.fullname);
        setMahasiswaFoto(
          mahasiswa.foto
            ? `${urlStaticAssets}/${mahasiswa.foto}`
            : ProfileNoImage
        );
      } else {
        console.error("Unexpected structure for mahasiswa data:", mahasiswa);
        setNamaMahasiswa("Nama Mahasiswa");
        setMahasiswaFoto(ProfileNoImage);
      }

      // Fetch messages with the selected mahasiswa ID
      fetchMessages(result.id, mahasiswaId);
    } catch (error) {
      console.error("Error fetching mahasiswa data:", error);
      setNamaMahasiswa("Nama Mahasiswa");
      setMahasiswaFoto(ProfileNoImage);
    }
  };

  const fetchMessages = async (senderId, recipientId) => {
    if (!senderId || !recipientId) {
      console.error("Invalid senderId or recipientId");
      return;
    }

    try {
      const res = await axios.get(
        `${urlApi}/chat/messages/dosen/${senderId}/${recipientId}`,
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
    if (!mahasiswaId) {
      Swal.fire({
        icon: 'warning',
        title: 'Pemberitahuan',
        text: 'Anda belum memiliki dosen pembimbing. Silakan hubungi administrasi.',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (!messageText.trim() || !result?.id) {
      console.error("Message text, senderId, or recipientId is missing");
      return;
    }

    if (socket && socket.connected) {
      const newMessage = {
        senderId: result.id,
        senderRole: "dosen",
        recipientId: mahasiswaId,
        recipientRole: "mahasiswa",
        message: messageText,
      };

      socket.emit("sendMessage", newMessage, async (response) => {
        if (response.success) {
          await fetchMessages(result.id, mahasiswaId); // Refresh messages from backend
        } else {
          console.error("Failed to send message:", response.message);
        }
      });

      setMessageText("");
    } else {
      console.error("Socket is not connected.");
    }
  }, [messageText, result?.id, mahasiswaId, socket]);

  const handleDeleteMessage = useCallback(() => {
    if (!messageToDelete || !result?.id || !mahasiswaId) {
      console.error(
        "Message ID to delete, result.id, or recipientId is missing"
      );
      return;
    }

    if (socket && socket.connected) {
      socket.emit("deleteMessage", messageToDelete, async (response) => {
        if (response.success) {
          await fetchMessages(result.id, mahasiswaId);
        } else {
          console.error("Failed to delete message:", response.message);
        }
      });
      setMessageToDelete(null);
      setShowModal(false);
    } else {
      console.error("Socket is not connected.");
    }
  }, [socket, messageToDelete, result?.id, mahasiswaId]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const handleReize = () => {
      if (window.innerWidth <= 768) {
        setTruncatedNamaMahasiswa(truncateText(namaMahasiswa, 20));
      } else {
        setTruncatedNamaMahasiswa(namaMahasiswa);
      }
    }

    handleReize();
    window.addEventListener("resize", handleReize);

    return () => {
      window.removeEventListener("resize", handleReize);
    };
  }, [namaMahasiswa]);

  const truncateText = (text, maxLength) => {
   if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
   }
    return text;
  };

  return (
    <div className="chat-dosen">
      <div className="header-chat-dosen">
        <div className="profile-section">
          <img className="profile-img" src={mahasiswaFoto} alt="Area Profile" />
          <p className="dosen-name">{truncatedNamaMahasiswa}</p>
        </div>

        <div className="down" onClick={scrollToBottom}>
          <TbSquareRoundedArrowDownFilled size={16} />
        </div>
      </div>
      <div className="chat-body-dosen" ref={chatContainerRef}>
        <div className="chat-container-dosen">
          {Object.keys(messages).map((dateLabel) => (
            <div key={dateLabel} className="date-section">
              <p className="date-label">{dateLabel}</p>
              {messages[dateLabel].map((message, index) => (
                <div
                key={`${message.id}-${index}`}
                  className={`chat-message ${
                    message.senderRole === "dosen"
                      ? "user-message"
                      : "dosen-message"
                  }`}
                >
                  <p className="message-text">{message.message}</p>
                  <p className="message-timestamp">{message.timestamp}</p>
                  {message.senderRole === "dosen" && (
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
          placeholder="Type a message..."
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

export default LayoutDosen;
