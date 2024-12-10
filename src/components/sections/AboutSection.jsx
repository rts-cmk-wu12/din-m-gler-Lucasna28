"use client"
import { motion } from "framer-motion"
import { Building2, MapPin, UserCheck } from 'lucide-react'
import Image from "next/image"

export default function AboutSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  className="relative"
>
  <div className="relative w-full max-w-[460px] mx-auto">
    {/* Ydre kant (rammen) */}
    <div className="absolute inset-0 border-[14px] border-primary-color01 translate-x-4 translate-y-4 z-10"></div>

    {/* Indre container med billede */}
    <div className="relative bg-white shadow-lg -translate-x-6 -translate-y-6 z-0">
      <Image
        src="/images/groupimg.png"
        alt="Familie med Din Mægler"
        width={420}
        height={320}
        className="w-full h-auto"
      />

      {/* Tekstboks */}
      <div className="absolute w-1/2 bottom-[-28px] right-[-28px] bg-primary-color01 text-white p-10 text-center border-primary-color01">
        <p className="text-6xl font-bold">38+</p>
        <p className="text-2xl text-pretty">års mægler-erfaring</p>
      </div>
    </div>
  </div>
</motion.div>
          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-primary-color01">
              Vi har fulgt danskerne hjem<br />i snart 4 artier
            </h2>
            
            <p className="text-primary-color01 font-medium text-xl">
            Det synes vi siger noget om os!
            </p>
            
            <p className="text-paragraph-para02">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a normal distribution.
            </p>
            
            <p className="text-paragraph-para02">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
            </p>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="flex items-center gap-2">
                <img src="/house1.svg" alt="boliger solgt" className="bg-shape-shape02 p-4" /> 
                <div>
                  <div className="font-bold text-2xl">4829</div>
                  <div className="text-paragraph-para02">boliger solgt</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img src="/home1.svg" alt="boliger til salg" className="bg-shape-shape02 p-4"/>
                <div>
                  <div className="font-bold text-2xl">158</div>
                  <div className="text-paragraph-para02">boliger til salg</div>
                </div>
              </div>
            </div>


          </motion.div>
      </div>            
      <hr className="my-8" />
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <li className="space-y-2 flex">
                <img src="/property1.svg" className="bg-shape-shape02 p-4 size-16 mr-4" alt="icon image for property text"/>
                <div className="flex flex-col w-48 h-full">

                <h3 className="font-semibold text-lg text-heading-head02">Bestil et salgstjek</h3>
                <p className="text-base text-paragraph-para02 my-4">
                  Med et Din Mægler Salgstjek bliver du opdateret på værdien af din bolig.
                </p>
                </div>
            </li>
            <li className="space-y-2 flex">
                <img src="/maps-and-flags1.svg" className="bg-shape-shape02 p-4 size-16 mr-4" alt="icon image for maps and flags text"/>
                <div className="flex flex-col w-48 h-full"> 
                  <h3 className="font-semibold text-lg text-heading-head02">74 butikker</h3>
                  <p className="text-base text-paragraph-para02 my-4">
                    Hos Din Mægler er din bolig til salg i alle vores 74 butikker, som er fordelt rundt om i Danmark.
                  </p>
                </div>
            </li>
            <li className="space-y-2 flex">
                <img src="/customer1.svg" className="bg-shape-shape02 p-4 size-16 mr-4" alt="icon image for customer text"/> 
                <div className="flex flex-col w-48 h-full">
                  <h3 className="font-semibold text-heading-head02">Tilmeld køberkartotek</h3>
                  <p className="text-base text-paragraph-para02 my-4">
                    Når du er tilmeldt vores køberkartotek, bliver du kontaktet inden en ny bolig bliver annonceret.
                  </p>
                </div>
              </li>
            </ul>
        </div>
    </section>
  )
}

