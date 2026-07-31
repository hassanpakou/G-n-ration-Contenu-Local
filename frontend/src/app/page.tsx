'use client';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import {
  Users,
  Building2,
  Award,
  TrendingUp,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Globe,
} from 'lucide-react';

export default function HomePage() {
  const { isAdmin, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      if (isAdmin) {
        router.replace('/admin');
      } else {
        router.replace('/dashboard');
      }
    }
  }, [loading, isAuthenticated, isAdmin, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-primary-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Section - avec fond plus travaillé */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 via-white to-primary-50/30" />
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold text-primary-900 tracking-tight leading-tight">
              Génération Contenu Local
            </h1>
            <div className="h-1 w-32 bg-gold-400 rounded-full mx-auto my-6" />
            <p className="text-xl md:text-2xl text-primary-700/80 max-w-3xl mx-auto leading-relaxed">
              L'alliance de la science, de l'industrie et de la souveraineté économique en RDC.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/programme" variant="primary" size="lg">
                Découvrir le programme
              </Button>
              <Button href="/investir" variant="secondary" size="lg">
                Investir &amp; Soutenir
              </Button>
            </div>
            <p className="mt-8 text-sm text-primary-500/70">
              Rejoignez la communauté GCL 2026 et participez à la transformation industrielle du Congo.
            </p>
          </div>
        </div>
      </section>

      {/* Section chiffres clés - fond blanc avec cartes ombrées */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900">Impact en chiffres</h2>
            <div className="h-1 w-20 bg-gold-400 rounded-full mx-auto mt-2" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-primary-700 mx-auto mb-3" />
              <p className="text-4xl font-bold text-primary-900">150+</p>
              <p className="text-sm text-primary-600/80">Jeunes formés</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <Building2 className="w-12 h-12 text-primary-700 mx-auto mb-3" />
              <p className="text-4xl font-bold text-primary-900">30+</p>
              <p className="text-sm text-primary-600/80">PME accompagnées</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <Award className="w-12 h-12 text-primary-700 mx-auto mb-3" />
              <p className="text-4xl font-bold text-primary-900">12</p>
              <p className="text-sm text-primary-600/80">Projets financés</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <TrendingUp className="w-12 h-12 text-primary-700 mx-auto mb-3" />
              <p className="text-4xl font-bold text-primary-900">4</p>
              <p className="text-sm text-primary-600/80">Hubs régionaux</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section mission - avec fond gris clair */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-md">
            <h2 className="text-3xl font-bold text-primary-900 text-center mb-4">
              Notre mission
            </h2>
            <div className="h-1 w-20 bg-gold-400 rounded-full mx-auto mb-6" />
            <p className="text-lg text-primary-700/80 leading-relaxed text-center max-w-3xl mx-auto">
              GCL 2026 vise à créer un écosystème durable d'entrepreneuriat industriel en RDC en
              connectant la recherche universitaire, les besoins des entreprises publiques et privées,
              et les opportunités d'investissement. Nous formons la prochaine génération de leaders
              capables de relever les défis de la souveraineté économique.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/campus-tour" variant="outline" size="md">
                Participer au Campus Tour
              </Button>
              <Button href="/ethique" variant="ghost" size="md">
                Découvrir notre charte éthique
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section piliers - avec grille d'icônes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900">Nos piliers</h2>
            <div className="h-1 w-20 bg-gold-400 rounded-full mx-auto mt-2" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-primary-700" />
              </div>
              <h3 className="text-xl font-semibold text-primary-900">Formation</h3>
              <p className="text-primary-600/80 mt-2">
                Programme immersif pour former les futurs entrepreneurs miniers.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-primary-700" />
              </div>
              <h3 className="text-xl font-semibold text-primary-900">Entrepreneuriat</h3>
              <p className="text-primary-600/80 mt-2">
                Création et accompagnement de PME innovantes dans le secteur minier.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary-700" />
              </div>
              <h3 className="text-xl font-semibold text-primary-900">Souveraineté</h3>
              <p className="text-primary-600/80 mt-2">
                Réduction de la dépendance aux importations par la production locale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section appel à l'action - fond bleu avec texte blanc */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à rejoindre l'aventure ?</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Que vous soyez étudiant, entrepreneur ou investisseur, il y a une place pour vous dans la communauté GCL.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/register" variant="secondary" size="lg">
              Créer un compte
            </Button>
            <Button href="/login" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Se connecter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}