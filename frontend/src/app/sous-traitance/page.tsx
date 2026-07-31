'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import OpportuniteCard from '@/components/OpportuniteCard';
import CorridorCard from '@/components/CorridorCard';
import OffreServiceCard from '@/components/OffreServiceCard';
import OffreServiceForm from '@/components/OffreServiceForm';
import Button from '@/components/Button';
import toast from 'react-hot-toast';

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

interface Corridor {
  id: number;
  nom: string;
  description: string;
  points_depart_arrivee: string;
}

interface OffreService {
  id: number;
  pme: number;
  pme_nom?: string;
  corridor: number;
  corridor_nom?: string;
  description_service: string;
  contact_email: string;
  contact_telephone: string;
  date_ajout: string;
}

export default function SousTraitancePage() {
  const { isAuthenticated } = useAuth();
  const [opportunites, setOpportunites] = useState<Opportunite[]>([]);
  const [corridors, setCorridors] = useState<Corridor[]>([]);
  const [offres, setOffres] = useState<OffreService[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [oppRes, corrRes, offRes] = await Promise.all([
          api.get('/opportunites-sous-traitance/'),
          api.get('/corridors-logistiques/'),
          api.get('/offres-services/'),
        ]);
        setOpportunites(oppRes.data);
        setCorridors(corrRes.data);
        setOffres(offRes.data);
      } catch (err) {
        console.error('Erreur chargement données sous-traitance', err);
        toast.error('Impossible de charger les données');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOffreAjoutee = (nouvelleOffre: OffreService) => {
    setOffres([nouvelleOffre, ...offres]);
    setShowForm(false);
  };

  return (
    <div className="animate-fade-in space-y-12">
      {/* En-tête */}
      <div>
        <h1 className="text-4xl font-bold text-primary-900 mb-2">
          Sous-traitance & Corridors
        </h1>
        <div className="h-1 w-24 bg-gold-400 rounded-full mb-6" />
        <p className="text-lg text-primary-700/80 max-w-3xl">
          Marchés B2B/B2G, opportunités de sous-traitance dans le secteur minier, et solutions
          logistiques le long des corridors stratégiques du Grand Katanga.
        </p>
      </div>

      {/* Opportunités */}
      <section>
        <h2 className="text-2xl font-semibold text-primary-900 mb-6">
          Opportunités de sous-traitance
        </h2>
        {loading ? (
          <p className="text-primary-600">Chargement...</p>
        ) : opportunites.length === 0 ? (
          <p className="text-gray-500">Aucune opportunité publiée pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunites.map((opp) => (
              <OpportuniteCard key={opp.id} opportunite={opp} />
            ))}
          </div>
        )}
      </section>

      {/* Corridors */}
      <section>
        <h2 className="text-2xl font-semibold text-primary-900 mb-6">
          Corridors logistiques
        </h2>
        {loading ? (
          <p className="text-primary-600">Chargement...</p>
        ) : corridors.length === 0 ? (
          <p className="text-gray-500">Aucun corridor défini.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {corridors.map((corr) => (
              <CorridorCard key={corr.id} corridor={corr} />
            ))}
          </div>
        )}
      </section>

      {/* Offres de services */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-primary-900">
            Offres de services des PME
          </h2>
          {isAuthenticated && (
            <Button
              variant="secondary"
              onClick={() => setShowForm(!showForm)}
              icon={showForm ? undefined : undefined}
            >
              {showForm ? 'Fermer' : 'Proposer une offre'}
            </Button>
          )}
        </div>

        {showForm && (
          <div className="mb-8 glass-card p-6 rounded-2xl">
            <OffreServiceForm corridors={corridors} onSuccess={handleOffreAjoutee} />
          </div>
        )}

        {loading ? (
          <p className="text-primary-600">Chargement...</p>
        ) : offres.length === 0 ? (
          <p className="text-gray-500">Aucune offre de service pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offres.map((offre) => (
              <OffreServiceCard key={offre.id} offre={offre} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}