import { useState, useEffect } from 'react';

export default function MapComponent({ position }) {
  const [loading, setLoading] = useState(true);
  const [latitude, longitude] = Array.isArray(position) && position.length === 2
    ? position
    : [55.676098, 12.568337];

  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&hl=da&z=14&output=embed`;

  // Simulerer en loading-state i 1 sekund (kan tilpasses)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="flex justify-center items-center absolute inset-0 bg-white bg-opacity-50 z-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}
      <iframe
        src={googleMapsUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};
