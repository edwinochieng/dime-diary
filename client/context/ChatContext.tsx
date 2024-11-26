import React, { createContext, useContext, useState, ReactNode } from "react";

interface ChatMessage {
  sender: string;
  content: string;
}

interface ChatContextType {
  messages: ChatMessage[];
  addToChat: (message: ChatMessage) => void;
  clearChat: () => void;
  generatingResponse: boolean;
  setGeneratingResponse: (state: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [generatingResponse, setGeneratingResponse] = useState(false);

  const addToChat = (message: ChatMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addToChat,
        clearChat,
        generatingResponse,
        setGeneratingResponse,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
