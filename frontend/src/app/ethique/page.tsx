'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import ConseilSagesCard from '@/components/ConseilSagesCard';
import ComiteSurveillanceCard from '@/components/ComiteSurveillanceCard';
import AuditRapportCard from '@/components/AuditRapportCard';

interface ConseilSage {
  id: number;
  nom: string;
  titre: string;
  organisation: string;
  photo: string | null;
  biographie: string;
  ordre_affichage: number;
}

interface ComiteSurveillance {
  id: number;
  nom_organisation: string;
  description: string;
  logo: string | null;
  representant_nom: string;
  representant_email: string;
}

interface AuditRapport {
  id: number;
  comite: number;
  titre: string;
  date_publication: string;
  fichier_pdf: string;
  resume: string;
}

export default function EthiquePage() {
  const [conseil, setConseil] = useState<ConseilSage[]>([]);
  const [comites, setComites] = useState<ComiteSurveillance[]>([]);
  const [audits, setAudits] = useState<AuditRapport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [conseilRes, comitesRes, auditsRes] = await Promise.all([
          api.get('/conseil-sages/'),
          api.get('/comites-surveillance/'),
          api.get('/audits/'),
        ]);
        setConseil(conseilRes.data);
        setComites(comitesRes.data);
        setAudits(auditsRes.data);
      } catch (err) {
        console.error('Erreur chargement données éthique', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="animate-fade-in space-y-12">
      {/* En-tête */}
      <div>
        <h1 className="text-4xl font-bold text-primary-900 mb-2">
          Confiance, Éthique & Gouvernance
        </h1>
        <div className="h-1 w-24 bg-gold-400 rounded-full mb-6" />
        <p className="text-lg text-primary-700/80 max-w-3xl">
          Transparence totale et tolérance zéro face à la corruption. Découvrez les instances
          qui garantissent la bonne gestion des fonds et l'intégrité du programme.
        </p>
      </div>

      {/* Conseil des Sages */}
      <section>
        <h2 className="text-2xl font-semibold text-primary-900 mb-6">
          Conseil des Sages
        </h2>
        {loading ? (
          <p className="text-primary-600">Chargement...</p>
        ) : conseil.length === 0 ? (
          <p className="text-gray-500">Aucun membre pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conseil.map((membre) => (
              <ConseilSagesCard key={membre.id} membre={membre} />
            ))}
          </div>
        )}
      </section>

      {/* Comités */}
      <section>
        <h2 className="text-2xl font-semibold text-primary-900 mb-6">
          Comités de Surveillance Éthique
        </h2>
        {loading ? (
          <p className="text-primary-600">Chargement...</p>
        ) : comites.length === 0 ? (
          <p className="text-gray-500">Aucun comité enregistré.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comites.map((comite) => (
              <ComiteSurveillanceCard key={comite.id} comite={comite} />
            ))}
          </div>
        )}
      </section>

      {/* Audits */}
      <section>
        <h2 className="text-2xl font-semibold text-primary-900 mb-6">
          Rapports d'Audit
        </h2>
        {loading ? (
          <p className="text-primary-600">Chargement...</p>
        ) : audits.length === 0 ? (
          <p className="text-gray-500">Aucun rapport publié.</p>
        ) : (
          <div className="space-y-4">
            {audits.map((rapport) => (
              <AuditRapportCard key={rapport.id} rapport={rapport} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}