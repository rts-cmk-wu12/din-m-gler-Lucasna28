"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.6, // Gør animationen glattere
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};
