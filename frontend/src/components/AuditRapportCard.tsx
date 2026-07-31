interface Rapport {
  id: number;
  titre: string;
  date_publication: string;
  fichier_pdf: string;
  resume: string;
}

export default function AuditRapportCard({ rapport }: { rapport: Rapport }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h3 className="text-lg font-semibold">{rapport.titre}</h3>
        <p className="text-sm text-gray-500">{new Date(rapport.date_publication).toLocaleDateString('fr-FR')}</p>
        <p className="text-gray-600 mt-1">{rapport.resume}</p>
      </div>
      <a
        href={rapport.fichier_pdf}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 text-sm whitespace-nowrap"
      >
        Télécharger PDF
      </a>
    </div>
  );
}