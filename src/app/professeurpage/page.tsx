'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const creneaux = [
  '08:00 - 09:30',
  '09:45 - 11:15',
  '11:30 - 13:00',
  '15:00 - 16:30',
  '17:00 - 18:30',
];

export default function DisponibilitesProf() {
  const [disponibilites, setDisponibilites] = useState<Record<string, Set<string>>>({});

  const toggleDisponibilite = (jour: string, creneau: string) => {
    setDisponibilites((prev) => {
      const updated = structuredClone(prev);
      if (!updated[jour]) updated[jour] = new Set();
      if (updated[jour].has(creneau)) {
        updated[jour].delete(creneau);
      } else {
        updated[jour].add(creneau);
      }
      return { ...updated };
    });
  };

  const resetDisponibilites = () => {
    setDisponibilites({});
  };

  const envoyerReponse = () => {
    const disponibilitesFinales = Object.fromEntries(
      Object.entries(disponibilites).map(([jour, creneaux]) => [jour, Array.from(creneaux)])
    );
    console.log('Disponibilités envoyées:', disponibilitesFinales);
    alert('Vos disponibilités ont été enregistrées.');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sélectionnez vos disponibilités</h1>
      <div className="overflow-auto border rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Créneaux</th>
              {jours.map((jour) => (
                <th key={jour} className="border p-3">{jour}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {creneaux.map((creneau) => (
              <tr key={creneau}>
                <td className="border p-3 font-semibold">{creneau}</td>
                {jours.map((jour) => (
                  <td key={jour} className="border p-3 text-center">
                    <input
                      type="checkbox"
                      checked={disponibilites[jour]?.has(creneau) || false}
                      onChange={() => toggleDisponibilite(jour, creneau)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-4 mt-4">
        <Button onClick={envoyerReponse}>Envoyer ma réponse</Button>
        <Button onClick={resetDisponibilites} variant="outline" className="flex items-center gap-2">
          <RotateCcw className="w-5 h-5" /> Réinitialiser
        </Button>
      </div>
    </div>
  );
}