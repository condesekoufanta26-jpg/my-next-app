"use client";

interface ImageGalleryProps {
  folder?: string;
  maxResults?: number;
  title?: string;
}

export default function ImageGallery({ 
  title = "Gallery" 
}: ImageGalleryProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <p className="text-gray-500">No images available yet.</p>
    </div>
  );
}