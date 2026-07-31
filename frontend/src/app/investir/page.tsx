'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import GuichetCard from '@/components/GuichetCard';
import OpportuniteInvestissementCard from '@/components/OpportuniteInvestissementCard';
import NouvelleOpportuniteForm from '@/components/NouvelleOpportuniteForm';
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
  const { isAuthenticated, user } = useAuth();
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
    <div>
      <section className="mb-12 animate-fade-in">
        <h1 className="text-3xl font-bold mb-4">Investir & Soutenir la Jeunesse</h1>
        <p className="text-gray-600">
          Trois guichets pour financer l&apos;innovation congolaise : du prototypage au
          capital-développement, en passant par le fonds institutionnel GCL Seed Fund.
        </p>
      </section>

      {/* Affichage des guichets */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Nos Guichets d&apos;Investissement</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guichets.map((guichet) => (
              <GuichetCard key={guichet.id} guichet={guichet} />
            ))}
          </div>
        )}
      </section>

      {/* Bouton pour soumettre un projet (si authentifié) */}
      {isAuthenticated && (
        <div className="mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >
            {showForm ? 'Fermer le formulaire' : 'Soumettre un projet à financer'}
          </button>
          {showForm && (
            <div className="mt-6">
              <NouvelleOpportuniteForm guichets={guichets} onSuccess={handleNouvelleOpportunite} />
            </div>
          )}
        </div>
      )}

      {/* Liste des opportunités */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Projets en recherche de financement</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : opportunites.length === 0 ? (
          <p className="text-gray-500">Aucun projet pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunites.map((opp) => (
              <OpportuniteInvestissementCard key={opp.id} opportunite={opp} guichets={guichets} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}