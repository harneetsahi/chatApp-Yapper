import { createContext, useCallback, useContext, useEffect } from "react";
import { io } from "socket.io-client";

interface ProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  sendMessage: (message: string) => any;
  receiveMessage: (message: string) => string;
}

const AppContext = createContext<ISocketContext | null>(null);

export const AppProvider = ({ children }: ProviderProps) => {
  const sendMessage: ISocketContext["sendMessage"] = useCallback((message) => {
    console.log("send message", message);
  }, []);

  useEffect(() => {
    const _socket = io("ws://localhost:3000");

    return () => {
      _socket.disconnect();
    };
  }, []);

  return <AppContext.Provider value={null}>{children}</AppContext.Provider>;
};

export function useAppContext() {
  return useContext(AppContext);
}
