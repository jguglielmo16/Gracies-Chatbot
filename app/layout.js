export const metadata = {
  title: "Al Forno Restaurant | Chat Assistant",
  description: "Chat with Al Forno's AI assistant — reservations, menu, hours, and more.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#f5eeea" }}>
        {children}
      </body>
    </html>
  );
}
