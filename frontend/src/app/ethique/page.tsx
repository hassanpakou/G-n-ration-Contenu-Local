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
    <div>
      <section className="mb-12 animate-fade-in">
        <h1 className="text-3xl font-bold mb-4">Confiance, Éthique & Gouvernance</h1>
        <p className="text-gray-600">
          Transparence totale et tolérance zéro face à la corruption. Découvrez les instances
          qui garantissent la bonne gestion des fonds et l&apos;intégrité du programme.
        </p>
      </section>

      {/* Conseil des Sages */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Conseil des Sages</h2>
        {loading ? (
          <p>Chargement...</p>
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

      {/* Comités de Surveillance */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Comités de Surveillance Éthique</h2>
        {loading ? (
          <p>Chargement...</p>
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

      {/* Rapports d'Audit */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Rapports d&apos;Audit</h2>
        {loading ? (
          <p>Chargement...</p>
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