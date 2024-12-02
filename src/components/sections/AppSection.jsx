"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AppSection() {
  const appStoreButtons = [
    {
      id: 'google-play',
      href: "#",
      imgSrc: "/svg/googleplay.svg",
      alt: "Google Play",
      className: "bg-white text-primary-color01",
      text: "Google Play",
      hoverColor: "hover:bg-gray-100"
    },
    {
      id: 'app-store',
      href: "#",
      imgSrc: "/svg/apple.svg",
      alt: "App Store",
      className: "border border-white text-white",
      text: "App Store",
      hoverColor: "hover:bg-white/10"
    }
  ];

  const phoneAnimation = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="bg-primary-color01  overflow-hidden text-heading-head01 flex">
      <div className="container mx-auto px-4 flex ">
        <div className="flex items-start justify-between gap-12 p-10 w-full">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight mb-6">
              Hold dig opdateret<br />på salgsprocessen
            </h2>
            <p className="text-gray-200 text-base leading-relaxed mb-8 w-full text-pretty">
              Når du sælger din bolig hos Din Mægler, kommunikerer du nemt med den 
              ansvarlige mægler eller butik med vores app. Her kan du også se statistik på 
              interessen for din bolig i alle vores salgskanaler.
            </p>
            <div className="flex gap-4">
              {appStoreButtons.map((button) => (
                <Link 
                  key={button.id}
                  href={button.href} 
                  className={`
                    rounded-lg
                    ${button.className}
                    ${button.hoverColor}
                    flex items-center gap-3
                    px-6 py-3
                    transition-all duration-300
                    shadow-sm hover:shadow
                    relative
                    overflow-hidden
                    transform hover:-translate-y-[2px]
                  `}
                >
                  <div className="relative z-10 flex items-center gap-3 whitespace-nowrap">
                    <Image
                      src={button.imgSrc}
                      alt={button.alt}
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                    <span className="text-sm font-medium">
                      {button.text}
                    </span>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-white/5"
                    initial={false}
                    whileHover={{ x: ['0%', '100%'] }}
                    transition={{ 
                      duration: 0.6,
                      ease: "easeInOut"
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

          <div className="container flex justify-end items-end ">
            <div className="flex justify-end items-end h-72 w-72">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={phoneAnimation}
                className="relative z-10 -mb-1"
              >
                <Image
                  src="/images/iphone-front.png"
                  alt="Din Mægler App forside"
                  width={150}
                  height={250}
                  className="w-auto h-[280px] object-contain hover:scale-105 transition-all duration-300"
                  priority
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={phoneAnimation}
                transition={{ delay: 0.2 }}
                className="relative z-0 -ml-14 -mb-1"
              >
                <Image
                  src="/images/iphone-back.png"
                  alt="Din Mægler App chat"
                  width={150}
                  height={250}
                  className="w-auto h-[280px] object-contain hover:scale-105 transition-all duration-300"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
    </section>
  );
} 