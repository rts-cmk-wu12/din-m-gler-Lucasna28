'use client'

import { motion } from "framer-motion"
import Link from "next/link"

export default function NotFound() {
  return (
    <section className="min-h-dvh flex flex-col items-center justify-center p-4 bg-shape-shape02 -z-[2]">
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg text-center">
        {/* "Hov!" tekst with overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
        {/* Hov-tekst med høj z-index */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold text-white relative z-20 text-border">
            Hov!
          </h1>
          {/* blå overlay med lav z-index */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-0 left-0 h-[45%] bg-primary-color01 z-10"
          />
        </motion.div>
        {/* Error message */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-xl sm:text-2xl font-medium text-black"
        >
          Du er havnet på en side som ikke findes!
        </motion.h2>
        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 text-sm sm:text-base text-gray-600"
        >
          Det er vi kede af! Vi har sendt en besked af sted til vores internetbureau, og bedt dem se på fejlen.
        </motion.p>
        {/* tilbage knap */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#1a2942] text-white rounded hover:bg-[#2a3952] transition-colors duration-200"
          >
            Tilbage til forsiden
          </Link>
        </motion.button>
      </div>
    </section>
  )
}

