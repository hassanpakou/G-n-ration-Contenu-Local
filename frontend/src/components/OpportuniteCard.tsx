import Card from './Card';

interface Opportunite {
  id: number;
  titre: string;
  description: string;
  secteur: string;
  entreprise_donneur_ordre: string;
  date_limite: string;
  budget_indicatif: string;
  contact_email: string;
}

export default function OpportuniteCard({ opportunite }: { opportunite: Opportunite }) {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-2">{opportunite.titre}</h3>
      <p className="text-sm text-gray-500 mb-2">
        {opportunite.entreprise_donneur_ordre} — {opportunite.secteur}
      </p>
      <p className="text-gray-700 mb-3 line-clamp-3">{opportunite.description}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="text-red-600 font-medium">
          Avant le {new Date(opportunite.date_limite).toLocaleDateString('fr-FR')}
        </span>
        {opportunite.budget_indicatif && (
          <span className="text-gray-600">{Number(opportunite.budget_indicatif).toLocaleString()} USD</span>
        )}
      </div>
    </Card>
  );
}