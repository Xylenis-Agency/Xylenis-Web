import React, { useState } from 'react';
import { useBrand } from '../context/BrandContext';
import { Upload, RotateCcw, Image as ImageIcon } from 'lucide-react';

interface WordmarkProps {
  variant?: 'light' | 'dark'; // 'light' is for light backgrounds (dark text), 'dark' is for dark backgrounds (light text)
  allowUpload?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Wordmark: React.FC<WordmarkProps> = ({
  variant = 'light',
  allowUpload = false,
  className = '',
  size = 'md',
}) => {
  const { customWordmarkUrl, triggerUpload, resetWordmark } = useBrand();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const isDarkBg = variant === 'dark';
  const textColor = isDarkBg ? 'text-white' : 'text-stone-900';
  const xMarkBg = isDarkBg ? '#FFFFFF' : '#1E232A';

  const sizeClasses = {
    sm: 'h-6 text-lg',
    md: 'h-7 sm:h-8 text-xl sm:text-2xl',
    lg: 'h-10 text-3xl',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Clickable wrapper if allowUpload is enabled */}
      <button
        type="button"
        onClick={allowUpload ? triggerUpload : undefined}
        className={`inline-flex items-center gap-2 focus:outline-none transition-transform ${
          allowUpload ? 'cursor-pointer hover:opacity-90 active:scale-[0.98]' : 'cursor-default'
        }`}
        title={allowUpload ? 'Click to upload your custom wordmark image' : 'Xylenis'}
      >
        {customWordmarkUrl ? (
          /* Render User's Uploaded Wordmark */
          <div className="flex items-center gap-2">
            <img
              src={customWordmarkUrl}
              alt="Xylenis Wordmark"
              className={`${sizeClasses} object-contain max-w-[180px] rounded`}
            />
          </div>
        ) : (
          /* Default SVG Vector Wordmark matching uploaded facebook_profile_xylenis_bw.png */
          <div className={`flex items-center gap-1.5 font-bold font-display tracking-tight ${textColor} select-none`}>
            {/* Stylized Geometric "X" Mark */}
            <svg
              className={size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-8 h-8' : 'w-7 h-7 sm:w-8 sm:h-8'}
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Top-left to bottom-right curved stroke */}
              <path
                d="M18 20 C28 20, 42 35, 52 50 C62 65, 74 80, 84 80 C88 80, 92 76, 92 72 C92 65, 78 48, 68 36 C58 24, 42 12, 28 12 C22 12, 18 16, 18 20 Z"
                fill={xMarkBg}
              />
              {/* Bottom-left to top-right crossing curved stroke with stylized aerodynamic flare */}
              <path
                d="M16 78 C26 78, 40 62, 50 48 C60 34, 72 20, 82 20 C88 20, 92 24, 92 28 C92 36, 76 54, 66 66 C56 78, 40 88, 26 88 C20 88, 16 84, 16 78 Z"
                fill={xMarkBg}
              />
            </svg>

            {/* Typography "ylenis" in exact proportional brand weight */}
            <span className={`tracking-[-0.03em] ${sizeClasses} flex items-center leading-none font-bold`}>
              ylenis
            </span>
          </div>
        )}
      </button>

      {/* Interactive Upload Badge / Hover Affordance */}
      {allowUpload && (
        <div className="ml-2 flex items-center gap-1">
          <button
            onClick={triggerUpload}
            className={`p-1 rounded-md text-xs transition-all flex items-center gap-1 cursor-pointer ${
              isDarkBg
                ? 'bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700'
                : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
            } ${isHovered || customWordmarkUrl ? 'opacity-100' : 'opacity-40 sm:opacity-0 group-hover:opacity-100'}`}
            title="Upload custom wordmark logo image"
          >
            <Upload className="w-3 h-3" />
            <span className="text-[10px] font-medium hidden sm:inline">
              {customWordmarkUrl ? 'Change' : 'Upload Logo'}
            </span>
          </button>

          {/* Reset button if custom wordmark is active */}
          {customWordmarkUrl && (
            <button
              onClick={resetWordmark}
              className={`p-1 rounded-md text-xs transition-all cursor-pointer ${
                isDarkBg
                  ? 'bg-stone-800 text-stone-400 hover:text-rose-300'
                  : 'bg-stone-100 text-stone-500 hover:text-rose-600 hover:bg-stone-200'
              }`}
              title="Reset to default brand wordmark"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
