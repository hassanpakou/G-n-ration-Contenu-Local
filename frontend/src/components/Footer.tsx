export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Génération Contenu Local</h3>
          <p className="text-gray-400 text-sm">
            Initiative conjointe YouthConnekt RDC, Hope Land Congo & CNJ, sous l’égide du PNUD.
          </p>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-3">Liens rapides</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/programme" className="hover:text-white">Programme</a></li>
            <li><a href="/campus-tour" className="hover:text-white">Campus Tour</a></li>
            <li><a href="/investir" className="hover:text-white">Investir</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-3">Contact</h4>
          <p className="text-gray-400 text-sm">Email : contact@hopelandcongo.org</p>
          <p className="text-gray-400 text-sm">Tél : +243 81 170 2070</p>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        © 2026 Génération Contenu Local – Tous droits réservés.
      </div>
    </footer>
  );
}