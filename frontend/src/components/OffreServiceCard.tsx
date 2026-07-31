interface OffreService {
  id: number;
  pme_nom?: string;
  corridor_nom?: string;
  description_service: string;
  contact_email: string;
  contact_telephone: string;
  date_ajout: string;
}

export default function OffreServiceCard({ offre }: { offre: OffreService }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-1">{offre.pme_nom || 'PME inconnue'}</h3>
      <p className="text-sm text-gray-500 mb-2">
        Corridor : {offre.corridor_nom || 'Non spécifié'}
      </p>
      <p className="text-gray-700 mb-3">{offre.description_service}</p>
      <div className="text-sm text-gray-600">
        <p>Contact : {offre.contact_email}</p>
        <p>Tél : {offre.contact_telephone}</p>
      </div>
    </div>
  );
}