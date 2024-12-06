import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Image as ImageIcon, Map, Home, Heart } from "lucide-react";
import MapComponent from "./map/MapComponent";

export default function ImageGallery({ property, activeView, setActiveView }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    if (activeView === "map") {
      setMapKey((prev) => prev + 1);
    }
  }, [activeView, showLightbox]);

  const mainContent = () => {
    switch (activeView) {
      case "map":
        return (
          <div className="h-full w-full relative" key={mapKey}>
            <MapComponent
              position={[property?.lat || 55.676098, property?.long || 12.568337]}
            />

          </div>
        );
      case "floorplan":
        return property?.floorplan?.url ? (
          <div className="relative w-full h-full">
            <Image
              src={property.floorplan.url}
              alt="Plantegning"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Ingen plantegning tilgængelig
          </div>
        );
      default:
        return property?.images?.[activeImageIndex]?.url ? (
          <div className="relative w-full h-full">
            <Image
              src={property.images[activeImageIndex].url}
              alt={`Boligbillede ${activeImageIndex + 1}`}
              fill
              className=" aspect-auto object-contain"
              priority={activeImageIndex === 0}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Ingen billeder tilgængelige
          </div>
        );
    }
  };

  const renderImageCounter = () => (
    activeView === "exterior" && property?.images?.length > 0 && (
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {activeImageIndex + 1} / {property.images.length}
      </div>
    )
  );

  const renderImageControls = () => (
    activeView === "exterior" && property?.images?.length > 1 && (
      <>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveImageIndex((prev) =>
              prev === 0 ? property.images.length - 1 : prev - 1
            );
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 z-10"
        >
          ←
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveImageIndex((prev) =>
              prev === property.images.length - 1 ? 0 : prev + 1
            );
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 z-10"
        >
          →
        </button>
      </>
    )
  );

  return (
    <>
      <div
        className="relative w-full h-[500px] cursor-pointer"
        onClick={() => setShowLightbox(true)}
      >
        {mainContent()}
        {renderImageControls()}
        {renderImageCounter()}
      </div>

      {showLightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-start justify-center pt-[5vh] lightbox-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("lightbox-overlay")) {
              setShowLightbox(false);
            }
          }}
        >
          <div className="relative w-[90vw] h-[80vh]">
            {mainContent()}
            {renderImageControls()}
            {renderImageCounter()}

            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <X size={32} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}