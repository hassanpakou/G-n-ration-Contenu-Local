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
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold text-primary-900 mb-2">
        Programme GCL 2026
      </h1>
      <div className="h-1 w-24 bg-gold-400 rounded-full mb-6" />
      <p className="text-lg text-primary-700/80 max-w-3xl mb-10">
        Quatre hubs régionaux pour couvrir tout l'espace Grand Katanga et former
        les futurs entrepreneurs miniers.
      </p>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonCard count={2} />
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