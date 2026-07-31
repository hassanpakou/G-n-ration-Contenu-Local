'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

const schema = yup.object({
  guichet: yup.number().required('Choisissez un guichet'),
  titre: yup.string().required('Titre requis'),
  description: yup.string().required('Description requise'),
  montant_recherche: yup.number().typeError('Montant invalide').positive('Montant positif').required('Montant requis'),
  pitch_deck: yup.mixed(),
});

type FormData = yup.InferType<typeof schema>;

interface Guichet {
  id: number;
  nom: string;
  description: string;
  actif: boolean;
}

interface OpportuniteInvestissement {
  id: number;
  guichet: number;
  titre: string;
  description: string;
  montant_recherche: string;
  candidat: number | null;
  pme: number | null;
  pitch_deck: string | null;
  date_creation: string;
  actif: boolean;
}

export default function NouvelleOpportuniteForm({
  guichets,
  onSuccess,
}: {
  guichets: Guichet[];
  onSuccess: (opp: OpportuniteInvestissement) => void;
}) {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append('guichet', data.guichet.toString());
    formData.append('titre', data.titre);
    formData.append('description', data.description);
    formData.append('montant_recherche', data.montant_recherche.toString());
    if (data.pitch_deck && data.pitch_deck[0]) {
      formData.append('pitch_deck', data.pitch_deck[0]);
    }

    try {
      const res = await api.post('/opportunites-investissement/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Projet soumis avec succès !');
      onSuccess(res.data);
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Erreur lors de la soumission';
      toast.error(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-semibold">Soumettre un projet à financer</h3>
      <div>
        <label className="block mb-1">Guichet visé</label>
        <select {...register('guichet')} className="border rounded p-2 w-full">
          <option value="">Sélectionnez un guichet</option>
          {guichets
            .filter((g) => g.actif)
            .map((g) => (
              <option key={g.id} value={g.id}>
                {g.nom === 'soutenir_projet'
                  ? 'Soutenir un Projet (Amorçage)'
                  : g.nom === 'investir_pme'
                  ? 'Investir dans une sPME'
                  : 'GCL Seed Fund'}
              </option>
            ))}
        </select>
        {errors.guichet && <p className="text-red-500 text-sm">{errors.guichet.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Titre du projet</label>
        <input {...register('titre')} className="border rounded p-2 w-full" />
        {errors.titre && <p className="text-red-500 text-sm">{errors.titre.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Description</label>
        <textarea {...register('description')} rows={5} className="border rounded p-2 w-full" />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Montant recherché (USD)</label>
        <input type="number" step="0.01" {...register('montant_recherche')} className="border rounded p-2 w-full" />
        {errors.montant_recherche && <p className="text-red-500 text-sm">{errors.montant_recherche.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Pitch Deck (optionnel)</label>
        <input type="file" accept=".pdf,.ppt,.pptx" {...register('pitch_deck')} className="border rounded p-2 w-full" />
      </div>
      <button type="submit" className="bg-blue-900 text-white py-2 px-6 rounded hover:bg-blue-800">
        Soumettre
      </button>
    </form>
  );
}