"use client";

import { useState } from "react";

const faqs = [
  {
    category: "Commandes",
    questions: [
      {
        q: "Comment passer une commande ?",
        a: "Parcourez notre catalogue, ajoutez les produits à votre panier, puis cliquez sur 'Passer la commande'. Suivez les instructions pour finaliser votre achat."
      },
      {
        q: "Puis-je modifier ou annuler ma commande ?",
        a: "Vous pouvez modifier ou annuler votre commande dans les 2 heures suivant la validation. Après ce délai, contactez notre service client."
      },
      {
        q: "Comment suivre ma commande ?",
        a: "Connectez-vous à votre compte et allez dans 'Mes commandes'. Vous y trouverez le statut et le suivi de chaque commande."
      },
    ]
  },
  {
    category: "Livraison",
    questions: [
      {
        q: "Quels sont les délais de livraison ?",
        a: "Les délais varient selon votre localisation : 2-3 jours ouvrés en France métropolitaine, 5-7 jours pour l'Europe, 10-15 jours pour l'international."
      },
      {
        q: "La livraison est-elle gratuite ?",
        a: "Oui ! La livraison est gratuite pour toutes les commandes supérieures à 50€ en France métropolitaine."
      },
      {
        q: "Livrez-vous à l'international ?",
        a: "Oui, nous livrons dans plus de 50 pays. Les frais de livraison internationaux varient selon la destination."
      },
    ]
  },
  {
    category: "Paiement",
    questions: [
      {
        q: "Quels moyens de paiement acceptez-vous ?",
        a: "Nous acceptons les cartes Visa, Mastercard, American Express, PayPal, et le paiement à la livraison."
      },
      {
        q: "Mon paiement est-il sécurisé ?",
        a: "Absolument. Nous utilisons le cryptage SSL 256-bit et sommes conformes aux normes PCI DSS pour garantir la sécurité de vos transactions."
      },
      {
        q: "Puis-je payer en plusieurs fois ?",
        a: "Oui, nous proposons le paiement en 3 ou 4 fois sans frais pour les commandes supérieures à 100€."
      },
    ]
  },
  {
    category: "Retours",
    questions: [
      {
        q: "Quelle est votre politique de retour ?",
        a: "Vous disposez de 30 jours après réception pour retourner un produit. Il doit être dans son état d'origine avec toutes les étiquettes."
      },
      {
        q: "Comment effectuer un retour ?",
        a: "Connectez-vous à votre compte, allez dans 'Mes commandes', sélectionnez la commande et cliquez sur 'Retourner un article'. Suivez les instructions."
      },
      {
        q: "Quand serai-je remboursé ?",
        a: "Le remboursement est effectué dans les 5-7 jours ouvrés après réception et vérification du produit retourné."
      },
    ]
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (key: string) => {
    const newOpen = new Set(openItems);
    if (newOpen.has(key)) {
      newOpen.delete(key);
    } else {
      newOpen.add(key);
    }
    setOpenItems(newOpen);
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Questions Fréquentes</h1>
          <p className="text-xl text-gray-600">
            Trouvez rapidement les réponses à vos questions
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher dans la FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* FAQ Categories */}
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Aucun résultat</h2>
            <p className="text-gray-600">
              Essayez avec d'autres mots-clés ou{" "}
              <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                contactez-nous
              </a>
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredFaqs.map((category, catIdx) => (
              <div key={catIdx}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{category.category}</h2>
                <div className="space-y-3">
                  {category.questions.map((faq, qIdx) => {
                    const key = `${catIdx}-${qIdx}`;
                    const isOpen = openItems.has(key);
                    
                    return (
                      <div key={key} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <button
                          onClick={() => toggleItem(key)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4 pt-0">
                            <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Still have questions */}
        <div className="mt-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Vous n'avez pas trouvé votre réponse ?</h2>
          <p className="text-white/90 mb-6">
            Notre équipe support est là pour vous aider
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Contactez-nous
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}