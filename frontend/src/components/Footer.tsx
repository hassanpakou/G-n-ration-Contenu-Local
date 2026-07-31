import { Mail, Phone, MapPin, CalendarDays, GraduationCap, Briefcase } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Présentation */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-semibold">Génération Contenu Local</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Initiative conjointe YouthConnekt RDC, Hope Land Congo & CNJ,
            sous l’égide du PNUD.
          </p>
        </div>

        {/* Liens rapides */}
        <div>
          <h4 className="text-md font-semibold mb-3 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-orange-400" />
            Liens rapides
          </h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <a href="/programme" className="hover:text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Programme
              </a>
            </li>
            <li>
              <a href="/campus-tour" className="hover:text-white flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Campus Tour
              </a>
            </li>
            <li>
              <a href="/investir" className="hover:text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Investir
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-md font-semibold mb-3 flex items-center gap-2">
            <Phone className="w-5 h-5 text-orange-400" />
            Contact
          </h4>
          <div className="space-y-3 text-sm text-gray-400">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-400" />
              contact@hopelandcongo.org
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-400" />
              +243 89 01 77 601
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-400" />
              Kinshasa, RDC
            </p>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        © 2026 Génération Contenu Local – Tous droits réservés.
      </div>
    </footer>
  );
}