import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

interface ImageCropperProps {
  image: string;
  onCancel: () => void;
  onCropComplete: (croppedImage: string) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ image, onCancel, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropCompleteCallback = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createCroppedImage = async () => {
    try {
      const canvas = document.createElement('canvas');
      const imageElement = document.createElement('img');
      imageElement.src = image;
      await new Promise((resolve) => {
        imageElement.onload = resolve;
      });

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { width, height, x, y } = croppedAreaPixels;

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(imageElement, x, y, width, height, 0, 0, width, height);

      const croppedImage = canvas.toDataURL('image/jpeg');
      onCropComplete(croppedImage);
    } catch (e) {
      console.error('Cropping failed:', e);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-lg w-full flex flex-col items-center">
        <div className="relative w-full h-80 bg-black">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteCallback}
          />
        </div>

        <div className="w-full mt-4 flex flex-col items-center">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Zoom</label>
          <input
            aria-label="range input"
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-3/4 accent-indigo-600"
          />
        </div>

        <div className="flex justify-end w-full gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={createCroppedImage}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition"
          >
            Crop & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
