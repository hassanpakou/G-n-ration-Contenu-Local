'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    nom: '',
    prenom: '',
    telephone: '',
    date_naissance: '',
    sexe: 'M',
    province_residence: '',
    diplome: '',
    etablissement: '',
    domaine_etude: '',
    experience_professionnelle: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      toast.success('Compte créé avec succès');
      router.push('/');
    } catch (err: any) {
      const msg = err.response?.data?.detail || err.response?.data?.email?.[0] || 'Erreur lors de l\'inscription';
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Créer un compte Candidat</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="nom" placeholder="Nom" onChange={handleChange} required className="border rounded p-2" />
        <input name="prenom" placeholder="Prénom" onChange={handleChange} required className="border rounded p-2" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="border rounded p-2" />
        <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required className="border rounded p-2" />
        <input type="password" name="password2" placeholder="Confirmer mot de passe" onChange={handleChange} required className="border rounded p-2" />
        <input name="telephone" placeholder="Téléphone" onChange={handleChange} required className="border rounded p-2" />
        <input type="date" name="date_naissance" onChange={handleChange} required className="border rounded p-2" />
        <select name="sexe" onChange={handleChange} className="border rounded p-2">
          <option value="M">Masculin</option>
          <option value="F">Féminin</option>
        </select>
        <input name="province_residence" placeholder="Province de résidence" onChange={handleChange} required className="border rounded p-2" />
        <input name="diplome" placeholder="Diplôme" onChange={handleChange} required className="border rounded p-2" />
        <input name="etablissement" placeholder="Établissement" onChange={handleChange} required className="border rounded p-2" />
        <input name="domaine_etude" placeholder="Domaine d'étude" onChange={handleChange} required className="border rounded p-2" />
        <textarea name="experience_professionnelle" placeholder="Expérience professionnelle" onChange={handleChange} className="border rounded p-2 md:col-span-2" />
        <button type="submit" className="bg-blue-900 text-white py-2 rounded md:col-span-2">S&apos;inscrire</button>
      </form>
    </div>
  );
}