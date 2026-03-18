"use client";
import { useState, useEffect, useRef } from "react";

const restaurantInfo = {
  name: "Al Forno Restaurant",
  location: "Providence, Rhode Island",
  hours: "Tuesday–Friday 5pm–10pm, Saturday 4pm–10pm, Closed Sunday & Monday",
  address: "577 South Water Street, Providence, RI 02903",
  phone: "401-273-9760",
  cuisine: "Wood-fired Italian, inventor of grilled pizza",
  priceRange: "$$$",
  parking: "Parking and entrance are located in the REAR on Bridge Street — not on South Water Street. Please use the Bridge Street entrance.",
  reservationLink: "https://www.exploretock.com/alfornorestaurant",
  orderTakeout: "https://www.toasttab.com/catering/al-forno-restaurant-577-south-water-street",
  specialNotes: `
    ABOUT: Al Forno opened on January 2, 1980, founded by chef-owners Johanne Killeen and George Germon. It is world-famous for inventing grilled pizza — a dish now known globally. The cuisine is rooted in rustic Italian and Southern French traditions, reimagined with the finest products from New England farms and waters, cooked in blazing hot ovens and over hardwood charcoal fires. One of the most celebrated restaurants in Providence history.

    SIGNATURE DISHES: Grilled Pizza (the original — invented here, the margherita is iconic), Baked Pasta with Five Cheeses (pecorino romano, fontina, Gorgonzola, mozzarella, ricotta — baked golden and bubbly), Clams Al Forno, Short Rib Ravioli (handmade pasta), Confit Duck Legs, wood-grilled ribeyes and pork chops.

    DESSERTS: Fresh Berry Tarts, Croque Mademoiselle (served with crème anglaise and fresh whipped cream).

    DRINKS: Al Forno is known for excellent cocktails — locals say they make the best cosmos in the city. Thoughtful wine list complementing Italian and Southern French cuisine. Impressive selection of grappas and ports.

    MENU: The menu is seasonal and changes regularly based on what is freshest from New England farms and waters. Always call or email for current specials.

    RESERVATIONS: Reservations are through Tock at exploretock.com/alfornorestaurant. Peak hours and weekends book up weeks in advance — reserve early. Walk-ins welcome but not guaranteed.

    TAKEOUT & CATERING: Available through Toast at toasttab.com/catering/al-forno-restaurant-577-south-water-street

    GIFT CARDS: Available at toasttab.com/al-forno-restaurant-577-south-water-street/giftcards

    ATMOSPHERE: Rustic, warm, and artistic — reflecting the fine arts backgrounds of the founders. Riverfront setting. Beloved Providence institution for over 45 years.

    CONTACT: Phone 401-273-9760, email mail@alforno.com
  `
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Welcome to Al Forno! 🍕 We're Providence's legendary wood-fired Italian restaurant — inventors of grilled pizza since 1980. I'm here to help you with:

- 📅 Reservations & booking (via Tock)
- 🍽️ Menu & signature dishes
- 🚗 Hours, location & parking
- 🎉 Private events & special occasions
- 🥡 Takeout & catering

What can I help you with today?`
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedMessages, restaurantInfo }),
    });

    const data = await response.json();
    setMessages([...updatedMessages, { role: "assistant", content: data.message }]);
    setLoading(false);
  };

  return (
    <>
      <div style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "12px",
        zIndex: 9999,
        fontFamily: "Georgia, serif",
        width: isMobile ? "calc(100vw - 48px)" : "340px",
      }}>

        {isOpen && (
          <div style={{
            width: "100%",
            background: "#fff",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            border: "1px solid #e0d6c8",
            display: "flex",
            flexDirection: "column",
          }}>

            <div style={{
              background: "#8B1A1A",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "rgba(255,255,255,0.15)", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: "18px"
              }}>🍕</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#f8e8e8", fontSize: "14px", fontWeight: "bold" }}>
                  {restaurantInfo.name}
                </div>
                <div style={{ color: "rgba(248,232,232,0.7)", fontSize: "11px" }}>
                  Typically replies instantly
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{
                background: "none", border: "none", color: "#f8e8e8",
                fontSize: "24px", cursor: "pointer", padding: "0 4px",
                lineHeight: 1, minWidth: "36px", minHeight: "36px"
              }}>×</button>
            </div>

            <div style={{
              overflowY: "auto",
              padding: "14px",
              background: "#fdf8f4",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              height: isMobile ? "260px" : "300px",
            }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: "flex", gap: "8px", alignItems: "flex-end",
                  flexDirection: msg.role === "user" ? "row-reverse" : "row"
                }}>
                  {msg.role === "assistant" && (
                    <div style={{
                      width: "26px", height: "26px", borderRadius: "50%",
                      background: "#8B1A1A", display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "12px", flexShrink: 0
                    }}>🍕</div>
                  )}
                  <div style={{
                    background: msg.role === "user" ? "#8B1A1A" : "#fff",
                    color: msg.role === "user" ? "#f8e8e8" : "#3a1a1a",
                    padding: "9px 13px",
                    borderRadius: msg.role === "user" ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
                    maxWidth: "75%",
                    fontSize: isMobile ? "15px" : "13px",
                    lineHeight: "1.6",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                    whiteSpace: "pre-line"
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
                  <div style={{
                    width: "26px", height: "26px", borderRadius: "50%",
                    background: "#8B1A1A", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "12px"
                  }}>🍕</div>
                  <div style={{
                    background: "#fff", padding: "9px 13px",
                    borderRadius: "16px 16px 16px 2px",
                    fontSize: "13px", color: "#aa7a7a"
                  }}>Typing...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div style={{
              display: "flex",
              padding: isMobile ? "14px" : "12px",
              background: "#fff",
              borderTop: "1px solid #e8d0d0",
              gap: "8px",
              flexShrink: 0
            }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: isMobile ? "12px 16px" : "9px 14px",
                  borderRadius: "20px",
                  border: "1px solid #e8d0d0",
                  fontSize: isMobile ? "16px" : "13px",
                  outline: "none",
                  fontFamily: "Georgia, serif"
                }}
              />
              <button onClick={sendMessage} style={{
                background: "#8B1A1A", color: "#f8e8e8", border: "none",
                borderRadius: "50%",
                width: isMobile ? "44px" : "36px",
                height: isMobile ? "44px" : "36px",
                cursor: "pointer", fontSize: "16px", flexShrink: 0
              }}>→</button>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: "56px", height: "56px", borderRadius: "50%",
            background: "#8B1A1A", border: "none", cursor: "pointer",
            fontSize: "24px", boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            alignSelf: "flex-end",
            flexShrink: 0
          }}>
          {isOpen ? "×" : "🍕"}
        </button>

      </div>
    </>
  );
}
