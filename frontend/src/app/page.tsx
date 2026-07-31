import Button from '@/components/Button';

export default function HomePage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">Génération Contenu Local</h1>
      <p className="text-xl text-gray-600 mb-8">
        L&apos;alliance de la science, de l&apos;industrie et de la souveraineté économique en RDC.
      </p>
      <div className="flex justify-center gap-4">
        <Button href="/programme" variant="primary">Découvrir le programme</Button>
        <Button href="/investir" variant="secondary">Investir & Soutenir</Button>
      </div>
    </div>
  );
}