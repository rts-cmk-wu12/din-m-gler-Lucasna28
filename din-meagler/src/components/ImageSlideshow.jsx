import Image from "next/image"
import PlaceholderImage from './PlaceholderImage'

export default function ImageSlideshow({ images, activeIndex, setActiveIndex, category }) {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
      {images[activeIndex]?.url ? (
        <Image
          src={images[activeIndex].url}
          alt={`${category === 'exterior' ? 'billede' : 'plantegning'} ${activeIndex + 1}`}
          fill
          className="object-cover"
        />
      ) : (
        <PlaceholderImage className="w-full h-full" />
      )}
      
      {/* Slideshow Navigation */}
      {images.length > 1 && (
        <>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
            onClick={() => setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
          >
            ←
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
            onClick={() => setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
          >
            →
          </button>
        </>
      )}
    </section>
  )
} 