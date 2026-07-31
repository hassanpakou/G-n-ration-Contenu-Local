import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import LayoutWrapper from '@/components/LayoutWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col" suppressHydrationWarning>
        <AuthProvider>
          <LayoutWrapper>
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
          </LayoutWrapper>
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}