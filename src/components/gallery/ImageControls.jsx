// components/gallery/ImageControls.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ImageControls = ({ onPrev, onNext, show }) => {
  if (!show) return null;
  
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/75 transition-colors z-10"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/75 transition-colors z-10"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>
    </>
  );
};
