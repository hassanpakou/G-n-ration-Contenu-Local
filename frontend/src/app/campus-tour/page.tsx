'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Hub } from '@/types';
import HubCard from '@/components/HubCard';
import CampusSubmissionForm from '@/components/CampusSubmissionForm';
import Button from '@/components/Button';

export default function CampusTourPage() {
  const { isAuthenticated, user } = useAuth();
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
    <div>
      {/* Section 1 : Concept */}
      <section className="mb-12 animate-fade-in">
        <h1 className="text-3xl font-bold mb-4">Campus Tour & Mémoire-Projet</h1>
        <div className="bg-white rButton

        ounded-lg p-6 shadow-md">
          <p className="text-gray-700 mb-4">
            La réforme historique de l’Enseignement Supérieur et Universitaire (ESU) transforme
            les mémoires de fin d’études en véritables business plans industriels. Le Campus Tour
            GCL parcourt les universités pour détecter, accompagner et financer les meilleurs
            projets portés par les étudiants de niveau Bac+5.
          </p>
          <p className="text-gray-700">
            Étudiant finaliste ? Soumettez votre résumé de mémoire et votre prototype. S’il est
            validé par notre comité technique, vous intégrerez notre incubateur « Fil Rouge » et
            pourrez bénéficier d’un financement d’amorçage.
          </p>
        </div>
      </section>

      {/* Section 2 : Cartographie */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Cartographie du Campus Tour</h2>
        {loading ? (
          <p>Chargement des hubs...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hubs.map((hub) => (
              <HubCard key={hub.id} hub={hub} />
            ))}
          </div>
        )}
        <div className="mt-6 bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Universités partenaires</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Hub Tanganyika (Kalemie)</strong> : UNIKAL</li>
            <li><strong>Hub Lualaba (Kolwezi)</strong> : UNILU, Institut Supérieur de Kolwezi</li>
            <li><strong>Hub Haut-Katanga (Lubumbashi)</strong> : Université de Lubumbashi (UNILU)</li>
            <li><strong>Hub Lomami (Kamina)</strong> : UNIKAM</li>
          </ul>
          <p className="mt-3 text-sm text-gray-500">
            La caravane scientifique s’arrêtera dans chaque université pour des séances
            d’information, des ateliers et la collecte des mémoires-projets.
          </p>
        </div>
      </section>

      {/* Section 3 : Formulaire de soumission */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Soumettre votre Mémoire-Projet</h2>
        {isAuthenticated ? (
          <CampusSubmissionForm />
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="mb-4">Vous devez être connecté pour soumettre un mémoire.</p>
            <Button href="/login" variant="primary">
              Se connecter
            </Button>
            <Button href="/register" variant="secondary">
              Créer un compte
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}