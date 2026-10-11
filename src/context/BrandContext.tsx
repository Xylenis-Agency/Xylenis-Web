import React, { createContext, useContext, useState, useEffect } from 'react';

interface BrandContextType {
  customWordmarkUrl: string | null;
  setCustomWordmark: (dataUrl: string) => void;
  resetWordmark: () => void;
  uploadInputRef: React.RefObject<HTMLInputElement | null>;
  triggerUpload: () => void;
}

const STORAGE_KEY = 'xylenis_custom_wordmark';

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customWordmarkUrl, setCustomWordmarkUrl] = useState<string | null>(null);
  const uploadInputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCustomWordmarkUrl(saved);
    }
  }, []);

  const setCustomWordmark = (dataUrl: string) => {
    setCustomWordmarkUrl(dataUrl);
    localStorage.setItem(STORAGE_KEY, dataUrl);
  };

  const resetWordmark = () => {
    setCustomWordmarkUrl(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const triggerUpload = () => {
    if (uploadInputRef.current) {
      uploadInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (PNG, JPG, SVG, WebP)');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCustomWordmark(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <BrandContext.Provider
      value={{
        customWordmarkUrl,
        setCustomWordmark,
        resetWordmark,
        uploadInputRef,
        triggerUpload,
      }}
    >
      {/* Hidden Global File Input */}
      <input
        ref={uploadInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload custom wordmark"
      />
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};
