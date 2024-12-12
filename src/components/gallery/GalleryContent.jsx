// components/gallery/GalleryContent.jsx
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import MapComponent from "../map/MapComponent";
import { LoadingSpinner } from "./LoadingSpinner";

export const GalleryContent = ({ 
  view, 
  property, 
  activeImageIndex,
  isLoading,
  setIsLoading,
  mapKey,
  isLightbox 
}) => {
  const containerClass = isLightbox ? "w-[90vw] h-[80vh]" : "w-full h-[500px]";

  const content = {
    map: (
      <div className="h-full w-full relative" key={mapKey}>
        <MapComponent position={[property?.lat || 55.676098, property?.long || 12.568337]} />
      </div>
    ),
    floorplan: property?.floorplan?.url ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative w-full h-full"
      >
        {isLoading && <LoadingSpinner />}
        <Image
          src={property.floorplan.url}
          alt="Plantegning"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
          onLoadingComplete={() => setIsLoading(false)}
        />
      </motion.div>
    ) : (
      <div className="flex items-center justify-center h-full text-gray-500">
        Ingen plantegning tilgængelig
      </div>
    ),
    exterior: property?.images?.[activeImageIndex]?.url ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative w-full h-full"
      >
        {isLoading && <LoadingSpinner />}
        <Image
          src={property.images[activeImageIndex].url}
          alt={`Boligbillede ${activeImageIndex + 1}`}
          fill
          className="object-contain"
          priority={activeImageIndex === 0}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </motion.div>
    ) : (
      <div className="flex items-center justify-center h-full text-gray-500">
        Ingen billeder tilgængelige
      </div>
    )
  };

  return (
    <div className={`relative ${containerClass}`}>
      <AnimatePresence mode="wait">
        {content[view]}
      </AnimatePresence>
    </div>
  );
};