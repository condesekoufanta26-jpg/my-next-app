export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Conditions Générales de Vente</h1>
          <p className="text-gray-600">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 1 - Objet</h2>
            <p className="text-gray-700 leading-relaxed">
              Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre E-Commerce (ci-après "le Vendeur") et ses clients (ci-après "le Client"), les deux parties les acceptant sans réserve. Ces conditions générales de vente prévaudront sur toutes autres conditions figurant dans tout autre document.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 2 - Prix</h2>
            <p className="text-gray-700 leading-relaxed">
              Les prix de nos produits sont indiqués en euros toutes taxes comprises (TTC). Le Vendeur se réserve le droit de modifier ses prix à tout moment mais s'engage à appliquer les tarifs en vigueur indiqués au moment de la commande.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 3 - Commande</h2>
            <p className="text-gray-700 mb-4">
              Le Client peut passer commande via notre site internet. Le processus de commande comprend les étapes suivantes :
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Sélection des produits et ajout au panier</li>
              <li>Validation du panier</li>
              <li>Identification ou création de compte</li>
              <li>Choix du mode de livraison</li>
              <li>Choix du mode de paiement</li>
              <li>Validation et paiement de la commande</li>
              <li>Confirmation de commande par email</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 4 - Paiement</h2>
            <p className="text-gray-700 mb-4">
              Le paiement s'effectue par les moyens suivants :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Carte bancaire (Visa, Mastercard, American Express)</li>
              <li>PayPal</li>
              <li>Paiement à la livraison (espèces uniquement)</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Le paiement est sécurisé par notre prestataire de paiement qui utilise la technologie de cryptage SSL.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 5 - Livraison</h2>
            <p className="text-gray-700 leading-relaxed">
              Les produits sont livrés à l'adresse de livraison indiquée lors de la commande. Les délais de livraison sont indicatifs et donnés à titre informatif. Le Vendeur ne peut être tenu responsable des retards de livraison dus au transporteur.
            </p>
            <p className="text-gray-700 mt-4">
              La livraison est gratuite pour toute commande supérieure à 50€ en France métropolitaine.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 6 - Droit de rétractation</h2>
            <p className="text-gray-700 leading-relaxed">
              Conformément à l'article L.221-18 du Code de la consommation, le Client dispose d'un délai de 14 jours à compter de la réception des produits pour exercer son droit de rétractation, sans avoir à motiver sa décision ni à supporter d'autres frais que ceux prévus aux articles L.221-23 à L.221-25.
            </p>
            <p className="text-gray-700 mt-4">
              Le produit doit être retourné dans son état d'origine, complet, avec toutes les étiquettes et emballages, et en parfait état de revente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 7 - Remboursement</h2>
            <p className="text-gray-700 leading-relaxed">
              En cas d'exercice du droit de rétractation ou de retour de produit, le remboursement sera effectué dans un délai de 14 jours à compter de la réception du produit retourné, par le même moyen de paiement que celui utilisé pour la commande.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 8 - Garantie</h2>
            <p className="text-gray-700 leading-relaxed">
              Tous les produits bénéficient de la garantie légale de conformité (articles L.217-4 et suivants du Code de la consommation) et de la garantie des vices cachés (articles 1641 et suivants du Code civil).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 9 - Responsabilité</h2>
            <p className="text-gray-700 leading-relaxed">
              Le Vendeur ne peut être tenu responsable de l'inexécution du contrat en cas de force majeure, de perturbation ou grève totale ou partielle des services postaux et moyens de transport et/ou communications, inondation, incendie.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 10 - Propriété intellectuelle</h2>
            <p className="text-gray-700 leading-relaxed">
              L'ensemble du site internet (structure, textes, images, logos, marques, etc.) est la propriété exclusive du Vendeur ou de ses partenaires. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site est interdite sans autorisation écrite préalable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 11 - Données personnelles</h2>
            <p className="text-gray-700 leading-relaxed">
              Les données personnelles collectées sur le site sont traitées conformément à notre Politique de Confidentialité. Le Client dispose d'un droit d'accès, de rectification, de suppression et de portabilité de ses données.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 12 - Droit applicable</h2>
            <p className="text-gray-700 leading-relaxed">
              Les présentes CGV sont soumises au droit français. En cas de litige, et après échec de toute tentative de recherche d'une solution amiable, les tribunaux français seront seuls compétents.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Pour toute question relative aux présentes CGV, vous pouvez nous contacter :
            </p>
            <div className="mt-4 bg-gray-50 rounded-lg p-6">
              <p className="text-gray-900 font-semibold mb-2">E-Commerce</p>
              <p className="text-gray-700">Email : <a href="mailto:legal@ecommerce.com" className="text-blue-600 hover:text-blue-700">legal@ecommerce.com</a></p>
              <p className="text-gray-700">Téléphone : +33 1 23 45 67 89</p>
              <p className="text-gray-700">Adresse : 123 Rue de la Paix, 75001 Paris, France</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}