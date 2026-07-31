import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ message = 'Aucun élément trouvé.', icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      {icon || <PackageOpen size={48} />}
      <p className="mt-4 text-lg">{message}</p>
    </div>
  );
}