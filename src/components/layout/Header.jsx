"use server"
import Link from "next/link";
import { Mail, Phone, User } from "lucide-react";
import LogoutButton from "../ui/LogoutButton";
import getUser from "@/utils/getUser";


export default async function Header() {
  const user = await getUser();


  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-color01 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link
              href="mailto:contact@dinmaegler.dk"
              className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>contact@dinmaegler.dk</span>
            </Link>
            <Link
              href="tel:+4570704000"
              className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+45 7070 4000</span>
            </Link>
          </div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>{user.username}</span>
              <LogoutButton/>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Log ind</span>
            </Link>
          )}
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-[#162A41]">
            <img
              src="/dinmeagler.svg"
              alt="DIN MÆGLER"
              width={120}
              height={120}
            />
          </Link>
          <div className="flex space-x-6">
            <Link
              href="/boliger"
              className="text-gray-600 hover:text-[#162A41] transition-colors"
            >
              Boliger til salg
            </Link>
            <Link
              href="/maeglere"
              className="text-gray-600 hover:text-[#162A41] transition-colors"
            >
              Mæglere
            </Link>
            {user && (
              <Link
                href="/favoritter"
                className="text-gray-600 hover:text-[#162A41] transition-colors"
              >
                Favoritter
              </Link>
            )}
            <Link
              href="/kontakt"
              className="text-gray-600 hover:text-[#162A41] transition-colors"
            >
              Kontakt os
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}