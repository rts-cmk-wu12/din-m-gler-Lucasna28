// components/gallery/ViewControls.jsx
import { Image as ImageIcon, Map } from "lucide-react";

export const ViewControls = ({ activeView, onViewChange, hasFloorplan }) => {
  const views = [
    { id: 'exterior', icon: ImageIcon, label: 'Billeder' },
    { id: 'floorplan', label: 'Plantegning', disabled: !hasFloorplan },
    { id: 'map', icon: Map, label: 'Kort' }
  ];

  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-1 rounded-full">
      {views.map(({ id, icon: Icon, label, disabled }) => (
        <button
          key={id}
          onClick={() => !disabled && onViewChange(id)}
          disabled={disabled}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full transition-all
            ${activeView === id ? 'bg-white text-black' : 'text-white hover:bg-white/20'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          title={label}
        >
          {Icon ? <Icon size={20} /> : null}
          <span className="hidden md:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};