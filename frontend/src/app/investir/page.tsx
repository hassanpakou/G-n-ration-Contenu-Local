'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import GuichetCard from '@/components/GuichetCard';
import OpportuniteInvestissementCard from '@/components/OpportuniteInvestissementCard';
import NouvelleOpportuniteForm from '@/components/NouvelleOpportuniteForm';
import Button from '@/components/Button';
import { toast } from 'react-hot-toast';

interface Guichet {
  id: number;
  nom: string;
  description: string;
  actif: boolean;
}

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

export default function InvestirPage() {
  const { isAuthenticated } = useAuth();
  const [guichets, setGuichets] = useState<Guichet[]>([]);
  const [opportunites, setOpportunites] = useState<OpportuniteInvestissement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [guichetsRes, oppRes] = await Promise.all([
          api.get('/guichets-investissement/'),
          api.get('/opportunites-investissement/'),
        ]);
        setGuichets(guichetsRes.data);
        setOpportunites(oppRes.data.filter((o: OpportuniteInvestissement) => o.actif));
      } catch (err) {
        console.error('Erreur chargement données investissement', err);
        toast.error('Impossible de charger les données');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleNouvelleOpportunite = (opp: OpportuniteInvestissement) => {
    setOpportunites([opp, ...opportunites]);
    setShowForm(false);
  };

  return (
    <div className="animate-fade-in space-y-12">
      {/* En-tête */}
      <div>
        <h1 className="text-4xl font-bold text-primary-900 mb-2">
          Investir & Soutenir la Jeunesse
        </h1>
        <div className="h-1 w-24 bg-gold-400 rounded-full mb-6" />
        <p className="text-lg text-primary-700/80 max-w-3xl">
          Trois guichets pour financer l'innovation congolaise : du prototypage au
          capital-développement, en passant par le fonds institutionnel GCL Seed Fund.
        </p>
      </div>

      {/* Guichets */}
      <section>
        <h2 className="text-2xl font-semibold text-primary-900 mb-6">
          Nos Guichets d'Investissement
        </h2>
        {loading ? (
          <p className="text-primary-600">Chargement...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guichets.map((guichet) => (
              <GuichetCard key={guichet.id} guichet={guichet} />
            ))}
          </div>
        )}
      </section>

      {/* Bouton soumettre */}
      {isAuthenticated && (
        <div className="flex justify-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Fermer le formulaire' : 'Soumettre un projet à financer'}
          </Button>
        </div>
      )}

      {showForm && (
        <section className="glass-card p-6 rounded-2xl">
          <NouvelleOpportuniteForm guichets={guichets} onSuccess={handleNouvelleOpportunite} />
        </section>
      )}

      {/* Projets */}
      <section>
        <h2 className="text-2xl font-semibold text-primary-900 mb-6">
          Projets en recherche de financement
        </h2>
        {loading ? (
          <p className="text-primary-600">Chargement...</p>
        ) : opportunites.length === 0 ? (
          <p className="text-gray-500">Aucun projet pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunites.map((opp) => (
              <OpportuniteInvestissementCard
                key={opp.id}
                opportunite={opp}
                guichets={guichets}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}