'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    sexe: 'M',
    date_naissance: '',
    telephone: '',
    email: '',
    password: '',
    password2: '',
    province_residence: '',
    diplome: '',
    etablissement: '',
    domaine_etude: '',
    experience_professionnelle: '',
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { title: 'Identité', fields: ['nom', 'prenom', 'sexe', 'date_naissance', 'telephone'] },
    { title: 'Compte', fields: ['email', 'password', 'password2'] },
    { title: 'Profil', fields: ['province_residence', 'diplome', 'etablissement', 'domaine_etude', 'experience_professionnelle'] },
  ];

  const totalSteps = steps.length;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validateStep = (step: number) => {
    const fields = steps[step].fields;
    const stepErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach((field) => {
      const value = formData[field as keyof typeof formData];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        stepErrors[field] = 'Ce champ est requis';
        isValid = false;
      }
      if (field === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        stepErrors[field] = 'Email invalide';
        isValid = false;
      }
      if (field === 'password' && value && value.length < 6) {
        stepErrors[field] = 'Minimum 6 caractères';
        isValid = false;
      }
      if (field === 'password2' && value !== formData.password) {
        stepErrors[field] = 'Les mots de passe ne correspondent pas';
        isValid = false;
      }
    });

    setErrors(stepErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
    setLoading(true);
    try {
      await register(formData);
      toast.success('Compte créé avec succès');
      router.push('/');
    } catch (err: any) {
      const msg = err.response?.data?.detail || err.response?.data?.email?.[0] || 'Erreur lors de l\'inscription';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Gestion du retour arrière
  const handleBack = () => {
  router.push('/');
};

  const renderFields = () => {
    const fields = steps[currentStep].fields;
    return fields.map((field) => {
      switch (field) {
        case 'sexe':
          return (
            <select
              key={field}
              name={field}
              value={formData.sexe}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            >
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
          );
        case 'date_naissance':
          return (
            <input
              key={field}
              type="date"
              name={field}
              value={formData.date_naissance}
              onChange={handleChange}
              required
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
          );
        case 'experience_professionnelle':
          return (
            <textarea
              key={field}
              name={field}
              placeholder="Expérience professionnelle"
              value={formData.experience_professionnelle}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition md:col-span-2"
              rows={3}
            />
          );
        default:
          const type = field === 'password' || field === 'password2' ? 'password' : field === 'email' ? 'email' : 'text';
          const placeholder =
            field === 'nom' ? 'Nom' :
            field === 'prenom' ? 'Prénom' :
            field === 'telephone' ? 'Téléphone' :
            field === 'email' ? 'Email' :
            field === 'password' ? 'Mot de passe' :
            field === 'password2' ? 'Confirmer le mot de passe' :
            field === 'province_residence' ? 'Province de résidence' :
            field === 'diplome' ? 'Diplôme' :
            field === 'etablissement' ? 'Établissement' :
            field === 'domaine_etude' ? "Domaine d'étude" :
            '';
          return (
            <input
              key={field}
              type={type}
              name={field}
              placeholder={placeholder}
              value={formData[field as keyof typeof formData] as string}
              onChange={handleChange}
              required
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
          );
      }
    });
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 relative">
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-primary-600 hover:text-primary-800 transition-colors"
          aria-label="Retour"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-900">Créer un compte</h1>
          <p className="text-gray-500 mt-1">Étape {currentStep + 1} sur {totalSteps}</p>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div
            className="bg-primary-900 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between mb-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  index <= currentStep ? 'bg-primary-900 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              <span className="text-xs mt-1 text-gray-600">{step.title}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {renderFields()}
          </div>

          {Object.keys(errors).length > 0 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {Object.values(errors).map((err, idx) => (
                <p key={idx}>• {err}</p>
              ))}
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl border transition ${
                currentStep === 0
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-primary-900 text-primary-900 hover:bg-primary-50'
              }`}
            >
              <ChevronLeft size={20} />
              Précédent
            </button>

            {currentStep < totalSteps - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 bg-primary-900 hover:bg-primary-800 text-white px-6 py-2 rounded-xl transition"
              >
                Suivant
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="bg-primary-900 hover:bg-primary-800 text-white font-semibold px-8 py-2 rounded-xl transition disabled:opacity-50"
              >
                {loading ? 'Inscription...' : "S'inscrire"}
              </button>
            )}
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Déjà inscrit ?{' '}
          <button
            onClick={() => router.push('/login')}
            className="text-primary-700 font-semibold hover:text-primary-900 transition"
          >
            Connectez-vous
          </button>
        </p>
      </div>
    </div>
  );
}