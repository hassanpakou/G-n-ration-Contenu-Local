import Card from './Card';

interface Solution {
  id: number;
  titre_solution: string;
  description: string;
  pme: number | null;
  candidat: number | null;
  contact_nom: string;
  statut: string;
  date_soumission: string;
}

export default function SolutionCard({ solution }: { solution: Solution }) {
  const statutColor =
    solution.statut === 'acceptee'
      ? 'bg-green-100 text-green-800'
      : solution.statut === 'en_evaluation'
      ? 'bg-blue-100 text-blue-800'
      : 'bg-gray-100 text-gray-800';

  return (
    <Card>
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium text-gray-500">
          {solution.contact_nom || (solution.pme ? 'PME' : 'Candidat')}
        </span>
        <span className={`text-xs px-2 py-1 rounded ${statutColor}`}>{solution.statut}</span>
      </div>
      <h3 className="text-lg font-semibold mb-1">{solution.titre_solution}</h3>
      <p className="text-gray-600 mb-3 line-clamp-3">{solution.description}</p>
      <p className="text-xs text-gray-400">
        Soumise le {new Date(solution.date_soumission).toLocaleDateString('fr-FR')}
      </p>
    </Card>
  );
}