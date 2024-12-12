export const ImageCounter = ({ current, total, show }) => {
    if (!show) return null;
    
    return (
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {current} / {total}
      </div>
    );
  };