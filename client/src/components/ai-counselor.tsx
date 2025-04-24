import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppContext } from "@/context/app-context";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { v4 as uuidv4 } from "uuid";
import { ChatMessage } from "@/types";
import { getColorFromString, getInitials } from "@/lib/utils";

export default function AiCounselor() {
  const { t } = useTranslation();
  const { showChatInterface, toggleChatInterface, currentUser } =
    useAppContext();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Add initial greeting message when component mounts
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: uuidv4(),
          role: "assistant",
          content: t("ai_greeting"),
          timestamp: Date.now(),
        },
      ]);
    }
  }, [t]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      return await apiRequest("POST", "/api/ai/message", { content });
    },
    onSuccess: async (response) => {
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: "assistant",
          content: data.message,
          timestamp: Date.now(),
        },
      ]);
    },
  });

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content: message,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Clear input
    setMessage("");

    // Send to API
    sendMessageMutation.mutate(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const addSuggestion = (text: string) => {
    setMessage(text);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Only show the chat button if interface is hidden
  if (!showChatInterface) {
    return (
      <button
        onClick={toggleChatInterface}
        className="fixed right-6 bottom-20 md:bottom-6 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-20"
      >
        <span className="material-icons">chat</span>
      </button>
    );
  }

  return (
    <>
      {/* Floating chat button (now as close button) */}
      <button
        onClick={toggleChatInterface}
        className="fixed right-6 bottom-20 md:bottom-6 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-20"
      >
        <span className="material-icons">close</span>
      </button>

      {/* Chat interface */}
      <div className="fixed bottom-16 md:bottom-0 inset-x-0 z-10">
        <div className="max-w-lg mx-auto bg-white rounded-t-xl shadow-lg border border-gray-200 h-[500px] flex flex-col">
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <span className="material-icons text-blue-500 text-sm">
                  smart_toy
                </span>
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-md">
                  {t("ai_counselor_name")}
                </h3>
                <div className="text-xs text-gray-500">{t("ai_status")}</div>
              </div>
            </div>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={toggleChatInterface}
            >
              <span className="material-icons">close</span>
            </button>
          </div>

          <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat-message flex items-start mb-4 ${
                    msg.role === "assistant" ? "" : "justify-end"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="material-icons text-blue-500 text-sm">
                        smart_toy
                      </span>
                    </div>
                  )}

                  <div
                    className={`py-2 px-4 max-w-[80%] ${
                      msg.role === "assistant"
                        ? "bg-gray-100 rounded-lg rounded-tl-none text-gray-800"
                        : "bg-blue-100 text-blue-800 rounded-lg rounded-tr-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  </div>

                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center ml-3 flex-shrink-0">
                      <span className="text-white text-xs font-medium">
                        {currentUser ? getInitials(currentUser.fullName) : "U"}
                      </span>
                    </div>
                  )}
                </div>
              ))}

              {sendMessageMutation.isPending && (
                <div className="chat-message flex items-start mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="material-icons text-blue-500 text-sm">
                      smart_toy
                    </span>
                  </div>
                  <div className="bg-gray-100 rounded-lg rounded-tl-none py-2 px-4">
                    <div className="flex space-x-2">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-3 border-t">
            <div className="flex items-center">
              <div className="flex-grow">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder={t("type_question")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-2 rounded-full"
                />
              </div>
              <Button
                onClick={handleSendMessage}
                className="ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 p-0 flex items-center justify-center"
                disabled={sendMessageMutation.isPending}
              >
                <span className="material-icons">send</span>
              </Button>
            </div>
            <div className="flex mt-2 space-x-2 overflow-x-auto pb-1">
              <button
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full whitespace-nowrap"
                onClick={() => addSuggestion(t("education_required"))}
              >
                {t("education_required")}
              </button>
              <button
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full whitespace-nowrap"
                onClick={() => addSuggestion(t("job_prospects"))}
              >
                {t("job_prospects")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
