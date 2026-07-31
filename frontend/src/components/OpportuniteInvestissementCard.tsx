interface OpportuniteInvestissement {
  id: number;
  guichet: number;
  titre: string;
  description: string;
  montant_recherche: string;
  candidat: number | null;
  pme: number | null;
  pitch_deck: string | null;
  date_creation: string;
  actif: boolean;
}

interface Guichet {
  id: number;
  nom: string;
  description: string;
}

const guichetLabels: Record<string, string> = {
  soutenir_projet: 'Amorçage',
  investir_pme: 'Capital-Développement',
  seed_fund: 'Seed Fund',
};

export default function OpportuniteInvestissementCard({
  opportunite,
  guichets,
}: {
  opportunite: OpportuniteInvestissement;
  guichets: Guichet[];
}) {
  const guichet = guichets.find((g) => g.id === opportunite.guichet);
  const label = guichet ? guichetLabels[guichet.nom] || guichet.nom : 'Guichet inconnu';

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{label}</span>
        <span className="text-sm text-gray-500">
          {new Date(opportunite.date_creation).toLocaleDateString('fr-FR')}
        </span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{opportunite.titre}</h3>
      <p className="text-gray-700 mb-3 line-clamp-3">{opportunite.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-green-700 font-bold">
          {Number(opportunite.montant_recherche).toLocaleString()} USD
        </span>
        {opportunite.pitch_deck && (
          <a
            href={opportunite.pitch_deck}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            Pitch Deck
          </a>
        )}
      </div>
    </div>
  );
}