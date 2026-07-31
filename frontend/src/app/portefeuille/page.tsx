'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import DefiCard from '@/components/DefiCard';
import SolutionCard from '@/components/SolutionCard';
import SoumettreSolutionForm from '@/components/SoumettreSolutionForm';

interface EntreprisePublique {
  id: number;
  nom: string;
  sigle: string;
  description: string;
  secteur: string;
}

interface DefiTechnologique {
  id: number;
  entreprise: number; // ID de l'entreprise
  entreprise_detail?: EntreprisePublique;
  titre: string;
  description: string;
  domaine: string;
  statut: string;
  date_limite: string;
  budget_indicatif: string;
}

interface SolutionLocale {
  id: number;
  defi: number;
  defi_detail?: DefiTechnologique;
  titre_solution: string;
  description: string;
  pme: number | null;
  candidat: number | null;
  contact_nom: string;
  statut: string;
  date_soumission: string;
}

export default function PortefeuillePage() {
  const { isAuthenticated } = useAuth();
  const [defis, setDefis] = useState<DefiTechnologique[]>([]);
  const [solutions, setSolutions] = useState<SolutionLocale[]>([]);
  const [entreprises, setEntreprises] = useState<EntreprisePublique[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [defisRes, solutionsRes, entreprisesRes] = await Promise.all([
          api.get('/defis-technologiques/'),
          api.get('/solutions-locales/'),
          api.get('/entreprises-publiques/'),
        ]);
        setDefis(defisRes.data);
        setSolutions(solutionsRes.data);
        setEntreprises(entreprisesRes.data);
      } catch (err) {
        console.error('Erreur chargement données portefeuille', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fonction pour retrouver le sigle de l'entreprise à partir de son ID
  const getEntrepriseByDefi = (defiId: number, entrepriseId: number) => {
    return entreprises.find((e) => e.id === entrepriseId)?.sigle || 'Entreprise';
  };

  return (
    <div>
      <section className="mb-12 animate-fade-in">
        <h1 className="text-3xl font-bold mb-4">Espace Portefeuille & R&D</h1>
        <p className="text-gray-600 mb-6">
          Connectez-vous aux défis technologiques des entreprises publiques (SNEL, REGIDESO, ONATRA, GÉCAMINES…)
          et découvrez les solutions innovantes portées par nos jeunes diplômés et PME.
        </p>
      </section>

      {/* Section Défis Technologiques */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Défis Technologiques</h2>
          {isAuthenticated && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {showForm ? 'Fermer' : 'Proposer une solution'}
            </button>
          )}
        </div>

        {loading ? (
          <p>Chargement des défis...</p>
        ) : defis.length === 0 ? (
          <p className="text-gray-500">Aucun défi technologique pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {defis.map((defi) => (
              <DefiCard key={defi.id} defi={defi} entrepriseSigle={getEntrepriseByDefi(defi.id, defi.entreprise)} />
            ))}
          </div>
        )}
      </section>

      {/* Formulaire de soumission de solution (affiché si showForm) */}
      {showForm && isAuthenticated && (
        <section className="mb-12">
          <SoumettreSolutionForm defis={defis} onSuccess={() => setShowForm(false)} />
        </section>
      )}

      {/* Section Vitrine des Solutions Locales */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Vitrine des Solutions Locales</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : solutions.length === 0 ? (
          <p className="text-gray-500">Aucune solution soumise pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((sol) => (
              <SolutionCard key={sol.id} solution={sol} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}