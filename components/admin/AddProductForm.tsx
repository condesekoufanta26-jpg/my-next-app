"use client";

import { useState } from "react";
import { createProductAction } from "@/app/actions/product.actions";
import ProductImageManager from "@/components/admin/ProductImageManager";

export default function AddProductForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [imagePublicId, setImagePublicId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleImageChange = (url: string, publicId: string) => {
    setImageUrl(url);
    setImagePublicId(publicId);
  };

  return (
    <form
      action={async (formData: FormData) => {
        setSubmitting(true);
        formData.set("imageUrl", imageUrl);
        formData.set("imagePublicId", imagePublicId);
        await createProductAction(formData);
        setSubmitting(false);
      }}
      className="space-y-6"
    >
      {/* Product Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom du produit *
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="Ex: iPhone 15 Pro"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prix (€) *
          </label>
          <input
            name="price"
            type="number"
            step="0.01"
            required
            placeholder="999.99"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock *
          </label>
          <input
            name="stock"
            type="number"
            required
            min="0"
            placeholder="50"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Catégorie
          </label>
          <select
            name="category"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="electronics">Électronique</option>
            <option value="clothing">Vêtements</option>
            <option value="home">Maison</option>
            <option value="sports">Sports</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          rows={4}
          placeholder="Décrivez votre produit en détail..."
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image du produit {imageUrl ? "✅" : ""}
        </label>
        <ProductImageManager
          imageUrl={imageUrl}
          imagePublicId={imagePublicId}
          onImageChange={handleImageChange}
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={submitting || !imageUrl}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Création en cours...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Ajouter le produit
            </>
          )}
        </button>
        {!imageUrl && (
          <p className="text-sm text-orange-600">⚠️ Veuillez ajouter une image</p>
        )}
      </div>
    </form>
  );
}