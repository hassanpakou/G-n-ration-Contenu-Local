'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface Audit {
  id: number;
  pme: number;
  pme_nom?: string;
  date_audit: string;
  statut: 'en_attente' | 'en_cours' | 'termine';
  rapport?: string;
}

export default function AdminEthique() {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAudits = async () => {
    try {
      const res = await api.get('/audits/');
      setAudits(res.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des audits');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudits();
  }, []);

  const handleStatut = async (id: number, statut: 'en_cours' | 'termine') => {
    try {
      await api.patch(`/audits/${id}/`, { statut });
      toast.success(`Audit ${statut === 'termine' ? 'terminé' : 'en cours'}`);
      fetchAudits();
    } catch (error) {
      toast.error('Erreur');
    }
  };

  if (loading) return <p>Chargement des audits...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Éthique & audits</h1>
      <div className="h-1 w-20 bg-gold-400 mb-6" />

      {audits.length === 0 ? (
        <p className="text-gray-500">Aucun audit enregistré.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PME</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {audits.map((a) => (
                <tr key={a.id}>
                  <td className="px-6 py-4 text-sm font-medium">{a.pme_nom || a.pme}</td>
                  <td className="px-6 py-4 text-sm">{new Date(a.date_audit).toLocaleDateString('fr-FR')}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      a.statut === 'termine' ? 'bg-green-100 text-green-800' :
                      a.statut === 'en_cours' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {a.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    {a.statut === 'en_attente' && (
                      <button
                        onClick={() => handleStatut(a.id, 'en_cours')}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Démarrer
                      </button>
                    )}
                    {a.statut === 'en_cours' && (
                      <button
                        onClick={() => handleStatut(a.id, 'termine')}
                        className="text-green-600 hover:text-green-800"
                      >
                        Terminer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}