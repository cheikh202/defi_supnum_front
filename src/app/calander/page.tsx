// 'use client';

// import React, { useState, useMemo } from 'react';
// import Calendar from 'react-calendar'; // On n'a plus besoin d'importer DateCallback
// import 'react-calendar/dist/Calendar.css'; // Importation du style du calendrier
// import { Button } from '@/components/ui/button'; // Exemple de bouton de votre UI
// import { LogOut, LayoutDashboard, Settings } from 'lucide-react'; // Ajout des icônes pour la barre latérale
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// interface AdminLayoutProps {
//   children: React.ReactNode; // Typage du `children` comme ReactNode
// }

// const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
//   const router = useRouter();

//   const handleLogout = () => {
//     // Ajoute ici ta logique de déconnexion (ex: Supabase, Firebase, etc.)
//     router.push('/login');
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-900 text-white p-5 flex flex-col gap-4">
//         <h2 className="text-2xl font-bold">Admin Panel</h2>
//         <nav className="flex flex-col gap-2">
//           <Link href="/admin/dashboard" className="flex items-center gap-2 p-2 rounded hover:bg-gray-800">
//             <LayoutDashboard className="w-5 h-5" /> Dashboard
//           </Link>
//           <Link href="/admin/settings" className="flex items-center gap-2 p-2 rounded hover:bg-gray-800">
//             <Settings className="w-5 h-5" /> Paramètres
//           </Link>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Navbar */}
//         <header className="bg-white shadow p-4 flex justify-between items-center">
//           <h1 className="text-xl font-semibold">Admin Dashboard</h1>
//           <Button onClick={handleLogout} variant="destructive" className="flex items-center gap-2">
//             <LogOut className="w-5 h-5" /> Déconnexion
//           </Button>
//         </header>

//         {/* Page Content */}
//         <main className="p-6 flex-1 overflow-auto">{children}</main>
//       </div>
//     </div>
//   );
// };



// // Calendrier Page
// const CalendarPage: React.FC = () => {
//   const [date, setDate] = useState<Date | null>(new Date()); // Ajustement du type
//   const [events, setEvents] = useState<Map<string, string>>(new Map());

//   // Fonction pour gérer l'ajout d'un événement à une date
//   const handleEventChange = (date: Date, eventDescription: string) => {
//     const dateKey = date.toISOString().split('T')[0]; // Clé de la date au format yyyy-mm-dd
//     setEvents((prevEvents) => new Map(prevEvents).set(dateKey, eventDescription));
//   };

//   // Correction de la fonction handleChangeDate pour accepter null ou Date
//   const handleChangeDate = (newDate: Date | Date[] | null) => {
//     if (newDate instanceof Date) {
//       setDate(newDate); // Mise à jour de la date si c'est un objet Date
//     } else {
//       setDate(null); // Sinon, on réinitialise à null
//     }
//   };

//   // Calculer les événements du mois actuel
//   const currentMonth = useMemo(() => {
//     const monthKey = date?.toISOString().split('T')[0].slice(0, 7) || ''; // Ex : "2025-03"
//     return Array.from(events).filter(([key]) => key.startsWith(monthKey));
//   }, [events, date]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold">Calendrier Modifiable</h1>

//       {/* Calendrier React */}
//       <div className="mt-4 flex gap-6">
//         <Calendar
//           value={date}
//            // On passe handleChangeDate directement
//           tileContent={({ date, view }) => {
//             if (view === 'month') {
//               const dateKey = date.toISOString().split('T')[0]; // Ex : "2025-03-05"
//               const event = events.get(dateKey);
//               return event ? (
//                 <div className="bg-blue-200 p-1 rounded text-xs">{event}</div>
//               ) : null;
//             }
//           }}
//         />
        
//         {/* Détails de l'événement */}
//         <div className="flex-1 bg-gray-100 p-4 rounded shadow-md">
//           <h2 className="text-xl font-semibold">Événements du mois</h2>
//           <ul className="mt-4 space-y-2">
//             {currentMonth.map(([key, event], index) => (
//               <li key={index} className="flex justify-between">
//                 <span>{key}</span>
//                 <span>{event}</span>
//               </li>
//             ))}
//           </ul>

//           {/* Ajout d'un événement */}
//           <Button
//             onClick={() => handleEventChange(date as Date, prompt('Entrez un événement:') || '')}
//             className="mt-4"
//           >
//             Ajouter un événement
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarPage;
