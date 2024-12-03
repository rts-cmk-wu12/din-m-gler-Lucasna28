import "./globals.css";
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
        <ToastProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          </ToastProvider>
      </body>
    </html>
  );
}
