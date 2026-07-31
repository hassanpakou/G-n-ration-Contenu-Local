import { Mail, Phone, MapPin, CalendarDays, GraduationCap, Briefcase } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-gold-400" />
            <h3 className="text-lg font-semibold">Génération Contenu Local</h3>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Initiative conjointe YouthConnekt RDC, Hope Land Congo & CNJ,
            sous l’égide du PNUD.
          </p>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-3 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-gold-400" />
            Liens rapides
          </h4>
          <ul className="space-y-3 text-sm">
            <li><a href="/programme" className="text-white/70 hover:text-gold-400 flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Programme</a></li>
            <li><a href="/campus-tour" className="text-white/70 hover:text-gold-400 flex items-center gap-2"><MapPin className="w-4 h-4" /> Campus Tour</a></li>
            <li><a href="/investir" className="text-white/70 hover:text-gold-400 flex items-center gap-2"><Briefcase className="w-4 h-4" /> Investir</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-3 flex items-center gap-2">
            <Phone className="w-5 h-5 text-gold-400" />
            Contact
          </h4>
          <div className="space-y-3 text-sm text-white/70">
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-gold-400" /> contact@hopelandcongo.org</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gold-400" /> +243 89 01 77 601</p>
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold-400" /> Kinshasa, RDC</p>
          </div>
        </div>
      </div>
      <div className="text-center text-white/50 text-sm mt-8 border-t border-white/10 pt-4">
        © 2026 Génération Contenu Local – Tous droits réservés.
      </div>
    </footer>
  );
}