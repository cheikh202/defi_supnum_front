'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface StudentLayoutProps {
  children: ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Ajoute ici ta logique de déconnexion (ex: Supabase, Firebase, etc.)
    router.push('/login');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-blue-900">Espace Étudiant</h1>
        <Button onClick={handleLogout} variant="destructive" className="flex items-center gap-2">
          <LogOut className="w-5 h-5" /> Déconnexion
        </Button>
      </header>

      {/* Page Content */}
      <main className="p-6 flex-1 overflow-auto">{children}</main>
    </div>
  );
}
