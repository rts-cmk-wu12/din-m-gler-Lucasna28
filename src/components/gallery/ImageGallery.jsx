// components/gallery/ImageGallery.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageControls } from "./ImageControls";
import { ImageCounter } from "./ImageCounter";
import { ViewControls } from "./ViewControls";
import { ImageDots } from "./ImageDots";
import { GalleryContent } from "./GalleryContent";
import { Lightbox } from "./Lightbox";

export default function ImageGallery({ property, activeView, setActiveView }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    if (activeView === "map") {
      setMapKey(prev => prev + 1);
    }
    setIsLoading(true);
  }, [activeView, showLightbox]);

  const handleImageNavigation = (e, direction) => {
    e.stopPropagation();
    const totalImages = property?.images?.length || 0;
    
    setActiveImageIndex(prev => {
      if (direction === 'next') {
        return prev === totalImages - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? totalImages - 1 : prev - 1;
    });
  };

  const showImageControls = activeView === "exterior" && property?.images?.length > 1;
  const showCounter = activeView === "exterior" && property?.images?.length > 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative cursor-pointer"
        onClick={() => setShowLightbox(true)}
      >
        <GalleryContent
          view={activeView}
          property={property}
          activeImageIndex={activeImageIndex}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          mapKey={mapKey}
          isLightbox={false}
        />
        
        <ImageControls
          onPrev={(e) => handleImageNavigation(e, 'prev')}
          onNext={(e) => handleImageNavigation(e, 'next')}
          show={showImageControls}
        />
        
        <ImageCounter
          current={activeImageIndex + 1}
          total={property?.images?.length}
          show={showCounter}
        />
      </motion.div>

      <AnimatePresence>
        <Lightbox 
          show={showLightbox}
          onClose={() => setShowLightbox(false)}
        >
          <GalleryContent
            view={activeView}
            property={property}
            activeImageIndex={activeImageIndex}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            mapKey={mapKey}
            isLightbox={true}
          />
          
          <ViewControls
            activeView={activeView}
            onViewChange={setActiveView}
            hasFloorplan={!!property?.floorplan?.url}
          />
          
          <ImageControls
            onPrev={(e) => handleImageNavigation(e, 'prev')}
            onNext={(e) => handleImageNavigation(e, 'next')}
            show={showImageControls}
          />
          
          <ImageCounter
            current={activeImageIndex + 1}
            total={property?.images?.length}
            show={showCounter}
          />
          
          <ImageDots
            total={property?.images?.length}
            activeIndex={activeImageIndex}
            onChange={setActiveImageIndex}
          />
        </Lightbox>
      </AnimatePresence>
    </>
  );
}