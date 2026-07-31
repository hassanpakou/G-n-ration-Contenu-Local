'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Hub } from '@/types';
import HubCard from '@/components/HubCard';
import CampusSubmissionForm from '@/components/CampusSubmissionForm';
import Button from '@/components/Button';

export default function CampusTourPage() {
  const { isAuthenticated } = useAuth();
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHubs = async () => {
      try {
        const res = await api.get('/hubs/');
        setHubs(res.data);
      } catch (err) {
        console.error('Erreur chargement hubs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHubs();
  }, []);

  return (
    <div className="animate-fade-in space-y-12">
      {/* Concept */}
      <div>
        <h1 className="text-4xl font-bold text-primary-900 mb-2">
          Campus Tour & Mémoire-Projet
        </h1>
        <div className="h-1 w-24 bg-gold-400 rounded-full mb-6" />
        <div className="glass-card p-6 rounded-2xl">
          <p className="text-primary-800 leading-relaxed">
            La réforme historique de l’Enseignement Supérieur et Universitaire (ESU) transforme
            les mémoires de fin d’études en véritables business plans industriels. Le Campus Tour
            GCL parcourt les universités pour détecter, accompagner et financer les meilleurs
            projets portés par les étudiants de niveau Bac+5.
          </p>
          <p className="text-primary-800 leading-relaxed mt-4">
            Étudiant finaliste ? Soumettez votre résumé de mémoire et votre prototype. S’il est
            validé par notre comité technique, vous intégrerez notre incubateur « Fil Rouge » et
            pourrez bénéficier d’un financement d’amorçage.
          </p>
        </div>
      </div>

      {/* Cartographie */}
      <section>
        <h2 className="text-2xl font-semibold text-primary-900 mb-6">
          Cartographie du Campus Tour
        </h2>
        {loading ? (
          <p className="text-primary-600">Chargement des hubs...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hubs.map((hub) => (
              <HubCard key={hub.id} hub={hub} />
            ))}
          </div>
        )}
        <div className="mt-6 glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-primary-900 mb-2">
            Universités partenaires
          </h3>
          <ul className="list-disc list-inside text-primary-700 space-y-1">
            <li><strong>Hub Tanganyika (Kalemie)</strong> : UNIKAL</li>
            <li><strong>Hub Lualaba (Kolwezi)</strong> : UNILU, Institut Supérieur de Kolwezi</li>
            <li><strong>Hub Haut-Katanga (Lubumbashi)</strong> : Université de Lubumbashi (UNILU)</li>
            <li><strong>Hub Lomami (Kamina)</strong> : UNIKAM</li>
          </ul>
          <p className="mt-3 text-sm text-primary-600/80">
            La caravane scientifique s’arrêtera dans chaque université pour des séances
            d’information, des ateliers et la collecte des mémoires-projets.
          </p>
        </div>
      </section>

      {/* Soumission */}
      <section>
        <h2 className="text-2xl font-semibold text-primary-900 mb-6">
          Soumettre votre Mémoire-Projet
        </h2>
        {isAuthenticated ? (
          <div className="glass-card p-6 rounded-2xl">
            <CampusSubmissionForm />
          </div>
        ) : (
          <div className="glass-card p-8 rounded-2xl text-center">
            <p className="text-primary-800 mb-6">
              Vous devez être connecté pour soumettre un mémoire.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button href="/login" variant="primary">
                Se connecter
              </Button>
              <Button href="/register" variant="secondary">
                Créer un compte
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}