'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import DefiCard from '@/components/DefiCard';
import SolutionCard from '@/components/SolutionCard';
import SoumettreSolutionForm from '@/components/SoumettreSolutionForm';
import Button from '@/components/Button';

interface EntreprisePublique {
  id: number;
  nom: string;
  sigle: string;
  description: string;
  secteur: string;
}

interface DefiTechnologique {
  id: number;
  entreprise: number;
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

  const getEntrepriseByDefi = (defiId: number, entrepriseId: number) => {
    return entreprises.find((e) => e.id === entrepriseId)?.sigle || 'Entreprise';
  };

  return (
    <div className="animate-fade-in space-y-12">
      {/* En-tête */}
      <div>
        <h1 className="text-4xl font-bold text-primary-900 mb-2">
          Espace Portefeuille & R&D
        </h1>
        <div className="h-1 w-24 bg-gold-400 rounded-full mb-6" />
        <p className="text-lg text-primary-700/80 max-w-3xl">
          Connectez-vous aux défis technologiques des entreprises publiques (SNEL, REGIDESO, ONATRA, GÉCAMINES…)
          et découvrez les solutions innovantes portées par nos jeunes diplômés et PME.
        </p>
      </div>

      {/* Défis */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-primary-900">
            Défis Technologiques
          </h2>
          {isAuthenticated && (
            <Button
              variant="secondary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Fermer' : 'Proposer une solution'}
            </Button>
          )}
        </div>

        {loading ? (
          <p className="text-primary-600">Chargement des défis...</p>
        ) : defis.length === 0 ? (
          <p className="text-gray-500">Aucun défi technologique pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {defis.map((defi) => (
              <DefiCard
                key={defi.id}
                defi={defi}
                entrepriseSigle={getEntrepriseByDefi(defi.id, defi.entreprise)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Formulaire */}
      {showForm && isAuthenticated && (
        <section className="glass-card p-6 rounded-2xl">
          <SoumettreSolutionForm defis={defis} onSuccess={() => setShowForm(false)} />
        </section>
      )}

      {/* Solutions */}
      <section>
        <h2 className="text-2xl font-semibold text-primary-900 mb-6">
          Vitrine des Solutions Locales
        </h2>
        {loading ? (
          <p className="text-primary-600">Chargement...</p>
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