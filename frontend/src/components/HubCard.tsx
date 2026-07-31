import Card from './Card';
import { Hub } from '@/types';

export default function HubCard({ hub }: { hub: Hub }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-2">{hub.nom}</h2>
      <p className="text-gray-700 mb-2"><strong>Focus minier :</strong> {hub.focus_minier}</p>
      <p className="text-gray-700"><strong>Spécialisation :</strong> {hub.specialisation_pedagogique}</p>
    </Card>
  );
}