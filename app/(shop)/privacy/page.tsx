export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Politique de Confidentialité</h1>
          <p className="text-gray-600">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Chez E-Commerce, nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web et nos services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Données collectées</h2>
            <p className="text-gray-700 mb-4">Nous collectons les types de données suivants :</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Informations personnelles :</strong> Nom, prénom, adresse email, numéro de téléphone</li>
              <li><strong>Informations de livraison :</strong> Adresse postale complète</li>
              <li><strong>Informations de paiement :</strong> Numéro de carte bancaire (crypté), date d'expiration, CVV</li>
              <li><strong>Données de navigation :</strong> Adresse IP, type de navigateur, pages visitées, durée de visite</li>
              <li><strong>Cookies :</strong> Cookies essentiels, analytiques et de personnalisation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Utilisation des données</h2>
            <p className="text-gray-700 mb-4">Vos données sont utilisées pour :</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Traiter et livrer vos commandes</li>
              <li>Gérer votre compte client</li>
              <li>Vous envoyer des communications marketing (avec votre consentement)</li>
              <li>Améliorer nos services et votre expérience utilisateur</li>
              <li>Assurer la sécurité de notre plateforme</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Partage des données</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos informations avec :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
              <li>Nos partenaires de livraison (pour livrer vos commandes)</li>
              <li>Nos processeurs de paiement (pour traiter vos transactions)</li>
              <li>Les autorités compétentes (si requis par la loi)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Sécurité des données</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
              <li>Cryptage SSL/TLS 256-bit pour toutes les transactions</li>
              <li>Conformité PCI DSS pour les données de paiement</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Audits de sécurité réguliers</li>
              <li>Sauvegardes quotidiennes chiffrées</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Vos droits (RGPD)</h2>
            <p className="text-gray-700 mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données</li>
              <li><strong>Droit de rectification :</strong> Corriger des données inexactes</li>
              <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données</li>
              <li><strong>Droit à la limitation :</strong> Restreindre le traitement de vos données</li>
              <li><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré</li>
              <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Pour exercer ces droits, contactez-nous à{" "}
              <a href="mailto:privacy@ecommerce.com" className="text-blue-600 hover:text-blue-700 font-medium">
                privacy@ecommerce.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez gérer vos préférences de cookies à tout moment via les paramètres de votre navigateur ou notre centre de préférences de cookies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Conservation des données</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous conservons vos données personnelles uniquement aussi longtemps que nécessaire pour les finalités pour lesquelles elles ont été collectées, ou pour respecter nos obligations légales. Les données de commande sont conservées pendant 10 ans conformément aux obligations comptables.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modifications</h2>
            <p className="text-gray-700 leading-relaxed">
              Nous pouvons mettre à jour cette politique de confidentialité. Vous serez informé de tout changement significatif par email ou via une notification sur notre site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Pour toute question concernant cette politique de confidentialité ou le traitement de vos données, contactez notre DPO (Délégué à la Protection des Données) :
            </p>
            <div className="mt-4 bg-gray-50 rounded-lg p-6">
              <p className="text-gray-900 font-semibold mb-2">E-Commerce - Service Protection des Données</p>
              <p className="text-gray-700">Email : <a href="mailto:privacy@ecommerce.com" className="text-blue-600 hover:text-blue-700">privacy@ecommerce.com</a></p>
              <p className="text-gray-700">Adresse : 123 Rue de la Paix, 75001 Paris, France</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}