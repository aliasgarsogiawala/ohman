import React from 'react';
import { ImageOff } from 'lucide-react';

interface ImagePlaceholderProps {
  aspectRatio?: string; // e.g. 'aspect-square', 'aspect-[4/5]'
  label?: string;
  sublabel?: string;
  className?: string;
  src?: string;
  alt?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  aspectRatio = 'aspect-square',
  label = 'IMAGE COMING SOON',
  sublabel = '1200 × 1200',
  className = '',
  src,
  alt = 'Product Image'
}) => {
  const [hasError, setHasError] = React.useState(false);

  if (src && !hasError) {
    return (
      <div className={`relative overflow-hidden bg-[#171717] border-2 border-black ${aspectRatio} ${className}`}>
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-[#F7C318] text-black font-bebas px-2 py-0.5 text-xs font-bold border border-black shadow-[2px_2px_0px_#000]">
          RAW
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-[#141414] border-2 border-[#262626] border-dashed p-4 flex flex-col items-center justify-center text-center group hover:border-[#F7C318] transition-colors ${aspectRatio} ${className}`}>
      {/* Corner crosshairs for brutalist aesthetic */}
      <div className="absolute top-1 left-1 text-[10px] font-mono text-[#444] group-hover:text-[#F7C318]">+</div>
      <div className="absolute top-1 right-1 text-[10px] font-mono text-[#444] group-hover:text-[#F7C318]">+</div>
      <div className="absolute bottom-1 left-1 text-[10px] font-mono text-[#444] group-hover:text-[#F7C318]">+</div>
      <div className="absolute bottom-1 right-1 text-[10px] font-mono text-[#444] group-hover:text-[#F7C318]">+</div>

      <div className="w-12 h-12 rounded-none bg-[#222] border border-[#333] group-hover:border-[#F7C318] flex items-center justify-center mb-2 text-[#666] group-hover:text-[#F7C318] transition-all transform group-hover:scale-110 shadow-[2px_2px_0px_#000]">
        <ImageOff className="w-6 h-6" />
      </div>

      <span className="font-bebas text-sm tracking-wider text-[#AAA] group-hover:text-white uppercase">
        {label}
      </span>
      {sublabel && (
        <span className="font-mono text-[10px] text-[#666] mt-0.5">
          {sublabel}
        </span>
      )}
    </div>
  );
};
