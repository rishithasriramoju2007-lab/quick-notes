import "./globals.css";

export const metadata = {
  title: "Quick Notes",
  description: "A simple full-stack notes application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}