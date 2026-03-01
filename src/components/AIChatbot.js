import { useState, useRef, useEffect } from "react";

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi 👋 I’m your AI assistant. How can I help you?" }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const reply = getBotReply(input);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    }, 500);

    setInput("");
  };

  const getBotReply = (text) => {
    const msg = text.toLowerCase();

    if (msg.includes("booking"))
      return "You can book vehicles from the Vehicles page instantly.";
    if (msg.includes("price"))
      return "Our rentals start from ₹999/day depending on vehicle type.";
    if (msg.includes("cancel"))
      return "Cancellations are allowed before pickup time.";
    if (msg.includes("contact"))
      return "Visit the Contact page or call our support team.";

    return "I can help with booking, pricing, cancellation or vehicle info.";
  };

  return (
    <>
      {open && (
        <div style={chatWindow}>
          <div style={chatHeader}>
            Stanfut AI-Brain
            <span style={{ cursor: "pointer" }} onClick={() => setOpen(false)}>✕</span>
          </div>

          <div style={chatBody}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={msg.role === "user" ? userBubble : botBubble}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div style={chatInputArea}>
            <input
              style={chatInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button style={sendBtn} onClick={handleSend}>
              ➤
            </button>
          </div>
        </div>
      )}

      <div style={chatButton} onClick={() => setOpen(!open)}>
        💬
      </div>
    </>
  );
}

/* STYLES */

const chatButton = {
  position: "fixed",
  bottom: "170px",
  right: "24px",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  background: "#2563eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "24px",
  cursor: "pointer",
  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
  zIndex: 2000
};

const chatWindow = {
  position: "fixed",
  bottom: "170px",
  right: "24px",
  width: "340px",
  height: "460px",
  background: "#0f172a",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
  zIndex: 2000
};

const chatHeader = {
  padding: "14px",
  background: "#2563eb",
  color: "#fff",
  fontWeight: "600",
  display: "flex",
  justifyContent: "space-between"
};

const chatBody = {
  flex: 1,
  padding: "12px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const userBubble = {
  alignSelf: "flex-end",
  background: "#2563eb",
  color: "#fff",
  padding: "10px 14px",
  borderRadius: "16px",
  maxWidth: "80%"
};

const botBubble = {
  alignSelf: "flex-start",
  background: "#1e293b",
  color: "#e5e7eb",
  padding: "10px 14px",
  borderRadius: "16px",
  maxWidth: "80%"
};

const chatInputArea = {
  display: "flex",
  borderTop: "1px solid rgba(255,255,255,0.1)"
};

const chatInput = {
  flex: 1,
  padding: "12px",
  border: "none",
  outline: "none",
  background: "transparent",
  color: "#fff"
};

const sendBtn = {
  padding: "0 16px",
  background: "transparent",
  border: "none",
  color: "#2563eb",
  fontSize: "18px",
  cursor: "pointer"
};