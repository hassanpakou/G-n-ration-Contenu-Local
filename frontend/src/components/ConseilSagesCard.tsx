interface Membre {
  id: number;
  nom: string;
  titre: string;
  organisation: string;
  photo: string | null;
  biographie: string;
}

export default function ConseilSagesCard({ membre }: { membre: Membre }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
      <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center text-2xl font-bold text-gray-600">
        {membre.photo ? (
          <img src={membre.photo} alt={membre.nom} className="w-full h-full object-cover rounded-full" />
        ) : (
          membre.nom.charAt(0)
        )}
      </div>
      <h3 className="text-lg font-semibold">{membre.nom}</h3>
      <p className="text-sm text-blue-700">{membre.titre}</p>
      {membre.organisation && <p className="text-xs text-gray-500">{membre.organisation}</p>}
      <p className="text-gray-600 mt-2 text-sm line-clamp-4">{membre.biographie}</p>
    </div>
  );
}