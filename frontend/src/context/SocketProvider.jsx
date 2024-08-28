import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import io from "socket.io-client";
import { urlSocket } from "../config";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(urlSocket, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
    });

    setSocket(socketInstance);

    socketInstance.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socketInstance.on("connect", () => {
      // console.log('Socket connected:', socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      // console.log('Socket disconnected');
    });

    return () => {
      socketInstance.disconnect();
      // console.log('Socket disconnected');
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
