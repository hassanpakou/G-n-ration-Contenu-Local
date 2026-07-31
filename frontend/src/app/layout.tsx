import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="fr">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col" suppressHydrationWarning>
      <AuthProvider>
        <Navbar/>
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        <Footer/>
        <Toaster position="top-right"/>
      </AuthProvider>
      </body>
      </html>
  );
}