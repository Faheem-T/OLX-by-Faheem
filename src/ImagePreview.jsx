import { useState } from "react";
import { Loader2 } from "lucide-react";

// Image preview component with loading state
export const ImagePreview = ({ url, onClick, onLoad }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center text-red-500 text-xs text-center p-1">
          Failed to load
        </div>
      ) : (
        <img
          src={url}
          alt="Preview"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          loading="lazy"
          onClick={onClick}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};
