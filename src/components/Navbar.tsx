import React, { useRef, useState } from 'react';
import { ChevronRight, Upload, Camera, RotateCcw, Check } from 'lucide-react';

interface NavbarProps {
  onOpenDemo: () => void;
  customLogo: string | null;
  onLogoUpload: (logoUrl: string | null) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo, customLogo, onLogoUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadToast, setUploadToast] = useState<string | null>(null);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, SVG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onLogoUpload(dataUrl);
        setUploadToast('Custom logo uploaded successfully!');
        setTimeout(() => setUploadToast(null), 3000);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleResetLogo = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLogoUpload(null);
    setUploadToast('Reset to default wordmark');
    setTimeout(() => setUploadToast(null), 2500);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-20 sm:min-h-24 py-3 sm:py-4 flex items-center justify-between gap-8">
        
        {/* Hidden File Input for Logo Upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload custom brand logo"
        />

        {/* Zone 1: Top Left Corner Big Wordmark / Logo with Direct Click-to-Upload */}
        <div className="relative group shrink-0 py-1">
          <button
            onClick={handleLogoClick}
            type="button"
            className="text-left flex items-center gap-3 p-1.5 -m-1.5 rounded-2xl hover:bg-stone-200/40 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            title="Click top-left to upload your custom wordmark / logo"
          >
            {customLogo ? (
              <img
                src={customLogo}
                alt="Brand Wordmark"
                className="h-12 sm:h-16 lg:h-20 max-w-[280px] sm:max-w-[360px] object-contain transition-all drop-shadow-xs"
              />
            ) : (
              <span className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-stone-900 text-stone-50 flex items-center justify-center text-2xl sm:text-3xl font-bold font-display tracking-tight shadow-md group-hover:bg-stone-800 transition-colors relative">
                <span>X</span>
                {/* Subtle camera overlay on hover */}
                <span className="absolute inset-0 bg-stone-900/90 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                  <Camera className="w-5 h-5" />
                </span>
              </span>
            )}

            {/* Hover Tooltip / Upload hint */}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900 text-stone-100 text-[11px] px-2.5 py-1 rounded-md shadow-md hidden sm:inline-flex items-center gap-1.5 font-sans whitespace-nowrap">
              <Upload className="w-3 h-3" />
              <span>{customLogo ? 'Change logo' : 'Upload logo'}</span>
            </span>
          </button>

          {/* Reset button if custom logo is active */}
          {customLogo && (
            <button
              onClick={handleResetLogo}
              type="button"
              className="absolute -bottom-5 left-1 text-[11px] font-medium text-stone-400 hover:text-stone-800 transition-colors flex items-center gap-1 cursor-pointer bg-[#FAF8F5]/90 px-1 rounded"
              title="Reset to default mark"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset mark</span>
            </button>
          )}

          {/* Toast Notification */}
          {uploadToast && (
            <div className="absolute top-full left-0 mt-2 bg-stone-900 text-white text-xs px-3.5 py-2 rounded-lg shadow-xl flex items-center gap-2 whitespace-nowrap z-50 animate-in fade-in slide-in-from-top-1">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{uploadToast}</span>
            </div>
          )}
        </div>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a href="#capabilities" className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0">
            Capabilities
          </a>
          <a href="#interactive-os" className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0">
            Live OS Sandbox
          </a>
          <a href="#revenue-impact" className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0">
            Revenue Impact
          </a>
          <a href="#case-studies" className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0">
            Client Proof
          </a>
          <a href="#pricing" className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0">
            Pricing
          </a>
          <a href="#faq" className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0">
            FAQ
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenDemo}
            className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-all shadow-sm hover:shadow active:scale-[0.98] whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Book Walkthrough</span>
            <ChevronRight className="w-4 h-4 opacity-70" />
          </button>
        </div>

      </div>
    </header>
  );
};
