import Link from "next/link";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Informations de Livraison</h1>
          <p className="text-xl text-gray-600">
            Tout ce que vous devez savoir sur nos options de livraison
          </p>
        </div>

        {/* Delivery Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
              title: "Livraison Express",
              time: "24-48h",
              price: "9,99€",
              description: "Livraison le lendemain pour les commandes passées avant 14h",
              color: "blue"
            },
            {
              icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z",
              title: "Livraison Standard",
              time: "3-5 jours",
              price: "Gratuite*",
              description: "Livraison gratuite pour les commandes supérieures à 50€",
              color: "green"
            },
            {
              icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              title: "Livraison Internationale",
              time: "10-15 jours",
              price: "À partir de 19,99€",
              description: "Livraison dans plus de 50 pays à travers le monde",
              color: "purple"
            },
          ].map((option, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-shadow">
              <div className={`w-14 h-14 bg-${option.color}-50 rounded-xl flex items-center justify-center mb-4`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-7 h-7 text-${option.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={option.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{option.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Délai</span>
                  <span className="font-semibold text-gray-900">{option.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Prix</span>
                  <span className={`font-bold text-${option.color}-600`}>{option.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Zones */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-12">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900">Zones de livraison</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Zone</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pays</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Délai</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Prix</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { zone: "France Métropolitaine", countries: "France continentale", time: "2-5 jours", price: "Gratuite* / 4,99€" },
                    { zone: "DOM-TOM", countries: "Guadeloupe, Martinique, Réunion, etc.", time: "7-10 jours", price: "14,99€" },
                    { zone: "Europe", countries: "Allemagne, Belgique, Espagne, Italie, etc.", time: "5-7 jours", price: "9,99€" },
                    { zone: "Amérique du Nord", countries: "USA, Canada", time: "10-15 jours", price: "19,99€" },
                    { zone: "Asie", countries: "Chine, Japon, Corée, etc.", time: "12-18 jours", price: "24,99€" },
                    { zone: "Reste du monde", countries: "Autres pays", time: "15-20 jours", price: "29,99€" },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">{row.zone}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.countries}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.time}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              * Livraison gratuite en France métropolitaine pour les commandes supérieures à 50€
            </p>
          </div>
        </div>

        {/* Tracking */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-12">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">Suivi de commande en temps réel</h2>
              <p className="text-white/90 mb-4">
                Suivez votre commande à chaque étape. Vous recevrez des notifications par email et SMS à chaque changement de statut.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium">📦 Commande confirmée</span>
                <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium">🏭 En préparation</span>
                <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium">🚚 Expédiée</span>
                <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium">✅ Livrée</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions fréquentes</h2>
          <div className="space-y-4">
            {[
              {
                q: "Puis-je changer mon adresse de livraison après la commande ?",
                a: "Oui, vous pouvez modifier votre adresse de livraison dans les 2 heures suivant la commande. Après ce délai, contactez notre service client."
              },
              {
                q: "Que se passe-t-il si je ne suis pas présent lors de la livraison ?",
                a: "Le transporteur laissera un avis de passage. Vous pourrez alors reprogrammer une livraison ou retirer votre colis dans un point relais."
              },
              {
                q: "Livrez-vous les week-ends et jours fériés ?",
                a: "Non, les livraisons sont effectuées du lundi au samedi, hors jours fériés."
              },
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Vous avez d'autres questions ?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            Contactez-nous
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}