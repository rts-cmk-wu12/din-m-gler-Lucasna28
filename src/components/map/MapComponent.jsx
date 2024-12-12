// MapComponent.jsx
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MapComponent({ position }) {
  const [loading, setLoading] = useState(true);
  const [latitude, longitude] = Array.isArray(position) && position.length === 2
    ? position
    : [55.676098, 12.568337];

  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&hl=da&z=14&output=embed`;

  return (
    <div className="relative w-full h-full">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-center items-center absolute inset-0 bg-white/80 z-10"
        >
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </motion.div>
      )}
      <motion.iframe
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        src={googleMapsUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}