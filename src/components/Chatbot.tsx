import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useRef, useEffect, ReactHTML } from "react";

function BotMessage({ message }: { message: string }) {
  return (
    <>
      <div className="flex items-start space-x-3 mb-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-2">
          <div className="font-semibold text-blue-800">AI Chatbot</div>
          <div className="bg-blue-100 text-blue-800 p-3 rounded-lg w-full">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function UserMessage({ message }: { message: string }) {
  return (
    <>
      <div className="flex flex-row-reverse items-start space-x-3 mb-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-2 pr-2">
          <div className="font-semibold text-gray-800 text-right">You</div>
          <div className="bg-gray-200 text-gray-800 p-3 rounded-lg w-full">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </>
  );
}

const initialMessages = ["Hi there! How can I assist you today?"];

export default function ChatbotSection() {
  const [messages, setMessages] = useState<string[]>(initialMessages);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const lastMessageRef = useRef<String | null>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      (messagesEndRef.current as HTMLElement | null)?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(message, messages);

    if (!message.trim() || isLoading) return;
    setIsLoading(true);

    setMessage(""); // Clear the input field
    const newMessages: string[] = [...messages, message, ""];

    const lastMessageIndex: number = newMessages.length - 1;
    setMessages(newMessages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await (
          reader as ReadableStreamDefaultReader<Uint8Array>
        ).read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((prevMessages: string[]) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[lastMessageIndex] =
            updatedMessages[lastMessageIndex] + text;
          lastMessageRef.current = updatedMessages[lastMessageIndex];
          return updatedMessages;
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((messages: string[]) => [
        ...messages.slice(0, messages.length - 1),
        "I'm sorry, but I encountered an error. Please try again later.",
      ]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-96 bg-white border border-gray-300 rounded-lg shadow-md h-[720px]">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-6">
          {messages.map((message, index) => {
            return index % 2 === 0 ? (
              <BotMessage key={index} message={message} />
            ) : (
              <UserMessage key={index} message={message} />
            );
          })}
          <div ref={messagesEndRef}></div>
        </div>
      </div>
      <form className="border-t border-gray-300 p-4" onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full border border-gray-400 p-2 rounded-lg"
        />
      </form>
    </div>
  );
}
