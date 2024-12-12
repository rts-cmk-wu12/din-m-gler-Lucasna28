
// components/gallery/LoadingSpinner.jsx
import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-white/80">
    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
  </div>
);