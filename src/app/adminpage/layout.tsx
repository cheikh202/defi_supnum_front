'use client';

import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, Settings, Menu } from 'lucide-react';
import Link from 'next/link';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    // Ajoute ici ta logique de déconnexion (ex: Supabase, Firebase, etc.)
    router.push('/login');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-64 bg-gray-900 text-white p-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <nav className="flex flex-col gap-2">
            <Link href="/admin/dashboard" className="flex items-center gap-2 p-2 rounded hover:bg-gray-800">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-2 p-2 rounded hover:bg-gray-800">
              <Settings className="w-5 h-5" /> Paramètres
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
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
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
