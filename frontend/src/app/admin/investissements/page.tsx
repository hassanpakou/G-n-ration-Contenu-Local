'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface Investissement {
  id: number;
  guichet: number;
  candidat: number;
  candidat_email?: string;
  titre: string;
  montant_recherche: string;
  date_creation: string;
  statut: 'en_attente' | 'valide' | 'rejete';
}

export default function AdminInvestissements() {
  const [invests, setInvests] = useState<Investissement[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvests = async () => {
    try {
      const res = await api.get('/opportunites-investissement/');
      setInvests(res.data);
    } catch (error) {
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvests();
  }, []);

  const handleValidation = async (id: number, action: 'valider' | 'rejeter') => {
    try {
      await api.patch(`/opportunites-investissement/${id}/`, { statut: action === 'valider' ? 'valide' : 'rejete' });
      toast.success(`Investissement ${action === 'valider' ? 'validé' : 'rejeté'}`);
      fetchInvests();
    } catch (error) {
      toast.error('Erreur');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette opportunité ?')) return;
    try {
      await api.delete(`/opportunites-investissement/${id}/`);
      toast.success('Supprimé');
      fetchInvests();
    } catch (error) {
      toast.error('Erreur');
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Gestion des investissements</h1>
      <div className="h-1 w-20 bg-gold-400 mb-6" />

      {invests.length === 0 ? (
        <p className="text-gray-500">Aucune opportunité d&apos;investissement.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invests.map((inv) => (
                <tr key={inv.id}>
                  <td className="px-6 py-4 text-sm font-medium">{inv.titre}</td>
                  <td className="px-6 py-4 text-sm">{inv.candidat_email || inv.candidat}</td>
                  <td className="px-6 py-4 text-sm">{Number(inv.montant_recherche).toLocaleString()} USD</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      inv.statut === 'valide' ? 'bg-green-100 text-green-800' :
                      inv.statut === 'rejete' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {inv.statut || 'en_attente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{new Date(inv.date_creation).toLocaleDateString('fr-FR')}</td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    {(!inv.statut || inv.statut === 'en_attente') && (
                      <>
                        <button
                          onClick={() => handleValidation(inv.id, 'valider')}
                          className="text-green-600 hover:text-green-800"
                        >
                          Valider
                        </button>
                        <button
                          onClick={() => handleValidation(inv.id, 'rejeter')}
                          className="text-red-600 hover:text-red-800"
                        >
                          Rejeter
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(inv.id)}
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