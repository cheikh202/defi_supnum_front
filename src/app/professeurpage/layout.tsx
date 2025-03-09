'use client';

import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, Book,  Menu } from 'lucide-react';
import Link from 'next/link';

interface ProfessorLayoutProps {
  children: ReactNode;
}

export default function ProfessorLayout({ children }: ProfessorLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      // Appel à l'API de déconnexion
      const response = await fetch('http://127.0.0.1:8000/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Ajoutez d'autres informations de déconnexion si nécessaire (par exemple un token)
        body: JSON.stringify({}),
      });

      if (response.ok) {
        localStorage.removeItem('jwt-token')
        window.location.href="/login";
      } 
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-64 bg-blue-900 text-white p-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Espace Professeur</h2>
          <nav className="flex flex-col gap-2">
            <Link href="/professeurpage" className="flex items-center gap-2 p-2 rounded hover:bg-blue-800">
              <Book className="w-5 h-5" />  Mes Disponibilités
            </Link>
            
          </nav>
        </aside>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded hover:bg-gray-200">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Espace Professeur</h1>
          </div>
          <Button onClick={handleLogout} variant="destructive" className="flex items-center gap-2">
            <LogOut className="w-5 h-5" /> Déconnexion
          </Button>
        </header>
        
        {/* Page Content */}
        <main className="p-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}