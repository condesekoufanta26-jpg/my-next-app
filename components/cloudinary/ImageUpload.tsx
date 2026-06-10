"use client";

import { useState, useCallback } from 'react';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';

interface ImageUploadProps {
  onUpload: (url: string, publicId: string) => void;
  multiple?: boolean;
  label?: string;
}

export default function ImageUpload({ onUpload, multiple = false, label = "Upload Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!uploadPreset) {
    return (
      <div className="text-red-500 p-4 border border-red-300 rounded-lg">
        Error: Cloudinary upload preset not configured.
      </div>
    );
  }

  return (
    <CldUploadWidget
      uploadPreset={uploadPreset}
      options={{
        multiple,
        maxFiles: multiple ? 10 : 1,
        sources: ['local', 'camera', 'url'],
        cropping: false,
        maxImageFileSize: 5000000,
        clientAllowedFormats: ['images'],
      }}
      onSuccess={(result) => {
        setUploading(false);
        if (result.info && typeof result.info !== 'string') {
          const info = result.info as CloudinaryUploadWidgetInfo;
          onUpload(info.secure_url, info.public_id);
        }
      }}
      onUpload={() => setUploading(true)}
    >
      {({ open }) => {
        // ✅ FIX: Vérifier que open existe avant de l'utiliser
        if (!open) {
          return (
            <button
              type="button"
              disabled={true}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
            >
              Chargement...
            </button>
          );
        }

        return (
          <button
            type="button"
            onClick={() => open()}
            disabled={uploading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Upload en cours...
              </span>
            ) : (
              label
            )}
          </button>
        );
      }}
    </CldUploadWidget>
  );
}