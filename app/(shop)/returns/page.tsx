import Link from "next/link";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Retours & Remboursements</h1>
          <p className="text-xl text-gray-600">
            Votre satisfaction est notre priorité
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
              title: "30 jours",
              description: "Pour retourner votre produit",
              color: "blue"
            },
            {
              icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              title: "Remboursement rapide",
              description: "Sous 5-7 jours ouvrés",
              color: "green"
            },
            {
              icon: "M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6",
              title: "Retour gratuit",
              description: "Frais de retour offerts",
              color: "purple"
            },
          ].map((benefit, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
              <div className={`w-16 h-16 bg-${benefit.color}-50 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-8 h-8 text-${benefit.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Return Process */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-12">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900">Comment retourner un produit ?</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "Connectez-vous à votre compte",
                  description: "Accédez à votre espace client et allez dans 'Mes commandes'"
                },
                {
                  step: 2,
                  title: "Sélectionnez la commande",
                  description: "Choisissez la commande contenant le produit à retourner"
                },
                {
                  step: 3,
                  title: "Initiez le retour",
                  description: "Cliquez sur 'Retourner un article' et sélectionnez le(s) produit(s)"
                },
                {
                  step: 4,
                  title: "Choisissez le motif",
                  description: "Indiquez la raison du retour (taille, défaut, changement d'avis, etc.)"
                },
                {
                  step: 5,
                  title: "Imprimez l'étiquette",
                  description: "Téléchargez et imprimez l'étiquette de retour prépayée"
                },
                {
                  step: 6,
                  title: "Expédiez le colis",
                  description: "Déposez votre colis dans un point relais ou programmez un enlèvement"
                },
              ].map((step) => (
                <div key={step.step} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conditions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Eligible Products */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Produits éligibles au retour
            </h3>
            <ul className="space-y-3">
              {[
                "Produits dans leur emballage d'origine",
                "Produits non utilisés et non portés",
                "Toutes les étiquettes encore attachées",
                "Accessoires et documentation inclus",
                "Produits achetés il y a moins de 30 jours",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Non-eligible Products */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Produits non éligibles
            </h3>
            <ul className="space-y-3">
              {[
                "Produits personnalisés ou gravés",
                "Produits d'hygiène (sous-vêtements, maillots de bain)",
                "Produits périssables (alimentation, cosmétiques ouverts)",
                "Cartes cadeaux et produits numériques",
                "Produits soldés ou en déstockage (sauf défaut)",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Refund Methods */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-12">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900">Modes de remboursement</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  method: "Remboursement sur le moyen de paiement initial",
                  delay: "5-7 jours ouvrés",
                  description: "Le montant est crédité sur votre carte bancaire ou compte PayPal"
                },
                {
                  method: "Avoir sur votre compte",
                  delay: "Immédiat",
                  description: "Recevez un coupon valable 1 an sur notre boutique"
                },
                {
                  method: "Échange de produit",
                  delay: "Dès réception",
                  description: "Échangez contre une autre taille ou couleur"
                },
                {
                  method: "Remboursement en magasin",
                  delay: "Immédiat",
                  description: "Si vous avez un point de vente physique près de chez vous"
                },
              ].map((refund, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{refund.method}</h4>
                  <p className="text-sm text-gray-600 mb-2">{refund.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-blue-600 font-medium">{refund.delay}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Besoin d'aide pour un retour ?</h2>
          <p className="text-white/90 mb-6">
            Notre équipe support est là pour vous accompagner
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contacter le support
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Voir la FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}