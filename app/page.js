"use client";
import { useState, useEffect, useRef } from "react";

const restaurantInfo = {
  name: "Gracie's Restaurant",
  location: "Providence, Rhode Island",
  hours: "Wednesday–Thursday 5pm–8pm, Friday–Saturday 5pm–9pm, Sunday 5pm–8pm, Closed Monday & Tuesday",
  address: "194 Washington Street, Providence, RI 02903",
  phone: "401-272-7811",
  cuisine: "Contemporary American fine dining, seasonal tasting menus",
  priceRange: "$$$$",
  parking: "Located in Downtown Providence (DownCity). On-street parking and nearby parking lots available. Close to PPAC, the Dunkin' Donuts Center, and the RI Convention Center.",
  reservationLink: "https://www.opentable.com/gracies-reservations-providence?restref=3222&lang=en-US",
  specialNotes: `
    ABOUT: Gracie's is Providence's premier fine dining destination, named to OpenTable's Top 100 Restaurants in the United States — the only Rhode Island restaurant on that national list. Also recognized on the Global Star Wine List International Open Short List. Contemporary American cuisine with impeccable service and a warm, elegant atmosphere. The mission: to surprise and delight every guest with personal care and the freshest seasonal ingredients.

    TASTING MENUS:
    - Five-Course Chef's Tasting: $100 per person. Wine pairing available for $150 per person total.
    - Seven-Course Chef's Tasting: $135 per person. Wine pairing available for $200 per person total. Includes highlights like Foie Gras and a tasting of New England Cheeses.

    À LA CARTE: Available for guests who prefer to build their own meal. Popular dishes include housemade gnocchi, duck, rigatoni, and steak.

    SIGNATURE DISHES: Housemade Gnocchi, Foie Gras, New England Cheese Tasting, Culver Farms Duck, fresh halibut and seasonal seafood, Beet Salad, seasonal desserts including Crème Brûlée.

    WINE PROGRAM: Award-winning. Sommelier wine pairings available with both tasting menus. BYO wine permitted (corkage fee applies).

    PRIVATE DINING & EVENTS: Beautiful private dining room available. Contact Jada O'Brien at 401-369-7260 or jada@graciesprov.com.

    ATMOSPHERE: Elegant yet welcoming. Fine dining without feeling stuffy. Perfect for anniversaries, birthdays, proposals, and business dinners. Wheelchair accessible. Gluten-free options available.

    PAYMENTS: Credit, Debit, Apple Pay, and Google Pay accepted.

    CONTACT: Phone 401-272-7811, email ellen@graciesprov.com, events: jada@graciesprov.com
  `
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Welcome to Gracie's! ✨ Providence's award-winning fine dining destination — named to OpenTable's Top 100 Restaurants in America. I'm here to help you with:

- 📅 Reservations & tasting menu details
- 🍽️ Our 5 and 7-course chef's tasting menus
- 🍷 Wine pairings & cocktails
- 🎉 Private dining & special occasions
- 🕐 Hours & location

What can I help you plan tonight?`
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
            border: "1px solid #d8e4de",
            display: "flex",
            flexDirection: "column",
          }}>

            <div style={{
              background: "#1C3A2E",
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
              }}>✨</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#e8f4ee", fontSize: "14px", fontWeight: "bold" }}>
                  {restaurantInfo.name}
                </div>
                <div style={{ color: "rgba(232,244,238,0.7)", fontSize: "11px" }}>
                  Typically replies instantly
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{
                background: "none", border: "none", color: "#e8f4ee",
                fontSize: "24px", cursor: "pointer", padding: "0 4px",
                lineHeight: 1, minWidth: "36px", minHeight: "36px"
              }}>×</button>
            </div>

            <div style={{
              overflowY: "auto",
              padding: "14px",
              background: "#f4f8f6",
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
                      background: "#1C3A2E", display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "12px", flexShrink: 0
                    }}>✨</div>
                  )}
                  <div style={{
                    background: msg.role === "user" ? "#1C3A2E" : "#fff",
                    color: msg.role === "user" ? "#e8f4ee" : "#1a2e24",
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
                    background: "#1C3A2E", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "12px"
                  }}>✨</div>
                  <div style={{
                    background: "#fff", padding: "9px 13px",
                    borderRadius: "16px 16px 16px 2px",
                    fontSize: "13px", color: "#7a9a88"
                  }}>Typing...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div style={{
              display: "flex",
              padding: isMobile ? "14px" : "12px",
              background: "#fff",
              borderTop: "1px solid #d0e8da",
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
                  border: "1px solid #d0e8da",
                  fontSize: isMobile ? "16px" : "13px",
                  outline: "none",
                  fontFamily: "Georgia, serif"
                }}
              />
              <button onClick={sendMessage} style={{
                background: "#1C3A2E", color: "#e8f4ee", border: "none",
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
            background: "#1C3A2E", border: "none", cursor: "pointer",
            fontSize: "24px", boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            alignSelf: "flex-end",
            flexShrink: 0
          }}>
          {isOpen ? "×" : "✨"}
        </button>

      </div>
    </>
  );
}
