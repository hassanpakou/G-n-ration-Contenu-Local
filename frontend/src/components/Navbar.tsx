'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/programme', label: 'Programme' },
  { href: '/campus-tour', label: 'Campus Tour' },
  { href: '/portefeuille', label: 'Portefeuille' },
  { href: '/sous-traitance', label: 'Sous-traitance' },
  { href: '/investir', label: 'Investir' },
  { href: '/ethique', label: 'Éthique' },
];

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-primary-900 text-white sticky top-0 z-50 backdrop-blur-md bg-opacity-90 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          GCL 2026
        </Link>
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-gold-400 ${
                pathname === link.href ? 'text-gold-400 font-semibold' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm bg-primary-700 px-2 py-1 rounded">{user?.email}</span>
              <button onClick={logout} className="flex items-center gap-1 hover:text-gold-400">
                <LogOut size={16} /> Déconnexion
              </button>
            </div>
          ) : (
            <Link href="/login" className="bg-white text-primary-900 px-3 py-1 rounded hover:bg-gray-200 transition">
              Connexion
            </Link>
          )}
        </div>
        {/* Mobile menu toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary-800 px-4 pb-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={pathname === link.href ? 'text-gold-400 font-semibold' : ''}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <span className="text-sm">{user?.email}</span>
              <button onClick={logout} className="flex items-center gap-1">Déconnexion</button>
            </>
          ) : (
            <Link href="/login" onClick={() => setMobileOpen(false)}>Connexion</Link>
          )}
        </div>
      )}
    </nav>
  );
}