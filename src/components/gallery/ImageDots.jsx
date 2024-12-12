// components/gallery/ImageDots.jsx
export const ImageDots = ({ total, activeIndex, onChange }) => {
    if (!total) return null;
  
    return (
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {Array.from({ length: total }, (_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              onChange(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              activeIndex === index
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Gå til billede ${index + 1}`}
          />
        ))}
      </div>
    );
  };