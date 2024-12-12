// components/gallery/Lightbox.jsx
import { X } from "lucide-react";
import { motion } from "framer-motion";

export const Lightbox = ({ 
  show, 
  onClose, 
  children 
}) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-start justify-center pt-[5vh] lightbox-overlay"
      onClick={(e) => {
        if (e.target.classList.contains("lightbox-overlay")) {
          onClose();
        }
      }}
    >
      {children}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black/50 p-2 rounded-full"
      >
        <X size={24} />
      </button>
    </motion.div>
  );
};
