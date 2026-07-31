import Card from './Card';

interface Defi {
  id: number;
  titre: string;
  description: string;
  domaine: string;
  statut: string;
  date_limite: string;
  budget_indicatif: string;
}

interface DefiCardProps {
  defi: Defi;
  entrepriseSigle: string;
}

export default function DefiCard({ defi, entrepriseSigle }: DefiCardProps) {
  const statutColor =
    defi.statut === 'ouvert'
      ? 'bg-green-100 text-green-800'
      : defi.statut === 'en_cours'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-gray-100 text-gray-800';

  return (
    <Card>
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-mono text-primary-700">{entrepriseSigle}</span>
        <span className={`text-xs px-2 py-1 rounded ${statutColor}`}>{defi.statut}</span>
      </div>
      <h3 className="text-lg font-semibold mb-1">{defi.titre}</h3>
      <p className="text-gray-600 mb-3 line-clamp-3">{defi.description}</p>
      <div className="flex flex-wrap gap-2 text-sm text-gray-500">
        <span>Domaine : {defi.domaine}</span>
        {defi.date_limite && <span>Date limite : {new Date(defi.date_limite).toLocaleDateString('fr-FR')}</span>}
        {defi.budget_indicatif && <span>Budget indicatif : {Number(defi.budget_indicatif).toLocaleString()} USD</span>}
      </div>
    </Card>
  );
}