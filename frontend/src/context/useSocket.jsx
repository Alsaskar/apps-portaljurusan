// src/context/useSocket.jsx
import { useContext } from "react";
import { SocketContext } from "./SocketProvider";

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
