'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '@/lib/api';
import toast from 'react-hot-toast';

const schema = yup.object({
  defi: yup.number().required('Veuillez choisir un défi'),
  titre_solution: yup.string().required('Titre requis'),
  description: yup.string().required('Description requise'),
  contact_nom: yup.string(),
  contact_email: yup.string().email('Email invalide'),
  fichier_presentation: yup.mixed(),
});

type FormData = yup.InferType<typeof schema>;

interface Defi {
  id: number;
  titre: string;
  entreprise: number;
  statut: string;
}

export default function SoumettreSolutionForm({
  defis,
  onSuccess,
}: {
  defis: Defi[];
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append('defi', data.defi.toString());
    formData.append('titre_solution', data.titre_solution);
    formData.append('description', data.description);
    if (data.contact_nom) formData.append('contact_nom', data.contact_nom);
    if (data.contact_email) formData.append('contact_email', data.contact_email);
    if (data.fichier_presentation && data.fichier_presentation[0]) {
      formData.append('fichier_presentation', data.fichier_presentation[0]);
    }

    try {
      await api.post('/solutions-locales/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Solution soumise avec succès !');
      onSuccess();
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Erreur lors de la soumission';
      toast.error(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-semibold">Proposer une solution</h3>
      <div>
        <label className="block mb-1">Défi concerné</label>
        <select {...register('defi')} className="border rounded p-2 w-full">
          <option value="">Sélectionnez un défi</option>
          {defis
            .filter((d) => d.statut === 'ouvert' || d.statut === 'en_cours')
            .map((d) => (
              <option key={d.id} value={d.id}>
                {d.titre} (ID: {d.entreprise})
              </option>
            ))}
        </select>
        {errors.defi && <p className="text-red-500 text-sm">{errors.defi.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Titre de la solution</label>
        <input {...register('titre_solution')} className="border rounded p-2 w-full" />
        {errors.titre_solution && <p className="text-red-500 text-sm">{errors.titre_solution.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Description</label>
        <textarea {...register('description')} rows={5} className="border rounded p-2 w-full" />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Votre nom (si différent du compte)</label>
        <input {...register('contact_nom')} className="border rounded p-2 w-full" />
      </div>
      <div>
        <label className="block mb-1">Email de contact</label>
        <input type="email" {...register('contact_email')} className="border rounded p-2 w-full" />
        {errors.contact_email && <p className="text-red-500 text-sm">{errors.contact_email.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Document de présentation (optionnel)</label>
        <input type="file" {...register('fichier_presentation')} className="border rounded p-2 w-full" />
      </div>
      <button type="submit" className="bg-blue-900 text-white py-2 px-6 rounded hover:bg-blue-800">
        Soumettre
      </button>
    </form>
  );
}