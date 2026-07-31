'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';

const schema = yup.object({
  corridor: yup.number().required('Veuillez choisir un corridor'),
  description_service: yup.string().required('Description requise'),
  contact_email: yup.string().email('Email invalide').required('Email requis'),
  contact_telephone: yup.string().required('Téléphone requis'),
});

type FormData = yup.InferType<typeof schema>;

interface Corridor {
  id: number;
  nom: string;
}

interface OffreService {
  id: number;
  pme: number;
  corridor: number;
  description_service: string;
  contact_email: string;
  contact_telephone: string;
  date_ajout: string;
}

export default function OffreServiceForm({
  corridors,
  onSuccess,
}: {
  corridors: Corridor[];
  onSuccess: (offre: OffreService) => void;
}) {
  const { user } = useAuth();
  const [pmEId, setPmeId] = useState<number | null>(null);

  useEffect(() => {
    // Récupérer l'ID de la PME de l'utilisateur connecté s'il en a une
    const fetchUserPME = async () => {
      try {
        // On suppose qu'un endpoint /api/user/pme/ renvoie la PME du candidat
        const res = await api.get('/auth/user/');
        if (res.data.candidat_id) {
          const pmeRes = await api.get(`/pme/?fondateurs=${res.data.candidat_id}`);
          if (pmeRes.data.length > 0) {
            setPmeId(pmeRes.data[0].id); // On prend la première PME
          }
        }
      } catch (err) {
        console.error('Impossible de récupérer la PME de l\'utilisateur');
      }
    };
    fetchUserPME();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!pmEId) {
      toast.error('Vous devez d\'abord créer une PME pour proposer une offre.');
      return;
    }

    try {
      const res = await api.post('/offres-services/', {
        ...data,
        pme: pmEId,
      });
      toast.success('Offre ajoutée avec succès');
      onSuccess(res.data);
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Erreur lors de l\'ajout de l\'offre';
      toast.error(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-semibold">Proposer une offre de service</h3>
      <div>
        <label className="block mb-1">Corridor</label>
        <select {...register('corridor')} className="border rounded p-2 w-full">
          <option value="">Sélectionnez un corridor</option>
          {corridors.map((c) => (
            <option key={c.id} value={c.id}>{c.nom}</option>
          ))}
        </select>
        {errors.corridor && <p className="text-red-500 text-sm">{errors.corridor.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Description du service</label>
        <textarea {...register('description_service')} rows={4} className="border rounded p-2 w-full" />
        {errors.description_service && <p className="text-red-500 text-sm">{errors.description_service.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Email de contact</label>
        <input type="email" {...register('contact_email')} className="border rounded p-2 w-full" />
        {errors.contact_email && <p className="text-red-500 text-sm">{errors.contact_email.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Téléphone</label>
        <input {...register('contact_telephone')} className="border rounded p-2 w-full" />
        {errors.contact_telephone && <p className="text-red-500 text-sm">{errors.contact_telephone.message}</p>}
      </div>
      {!pmEId && (
        <p className="text-yellow-600 text-sm">Vous devez avoir une PME enregistrée pour proposer une offre.</p>
      )}
      <button type="submit" className="bg-blue-900 text-white py-2 px-6 rounded hover:bg-blue-800" disabled={!pmEId}>
        Soumettre
      </button>
    </form>
  );
}