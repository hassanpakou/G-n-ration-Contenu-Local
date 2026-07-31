'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

interface Dossier {
  id: number;
  candidat: number;
  candidat_email?: string;
  cohorte: number;
  statut: 'soumis' | 'accepte' | 'rejete';
  date_soumission: string;
  lettre_motivation: string;
  note_intention: string;
}

export default function AdminDossiers() {
  const [dossiers, setDossiers] = useState<Dossier[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDossiers = async () => {
    try {
      const res = await api.get('/dossiers/');
      setDossiers(res.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des dossiers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDossiers();
  }, []);

  const handleValidation = async (id: number, action: 'accepter' | 'rejeter') => {
    try {
      await api.patch(`/dossiers/${id}/`, { statut: action === 'accepter' ? 'accepte' : 'rejete' });
      toast.success(`Dossier ${action === 'accepter' ? 'accepté' : 'rejeté'} avec succès`);
      fetchDossiers(); // rafraîchir
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer définitivement ce dossier ?')) return;
    try {
      await api.delete(`/dossiers/${id}/`);
      toast.success('Dossier supprimé');
      fetchDossiers();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  if (loading) return <p>Chargement des dossiers...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Gestion des dossiers</h1>
      <div className="h-1 w-20 bg-gold-400 mb-6" />

      {dossiers.length === 0 ? (
        <p className="text-gray-500">Aucun dossier soumis.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cohorte</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dossiers.map((d) => (
                <tr key={d.id}>
                  <td className="px-6 py-4 text-sm">#{d.id}</td>
                  <td className="px-6 py-4 text-sm">{d.candidat_email || d.candidat}</td>
                  <td className="px-6 py-4 text-sm">{d.cohorte}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      d.statut === 'accepte' ? 'bg-green-100 text-green-800' :
                      d.statut === 'rejete' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {d.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{new Date(d.date_soumission).toLocaleDateString('fr-FR')}</td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    {d.statut === 'soumis' && (
                      <>
                        <button
                          onClick={() => handleValidation(d.id, 'accepter')}
                          className="text-green-600 hover:text-green-800"
                        >
                          Accepter
                        </button>
                        <button
                          onClick={() => handleValidation(d.id, 'rejeter')}
                          className="text-red-600 hover:text-red-800"
                        >
                          Rejeter
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Supprimer
                    </button>
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