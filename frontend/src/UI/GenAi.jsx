import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaArrowLeft, FaMagic } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
const suggestedPrompts = [
  "Recommend me a film like Inception",
  "What are some good thriller movies from the 90s?",
  "Tell me about the director Christopher Nolan",
  "What should I watch if I liked The Godfather?",
];

const botPfp =
  "https://image.tmdb.org/t/p/w400/qvyOfwTC3qdbzkqdXWSSEMHtjBZ.jpg";

const userPfp = "https://artshortlist.com/files/48502313109648854.jpg";
export default function GenAI() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content:
        "Hello! I'm your cinematic companion. Ask me about movies, directors, or for recommendations based on your taste.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const currentBotMessageRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const tempBotMessageId = (Date.now() + 1).toString();
    const tempBotMessage = {
      id: tempBotMessageId,
      content: "",
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, tempBotMessage]);
    currentBotMessageRef.current = tempBotMessageId;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let accumulatedData = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);

        const lines = chunk.split("\n\n");

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          if (line.startsWith("data: ")) {
            try {
              const jsonData = JSON.parse(line.substring(6));
              if (jsonData && jsonData.text) {
                accumulatedData += jsonData.text;

                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === currentBotMessageRef.current
                      ? { ...msg, content: accumulatedData }
                      : msg
                  )
                );

                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
              }
            } catch (error) {
              console.error(
                "Error parsing SSE data:",
                error,
                line.substring(6)
              );
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === currentBotMessageRef.current
            ? {
                ...msg,
                content:
                  "Sorry, I encountered an error while processing your request.",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      currentBotMessageRef.current = null;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex justify-center w-full bg-base-200">
        {/* Header */}
        <header className="p-4 w-full max-w-4xl flex items-center gap-3">
          {/* <button className="btn btn-circle btn-ghost">
            <FaArrowLeft className="h-5 w-5" />
          </button> */}
          <div className="flex items-center gap-2">
            <div className="chat-image avatar">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={botPfp}
                  alt="Bot Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold">Ani</h1>
              <p className="text-xs text-base-content/60">
                Your cinematic companion
              </p>
            </div>
          </div>
        </header>
      </div>

      {/* Main scrollable area */}
      <div className="flex-1 w-full overflow-y-auto bg-base-200">
        <div className="mx-auto max-w-4xl p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat ${
                message.sender === "user" ? "chat-end" : "chat-start"
              }`}>
              {/* Bot avatar */}
              {message.sender === "bot" && (
                <div className="chat-image avatar">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={botPfp}
                      alt="Bot Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* User avatar */}
              {message.sender === "user" && (
                <div className="chat-image avatar">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={userPfp}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div
                className={`chat-bubble text-base-content rounded-lg ${
                  message.sender === "user"
                    ? "bg-base-100 border-[1px] border-primary-focus"
                    : "bg-base-300"
                } prose font-montserrat max-w-full`}>
                <pre className="whitespace-pre-line text-base m-0">
                  <ReactMarkdown remarkPlugins={[]}>
                    {message.content}
                  </ReactMarkdown>
                </pre>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && currentBotMessageRef.current === null && (
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <FaMagic className="h-4 w-4 text-secondary-content" />
                </div>
              </div>
              <div className="chat-bubble chat-bubble-secondary animate-pulse">
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed bottom section */}
      <div className="w-full bg-base-200">
        {/* Suggested Prompts */}
        {messages.length < 3 && (
          <div className="mx-auto max-w-4xl p-4 border-t border-base-content/10">
            <p className="text-sm text-base-content/60 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  className="btn btn-sm btn-outline"
                  onClick={() => setInput(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="mx-auto max-w-4xl p-4 border-t border-base-content/10">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about movies, directors, or recommendations..."
              className="input input-bordered flex-grow bg-base-100"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading || !input.trim()}>
              <FaPaperPlane className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
