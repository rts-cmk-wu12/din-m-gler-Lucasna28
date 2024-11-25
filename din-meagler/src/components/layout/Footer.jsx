"use client"
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="max-w-sm">
            <Image 
              src="/din-maegler-logo.png" 
              alt="Din Mægler Logo" 
              width={150} 
              height={50}
              className="mb-4"
            />
            <p className="text-gray-600 text-sm leading-relaxed">
              There are many variations of passages of Lorem ipsum available, but the majority have 
              suffered alteration in some form, by injected humour, or randomised words.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#162A41] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#162A41]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-[#162A41]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#162A41]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-[#162A41]">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#162A41] mb-4">Kontakt</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>info@dinmaegler.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+45 7070 4000</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Strandvejen 60, 2900 Hellerup</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              Medlem af DMS - Dansk Mægler Sammenslutning
            </p>
            <Image 
              src="/dms-logo.png" 
              alt="DMS Logo" 
              width={100} 
              height={30}
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

