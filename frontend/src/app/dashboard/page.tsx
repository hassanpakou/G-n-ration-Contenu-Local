'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

// ---------- Types locaux ----------
interface Dossier {
  id: number;
  cohorte: number;
  statut: string;
  date_soumission: string;
  lettre_motivation: string;
}

interface PMEItem {
  id: number;
  nom: string;
  secteur_activite: string;
  statut_arsp: string;
  visible_catalogue: boolean;
}

interface OffreService {
  id: number;
  corridor: number;
  description_service: string;
  date_ajout: string;
}

interface OpportuniteInvest {
  id: number;
  guichet: number;
  titre: string;
  montant_recherche: string;
  date_creation: string;
}

// ---------- Composants d'affichage rapide ----------
function DossierRow({ dossier }: { dossier: Dossier }) {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded mb-2">
      <div>
        <span className="font-medium">Dossier #{dossier.id}</span>
        <span className={`ml-3 text-xs px-2 py-1 rounded ${
          dossier.statut === 'soumis' ? 'bg-yellow-100 text-yellow-800' :
          dossier.statut === 'accepte' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>{dossier.statut}</span>
        <p className="text-sm text-gray-500">{new Date(dossier.date_soumission).toLocaleDateString('fr-FR')}</p>
      </div>
    </div>
  );
}

function PMERow({ pme }: { pme: PMEItem }) {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded mb-2">
      <div>
        <span className="font-medium">{pme.nom}</span>
        <span className="text-sm text-gray-500 ml-3">{pme.secteur_activite}</span>
        <span className={`ml-3 text-xs px-2 py-1 rounded ${
          pme.statut_arsp === 'obtenue' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>{pme.statut_arsp}</span>
      </div>
    </div>
  );
}

function OffreRow({ offre }: { offre: OffreService }) {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded mb-2">
      <div>
        <span className="font-medium">Offre #{offre.id}</span>
        <p className="text-sm text-gray-500">{offre.description_service.slice(0, 80)}...</p>
      </div>
    </div>
  );
}

function InvestRow({ opp }: { opp: OpportuniteInvest }) {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded mb-2">
      <div>
        <span className="font-medium">{opp.titre}</span>
        <span className="text-sm text-gray-500 ml-3">{Number(opp.montant_recherche).toLocaleString()} USD</span>
      </div>
    </div>
  );
}

// ---------- Page Dashboard ----------
export default function DashboardPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  const [dossiers, setDossiers] = useState<Dossier[]>([]);
  const [pmes, setPmes] = useState<PMEItem[]>([]);
  const [offres, setOffres] = useState<OffreService[]>([]);
  const [opportunites, setOpportunites] = useState<OpportuniteInvest[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchDashboardData = async () => {
      try {
        // Récupérer l'ID du candidat via /auth/user/
        const userRes = await api.get('/auth/user/');
        const candidatId = userRes.data.candidat_id;

        if (candidatId) {
          const [dossiersRes, pmesRes, offresRes, oppRes] = await Promise.all([
            api.get('/dossiers/'),
            api.get('/pme/'),
            api.get('/offres-services/'),
            api.get('/opportunites-investissement/'),
          ]);

          // Filtrer les données appartenant au candidat connecté
          setDossiers(dossiersRes.data.filter((d: any) => d.candidat === candidatId));
          setPmes(pmesRes.data.filter((p: any) => p.fondateurs.includes(candidatId)));
          setOffres(offresRes.data.filter((o: any) => o.pme && pmesRes.data.some((p: any) => p.id === o.pme && p.fondateurs.includes(candidatId))));
          setOpportunites(oppRes.data.filter((o: any) => o.candidat === candidatId));
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        toast.error('Erreur lors du chargement du tableau de bord');
      } finally {
        setDataLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated]);

  if (authLoading || dataLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p>Chargement de votre tableau de bord...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
      <div className="h-1 w-20 bg-gold-400 mb-6"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section Dossiers */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Mes dossiers de candidature</h2>
          {dossiers.length === 0 ? (
            <p className="text-gray-500">Aucun dossier soumis.</p>
          ) : (
            dossiers.map((d) => <DossierRow key={d.id} dossier={d} />)
          )}
        </section>

        {/* Section PME */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Mes PME</h2>
          {pmes.length === 0 ? (
            <p className="text-gray-500">Aucune PME créée.</p>
          ) : (
            pmes.map((p) => <PMERow key={p.id} pme={p} />)
          )}
        </section>

        {/* Section Offres de service */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Mes offres de service</h2>
          {offres.length === 0 ? (
            <p className="text-gray-500">Aucune offre proposée.</p>
          ) : (
            offres.map((o) => <OffreRow key={o.id} offre={o} />)
          )}
        </section>

        {/* Section Opportunités d'investissement */}
        <section className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">Mes propositions d&apos;investissement</h2>
          {opportunites.length === 0 ? (
            <p className="text-gray-500">Aucune proposition.</p>
          ) : (
            opportunites.map((o) => <InvestRow key={o.id} opp={o} />)
          )}
        </section>
      </div>
    </div>
  );
}