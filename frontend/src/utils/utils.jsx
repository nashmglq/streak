import { useEffect, useState } from "react";
import io from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const token = userInfo?.token;

    if (!token) {
      console.log("❌ No token, socket will not connect");
      return;
    }

    const socketInstance = io(process.env.REACT_APP_API_URL, {
      auth: { token: `Bearer ${token}` },
    });

    socketInstance.on("connect", () => {
      console.log("✅ Socket connected!");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ Socket disconnected!");
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => socketInstance.disconnect();
  }, []);

  return { socket, isConnected };
};
