import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext'
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { ToastProvider } from "@/contexts/ToastContext";

export const metadata = {
  title: "Din Mægler",
  description: "Din Mægler - Find din drømmebolig",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>
        <AuthProvider>
        <ToastProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
