'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/programme', label: 'Programme' },
  { href: '/campus-tour', label: 'Campus Tour' },
  { href: '/portefeuille', label: 'Portefeuille' },
  { href: '/sous-traitance', label: 'Sous-traitance' },
  { href: '/investir', label: 'Investir' },
  { href: '/ethique', label: 'Éthique' },
];

export default function Navbar() {
  const { isAuthenticated, logout, user, isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Classes communes pour les liens (textes)
  const linkClass = scrolled
    ? 'text-white/90 transition-colors hover:text-gold-400'
    : 'text-primary-900/90 transition-colors hover:text-gold-400';

  const activeLinkClass = scrolled
    ? 'text-gold-400 font-semibold'
    : 'text-primary-900 font-semibold';

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary-900 shadow-lg' : 'glass'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className={`text-2xl font-bold tracking-tight transition-colors ${
            scrolled ? 'text-white' : 'text-primary-900'
          }`}
        >
          GCL 2026
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-gold-400 ${
                pathname === link.href ? activeLinkClass : linkClass
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  scrolled
                    ? 'bg-white/10 text-white'
                    : 'bg-primary-100 text-primary-900'
                }`}
              >
                {user?.email}
              </span>
              <Link
                href="/dashboard"
                className={`transition-colors hover:text-gold-400 ${
                  pathname === '/dashboard' ? activeLinkClass : linkClass
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/profil"
                className={`transition-colors hover:text-gold-400 ${
                  pathname === '/profil' ? activeLinkClass : linkClass
                }`}
              >
                Profil
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className={`transition-colors hover:text-gold-400 ${
                    pathname === '/admin' ? activeLinkClass : linkClass
                  }`}
                >
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className={`flex items-center gap-1 transition-colors hover:text-gold-400 ${
                  scrolled ? 'text-white/90' : 'text-primary-900/90'
                }`}
              >
                <LogOut size={16} /> Déconnexion
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className={`px-4 py-2 rounded-full transition shadow-md ${
                scrolled
                  ? 'bg-white text-primary-900 hover:bg-gray-100'
                  : 'bg-primary-900 text-white hover:bg-primary-800'
              }`}
            >
              Connexion
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden transition-colors ${
            scrolled ? 'text-white' : 'text-primary-900'
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className={`md:hidden px-4 pb-4 flex flex-col gap-3 ${
            scrolled ? 'bg-primary-900' : 'glass-dark'
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={
                pathname === link.href
                  ? activeLinkClass
                  : scrolled
                  ? 'text-white/90'
                  : 'text-primary-900/90'
              }
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <span
                className={`text-sm ${
                  scrolled ? 'text-white/80' : 'text-primary-900/80'
                }`}
              >
                {user?.email}
              </span>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className={scrolled ? 'text-white/90' : 'text-primary-900/90'}
              >
                Dashboard
              </Link>
              <Link
                href="/profil"
                onClick={() => setMobileOpen(false)}
                className={scrolled ? 'text-white/90' : 'text-primary-900/90'}
              >
                Profil
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className={scrolled ? 'text-white/90' : 'text-primary-900/90'}
                >
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className={`text-left ${
                  scrolled ? 'text-white/90' : 'text-primary-900/90'
                }`}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-2 rounded-full text-center ${
                scrolled
                  ? 'bg-white text-primary-900'
                  : 'bg-primary-900 text-white'
              }`}
            >
              Connexion
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}