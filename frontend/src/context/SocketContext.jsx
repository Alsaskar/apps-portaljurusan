import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

// Define the context
const SocketContext = createContext();

// SocketProvider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Define the socket URL
    const socketUrl = "http://localhost:8080";

    // Create a socket instance
    const socketInstance = io(socketUrl, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
    });

    // Set the socket instance
    setSocket(socketInstance);

    // Handle connection error
    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    // Handle successful connection
    socketInstance.on('connect', () => {
      // console.log('Socket connected:', socketInstance.id);
    });

    // Handle disconnection
    socketInstance.on('disconnect', () => {
      // console.log('Socket disconnected');
    });

    // Cleanup function to disconnect socket on unmount
    return () => {
      socketInstance.disconnect();
      // console.log('Socket disconnected');
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Add prop types validation
SocketProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Custom hook to use the socket context
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
