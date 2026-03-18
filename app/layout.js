export const metadata = {
  title: "Gracie's Restaurant | Chat Assistant",
  description: "Chat with Gracie's AI assistant — reservations, tasting menus, private dining, and more.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#edf2ef" }}>
        {children}
      </body>
    </html>
  );
}
