'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '@/lib/api';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import Button from '@/components/Button';

// Schéma Yup – tous les champs sont des chaînes (les optionnels ont une valeur par défaut vide)
const schema = yup.object({
  nom: yup.string().required('Nom requis'),
  prenom: yup.string().required('Prénom requis'),
  telephone: yup.string().required('Téléphone requis'),
  date_naissance: yup.string().required('Date de naissance requise'),
  sexe: yup.string().required(),
  province_residence: yup.string().required('Province requise'),
  diplome: yup.string().required('Diplôme requis'),
  etablissement: yup.string().required('Établissement requis'),
  domaine_etude: yup.string().required('Domaine requis'),
  experience_professionnelle: yup.string().default(''),
  first_name: yup.string().default(''),
  last_name: yup.string().default(''),
});

// Type dérivé – tous les champs sont string (plus de null ou undefined)
type ProfilForm = yup.InferType<typeof schema>;

export default function ProfilPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfilForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      experience_professionnelle: '',
      first_name: '',
      last_name: '',
    },
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }
    if (isAuthenticated) {
      const fetchProfil = async () => {
        try {
          const res = await api.get('/auth/profil/');
          // On s'assure que les champs optionnels ne soient pas null
          reset({
            ...res.data,
            experience_professionnelle: res.data.experience_professionnelle ?? '',
            first_name: res.data.first_name ?? '',
            last_name: res.data.last_name ?? '',
          });
        } catch {
          toast.error('Impossible de charger votre profil');
        }
      };
      fetchProfil();
    }
  }, [isAuthenticated, authLoading, router, reset]);

  const onSubmit = async (data: ProfilForm) => {
    setSaving(true);
    try {
      // Toutes les valeurs sont des chaînes, pas de null
      await api.put('/auth/profil/', data);
      toast.success('Profil mis à jour avec succès');
    } catch (err) {
      const axiosError = err as AxiosError<{ detail?: string }>;
      const msg = axiosError.response?.data?.detail || 'Erreur lors de la mise à jour';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-primary-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-primary-900 mb-2">Mon Profil</h1>
      <div className="h-1 w-16 bg-gold-400 rounded-full mb-8" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="glass-card rounded-2xl p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-primary-800 mb-1">
              Nom
            </label>
            <input
              {...register('nom')}
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
            {errors.nom && (
              <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-800 mb-1">
              Prénom
            </label>
            <input
              {...register('prenom')}
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
            {errors.prenom && (
              <p className="text-red-500 text-sm mt-1">{errors.prenom.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-800 mb-1">
              Prénom (utilisateur)
            </label>
            <input
              {...register('first_name')}
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-800 mb-1">
              Nom (utilisateur)
            </label>
            <input
              {...register('last_name')}
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-800 mb-1">
              Téléphone
            </label>
            <input
              {...register('telephone')}
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
            {errors.telephone && (
              <p className="text-red-500 text-sm mt-1">{errors.telephone.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-800 mb-1">
              Date de naissance
            </label>
            <input
              type="date"
              {...register('date_naissance')}
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
            {errors.date_naissance && (
              <p className="text-red-500 text-sm mt-1">{errors.date_naissance.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-800 mb-1">
              Sexe
            </label>
            <select
              {...register('sexe')}
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            >
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-800 mb-1">
              Province de résidence
            </label>
            <input
              {...register('province_residence')}
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
            {errors.province_residence && (
              <p className="text-red-500 text-sm mt-1">{errors.province_residence.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-800 mb-1">
              Diplôme
            </label>
            <input
              {...register('diplome')}
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
            {errors.diplome && (
              <p className="text-red-500 text-sm mt-1">{errors.diplome.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-800 mb-1">
              Établissement
            </label>
            <input
              {...register('etablissement')}
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
            {errors.etablissement && (
              <p className="text-red-500 text-sm mt-1">{errors.etablissement.message}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-primary-800 mb-1">
              Domaine d&apos;étude
            </label>
            <input
              {...register('domaine_etude')}
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
            {errors.domaine_etude && (
              <p className="text-red-500 text-sm mt-1">{errors.domaine_etude.message}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-primary-800 mb-1">
              Expérience professionnelle
            </label>
            <textarea
              {...register('experience_professionnelle')}
              rows={4}
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving} variant="primary" size="lg">
            {saving ? 'Enregistrement...' : 'Mettre à jour'}
          </Button>
        </div>
      </form>
    </div>
  );
}