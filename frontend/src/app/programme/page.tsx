'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Hub, Cohorte } from '@/types';
import HubCard from '@/components/HubCard';
import SkeletonCard from '@/components/SkeletonCard';

export default function ProgrammePage() {
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHubs = async () => {
      try {
        const res = await api.get('/hubs/');
        setHubs(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement des hubs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHubs();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Programme Génération Contenu Local 2026</h1>
      <p className="mb-6 text-gray-600">
        Quatre hubs régionaux pour couvrir tout l&apos;espace Grand Katanga et former
        les futurs entrepreneurs miniers.
      </p>
      {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <SkeletonCard count={2}/>
          </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hubs.map((hub) => (
            <HubCard key={hub.id} hub={hub} />
          ))}
        </div>
      )}
    </div>
  );
}