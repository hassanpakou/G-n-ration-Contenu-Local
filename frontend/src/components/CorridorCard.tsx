interface Corridor {
  id: number;
  nom: string;
  description: string;
  points_depart_arrivee: string;
}

export default function CorridorCard({ corridor }: { corridor: Corridor }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-2">{corridor.nom}</h3>
      <p className="text-sm text-blue-700 mb-2">{corridor.points_depart_arrivee}</p>
      <p className="text-gray-600">{corridor.description}</p>
    </div>
  );
}