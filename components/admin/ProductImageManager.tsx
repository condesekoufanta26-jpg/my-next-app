"use client";

import { useState, useEffect } from 'react';
import ImageUpload from '@/components/cloudinary/ImageUpload';
import OptimizedImage from '@/components/cloudinary/OptimizedImage';

interface ProductImageManagerProps {
  imageUrl: string;
  imagePublicId: string;
  onImageChange: (url: string, publicId: string) => void;
}

interface CloudinaryImage {
  publicId: string;
  url: string;
  width: number;
  height: number;
  format: string;
}

export default function ProductImageManager({
  imageUrl,
  imagePublicId,
  onImageChange,
}: ProductImageManagerProps) {
  const [libraryImages, setLibraryImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (showLibrary) {
      fetchLibraryImages();
    }
  }, [showLibrary]);

  const fetchLibraryImages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cloudinary/images?folder=ecommerce&maxResults=50');
      const data = await response.json();
      setLibraryImages(data.images || []);
    } catch (error) {
      console.error('Erreur chargement galerie:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (url: string, publicId: string) => {
    onImageChange(url, publicId);
  };

  const handleSelectFromLibrary = (image: CloudinaryImage) => {
    onImageChange(image.url, image.publicId);
    setShowLibrary(false);
  };

  const handleRemove = () => {
    onImageChange('', '');
  };

  return (
    <div className="space-y-4">
      {/* Current Image Preview */}
      {imageUrl ? (
        <div className="relative group">
          <div className="w-full aspect-square max-w-xs bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
            <OptimizedImage
              src={imageUrl}
              alt="Produit"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="w-full aspect-square max-w-xs bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-gray-500">Aucune image sélectionnée</p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <ImageUpload
          onUpload={handleUpload}
          label={imageUrl ? "Changer l'image" : "Uploader une image"}
        />
        <button
          type="button"
          onClick={() => setShowLibrary(true)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Choisir dans la galerie
        </button>
      </div>

      {/* Library Modal */}
      {showLibrary && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowLibrary(false)}>
          <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Galerie d'images</h2>
                <p className="text-sm text-gray-600 mt-1">Sélectionnez une image existante</p>
              </div>
              <button
                onClick={() => setShowLibrary(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
                  ))}
                </div>
              ) : libraryImages.length === 0 ? (
                <div className="text-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500 mb-2">Aucune image dans la galerie</p>
                  <p className="text-sm text-gray-400">Uploadez d'abord des images</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {libraryImages.map((image) => (
                    <div
                      key={image.publicId}
                      onClick={() => handleSelectFromLibrary(image)}
                      className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer group border-2 transition-all ${
                        imagePublicId === image.publicId
                          ? 'border-blue-500 ring-4 ring-blue-200'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <OptimizedImage
                        src={image.url}
                        alt={image.publicId}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-white px-3 py-1.5 rounded-lg text-sm font-medium text-gray-900">
                            Sélectionner
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}