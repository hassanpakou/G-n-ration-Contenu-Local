'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface PME {
  id: number;
  nom: string;
  secteur_activite: string;
  statut_arsp: 'obtenue' | 'en_cours';
  visible_catalogue: boolean;
  fondateurs: number[];
  email_contact?: string;
}

export default function AdminPme() {
  const [pmes, setPmes] = useState<PME[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPmes = async () => {
    try {
      const res = await api.get('/pme/');
      setPmes(res.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des PME');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPmes();
  }, []);

  const toggleVisibility = async (id: number, current: boolean) => {
    try {
      await api.patch(`/pme/${id}/`, { visible_catalogue: !current });
      toast.success('Visibilité mise à jour');
      fetchPmes();
    } catch (error) {
      toast.error('Erreur');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette PME ?')) return;
    try {
      await api.delete(`/pme/${id}/`);
      toast.success('PME supprimée');
      fetchPmes();
    } catch (error) {
      toast.error('Erreur');
    }
  };

  if (loading) return <p>Chargement des PME...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Gestion des PME</h1>
      <div className="h-1 w-20 bg-gold-400 mb-6" />

      {pmes.length === 0 ? (
        <p className="text-gray-500">Aucune PME enregistrée.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Secteur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ARSP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catalogue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pmes.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4 text-sm font-medium">{p.nom}</td>
                  <td className="px-6 py-4 text-sm">{p.secteur_activite}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      p.statut_arsp === 'obtenue' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {p.statut_arsp}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => toggleVisibility(p.id, p.visible_catalogue)}
                      className={`px-2 py-1 text-xs rounded ${
                        p.visible_catalogue ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {p.visible_catalogue ? 'Visible' : 'Masquée'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:text-red-800"
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