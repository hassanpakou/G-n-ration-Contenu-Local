'use client';
import { useAuth } from '@/context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold text-primary-900 mb-2">Tableau de bord administrateur</h1>
      <div className="h-1 w-20 bg-gold-400 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold text-primary-700">Dossiers</h2>
          <p className="text-4xl font-bold text-primary-900 mt-2">12</p>
          <p className="text-sm text-gray-500">En attente de validation</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold text-primary-700">PME</h2>
          <p className="text-4xl font-bold text-primary-900 mt-2">8</p>
          <p className="text-sm text-gray-500">Inscrites cette semaine</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold text-primary-700">Investissements</h2>
          <p className="text-4xl font-bold text-primary-900 mt-2">5</p>
          <p className="text-sm text-gray-500">En cours de validation</p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <h2 className="text-xl font-semibold text-primary-900 mb-2">Bienvenue, {user?.email || 'Admin'} 👋</h2>
        <p className="text-gray-600">Utilisez le menu de gauche pour gérer les ressources du programme GCL 2026.</p>
      </div>
    </div>
  );
}