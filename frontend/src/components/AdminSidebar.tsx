'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, FileText, Building2, Wrench,
  TrendingUp, ShieldCheck, LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const links = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/admin/dossiers', label: 'Dossiers', icon: FileText },
  { href: '/admin/pme', label: 'PME', icon: Building2 },
  { href: '/admin/defis', label: 'Défis', icon: Wrench },
  { href: '/admin/investissements', label: 'Investissements', icon: TrendingUp },
  { href: '/admin/ethique', label: 'Éthique & audits', icon: ShieldCheck },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, isAdmin, logout } = useAuth();

  return (
    <aside className="w-64 bg-primary-900 text-white p-6 flex flex-col h-full min-h-screen shadow-xl">
      <h2 className="text-2xl font-bold mb-8 text-gold-400">Admin GCL</h2>
      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-white/10 text-gold-400 shadow-inner'
                  : 'hover:bg-white/5 text-white/80 hover:text-white'
              }`}
            >
              <Icon size={20} />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-white/10 pt-4 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm truncate text-white/80">{user?.email || 'Non connecté'}</span>
          {isAdmin && (
            <span className="text-xs bg-gold-400 text-primary-900 px-2 py-0.5 rounded-full font-semibold">Admin</span>
          )}
        </div>
        <Link href="/profil" className="flex items-center gap-2 text-sm text-white/80 hover:text-gold-400 transition-colors">
          Voir mon profil
        </Link>
        <button onClick={logout} className="flex items-center gap-2 text-sm text-white/80 hover:text-gold-400 transition-colors w-full text-left">
          <LogOut size={16} /> Déconnexion
        </button>
      </div>
    </aside>
  );
}