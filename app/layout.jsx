import AuthProvider from "./(components)/AuthProvider";
import Nav from "./(components)/Nav";
import "./globals.css";

export const metadata = {
  title: "Authentication",
  description: "Add authentication to our next js app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="bg-gray-100">
          <Nav />
          <div>{children}</div>
        </body>
      </AuthProvider>
    </html>
  );
}
