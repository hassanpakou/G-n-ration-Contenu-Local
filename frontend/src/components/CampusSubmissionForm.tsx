'use client';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AxiosError } from 'axios';
import api from '@/lib/api';
import toast from 'react-hot-toast';

// Types locaux
interface CohorteOption {
  id: number;
  nom: string;
}

interface IFormInput {
  lettre_motivation: string;
  note_intention: string;
  cv: FileList;
  diplome_fichier: FileList;
  prototype?: FileList | null; // on utilisera un contrôle séparé
  cohorte: number;
}

const schema: yup.ObjectSchema<IFormInput> = yup.object({
  lettre_motivation: yup.string().required('Champ requis'),
  note_intention: yup.string().required('Résumé du mémoire requis'),
  cv: yup.mixed<FileList>().required('CV requis'),
  diplome_fichier: yup.mixed<FileList>().required('Scan du diplôme requis'),
  prototype: yup.mixed<FileList>().nullable().optional(),
  cohorte: yup.number().required('Veuillez choisir une cohorte'),
});

export default function CampusSubmissionForm() {
  const [loading, setLoading] = useState(false);
  const [cohortes, setCohortes] = useState<CohorteOption[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchCohortes = async () => {
      try {
        const res = await api.get<CohorteOption[]>('/cohortes/');
        setCohortes(res.data);
      } catch {
        setCohortes([{ id: 1, nom: 'Cohorte par défaut' }]);
      }
    };
    fetchCohortes();
  }, []);

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('lettre_motivation', data.lettre_motivation);
    formData.append('note_intention', data.note_intention);
    formData.append('cv', data.cv[0]);
    formData.append('diplome_fichier', data.diplome_fichier[0]);
    if (data.prototype && data.prototype.length > 0) {
      formData.append('prototype', data.prototype[0]);
    }
    formData.append('cohorte', data.cohorte.toString());

    try {
      await api.post('/dossiers/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Votre mémoire a bien été soumis !', {
        icon: '🎉',
        style: { background: '#059669', color: 'white' },
      });
    } catch (err) {
      const axiosError = err as AxiosError<{ detail?: string }>;
      const msg = axiosError.response?.data?.detail || 'Erreur lors de la soumission';
      toast.error(msg, {
        icon: '❌',
        style: { background: '#DC2626', color: 'white' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <div>
        <label className="block mb-1">Cohorte visée</label>
        <select {...register('cohorte')} className="border rounded p-2 w-full">
          <option value="">Sélectionnez une cohorte</option>
          {cohortes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nom || `Cohorte ${c.id}`}
            </option>
          ))}
        </select>
        {errors.cohorte && <p className="text-red-500 text-sm">{errors.cohorte.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Lettre de motivation</label>
        <textarea {...register('lettre_motivation')} rows={4} className="border rounded p-2 w-full" />
        {errors.lettre_motivation && <p className="text-red-500 text-sm">{errors.lettre_motivation.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Résumé du mémoire (note d&apos;intention)</label>
        <textarea {...register('note_intention')} rows={6} className="border rounded p-2 w-full" />
        {errors.note_intention && <p className="text-red-500 text-sm">{errors.note_intention.message}</p>}
      </div>
      <div>
        <label className="block mb-1">CV (PDF)</label>
        <input type="file" accept=".pdf" {...register('cv')} className="border rounded p-2 w-full" />
        {errors.cv && <p className="text-red-500 text-sm">{errors.cv.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Scan du diplôme (PDF)</label>
        <input type="file" accept=".pdf" {...register('diplome_fichier')} className="border rounded p-2 w-full" />
        {errors.diplome_fichier && <p className="text-red-500 text-sm">{errors.diplome_fichier.message}</p>}
      </div>

      {/* Champ prototype avec Controller pour éviter l'erreur d'hydratation */}
      <div>
        <label className="block mb-1">Prototype / document additionnel (optionnel)</label>
        <Controller
          name="prototype"
          control={control}
          render={({ field: { onChange, onBlur, ref, name } }) => (
            <input
              type="file"
              name={name}
              ref={ref}
              onBlur={onBlur}
              onChange={(e) => {
                onChange(e.target.files);
              }}
              className="border rounded p-2 w-full"
            />
          )}
        />
        {errors.prototype && <p className="text-red-500 text-sm">{errors.prototype.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-primary-900 text-white py-2 px-6 rounded hover:bg-primary-800 disabled:opacity-50"
      >
        {loading ? 'Envoi...' : 'Soumettre le mémoire'}
      </button>
    </form>
  );
}