"use client";

import { registerAction } from "@/app/actions/auth.actions";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await registerAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">eCommerce</h1>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mb-6 border border-red-100">
            {error}
          </div>
        )}

        {/* Form */}
        <form action={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <input
            name="name"
            type="text"
            required
            placeholder="Nom et prénom"
            className="w-full px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
          />

          {/* Website Name */}
          <input
            name="website"
            type="text"
            placeholder="Nom du site web"
            className="w-full px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
          />

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="email"
              type="email"
              required
              placeholder="E-mail"
              className="w-full px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            />
            <div className="relative">
              <input
                name="phone"
                type="tel"
                placeholder="Numéro de téléphone"
                className="w-full px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white pl-12"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                +52
              </span>
            </div>
          </div>

          {/* Country and Language */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="country"
              className="w-full px-4 py-3 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white appearance-none cursor-pointer"
            >
              <option value="">Pays</option>
              <option value="FR">France</option>
              <option value="BE">Belgique</option>
              <option value="CH">Suisse</option>
              <option value="CA">Canada</option>
              <option value="MX">Mexique</option>
              <option value="US">États-Unis</option>
              <option value="GB">Royaume-Uni</option>
              <option value="DE">Allemagne</option>
              <option value="ES">Espagne</option>
              <option value="IT">Italie</option>
              <option value="RU">Russie</option>
              <option value="CN">Chine</option>
              <option value="JP">Japon</option>
              <option value="BR">Brésil</option>
              <option value="AU">Australie</option>
            </select>
            <select
              name="language"
              className="w-full px-4 py-3 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white appearance-none cursor-pointer"
            >
              <option value="">Langue</option>
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
              <option value="pt">Português</option>
              <option value="ru">Русский</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
              <option value="ar">العربية</option>
              <option value="hi">हिन्दी</option>
              <option value="tr">Türkçe</option>
              <option value="nl">Nederlands</option>
              <option value="pl">Polski</option>
              <option value="sv">Svenska</option>
              <option value="da">Dansk</option>
              <option value="fi">Suomi</option>
              <option value="no">Norsk</option>
              <option value="cs">Čeština</option>
              <option value="el">Ελληνικά</option>
              <option value="he">עברית</option>
              <option value="th">ไทย</option>
              <option value="vi">Tiếng Việt</option>
              <option value="id">Bahasa Indonesia</option>
            </select>
          </div>

          {/* Password */}
          <input
            name="password"
            type="password"
            required
            minLength={8}
            placeholder="Mot de passe"
            className="w-full px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-800 hover:bg-purple-900 disabled:opacity-50 disabled:cursor-not-allowed text-white text-base font-semibold py-4 rounded-lg transition-colors mt-6"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5 inline mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Création du compte...
              </>
            ) : (
              "Démarrez maintenant"
            )}
          </button>
        </form>

        {/* Terms */}
        <p className="text-center text-xs text-gray-600 mt-6">
          En cliquant sur <strong>Démarrer maintenant</strong>, vous acceptez nos{" "}
          <Link href="/terms" className="text-purple-700 hover:underline">
            Conditions d'Abonnement
          </Link>{" "}
          et{" "}
          <Link href="/privacy" className="text-purple-700 hover:underline">
            Politique vie privée
          </Link>
        </p>
      </div>
    </div>
  );
}