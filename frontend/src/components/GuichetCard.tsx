interface Guichet {
  id: number;
  nom: string;
  description: string;
  actif: boolean;
}

const guichetLabels: Record<string, string> = {
  soutenir_projet: 'Soutenir un Projet (Amorçage)',
  investir_pme: 'Investir dans une sPME (Capital-Développement)',
  seed_fund: 'GCL Seed Fund (Grands Bailleurs)',
};

export default function GuichetCard({ guichet }: { guichet: Guichet }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <div className="text-3xl mb-3">
        {guichet.nom === 'soutenir_projet' ? '🔬' : guichet.nom === 'investir_pme' ? '🏢' : '🌍'}
      </div>
      <h3 className="text-lg font-semibold mb-2">{guichetLabels[guichet.nom] || guichet.nom}</h3>
      <p className="text-gray-600 text-sm">{guichet.description}</p>
    </div>
  );
}