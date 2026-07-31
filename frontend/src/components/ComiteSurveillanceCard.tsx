interface Comite {
  id: number;
  nom_organisation: string;
  description: string;
  logo: string | null;
  representant_nom: string;
  representant_email: string;
}

export default function ComiteSurveillanceCard({ comite }: { comite: Comite }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
          {comite.logo ? (
            <img src={comite.logo} alt={comite.nom_organisation} className="w-full h-full object-contain" />
          ) : (
            <span className="text-xl font-bold text-gray-500">{comite.nom_organisation.charAt(0)}</span>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{comite.nom_organisation}</h3>
          <p className="text-sm text-gray-500">Représentant : {comite.representant_nom}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-2">{comite.description}</p>
      <a href={`mailto:${comite.representant_email}`} className="text-blue-600 text-sm hover:underline">
        Contacter le représentant
      </a>
    </div>
  );
}