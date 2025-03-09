'use client'
import { useState, useEffect } from 'react';
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
  const [datesJours, setDatesJours] = useState<Record<string, string>>({});
  const [user, setUser] = useState<{ id: number, nom: string }>({ id: 0, nom: '' });

  useEffect(() => {
    const id_u = localStorage.getItem('id_u');
    fetch(`http://127.0.0.1:8000/user/${id_u}`)
      .then((res) => res.json())
      .then((data) => setUser({ id: data.id_u, nom: data.login }))
      .catch((error) => console.error('Erreur lors du chargement des informations utilisateur:', error));

    fetch('http://127.0.0.1:8000/api/jours-semaine/')
      .then((res) => res.json())
      .then((data) => {
        const mappedDates: Record<string, string> = {};
        data.forEach((item: { id_jrs: number; date_jour: string }) => {
          const jour = jours[item.id_jrs - 1];
          mappedDates[jour] = item.date_jour;
        });
        setDatesJours(mappedDates);
      })
      .catch((error) => console.error('Erreur lors du chargement des dates:', error));
  }, []);

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

  const envoyerReponse = async () => {
    const disponibilitesFinales = Object.fromEntries(
      Object.entries(disponibilites).map(([jour, creneaux]) => [jour, Array.from(creneaux)]),
    );

    const dataToSend = {
      enseignant_id: user.id,
      enseignant_nom: user.nom,
      disponibilites: disponibilitesFinales,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/enseignants/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'enregistrement des disponibilités');
      }

      alert('Vos disponibilités ont été enregistrées.');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des disponibilités:', error);
      alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
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
                <th key={jour} className="border p-3">
                  <div>{jour}</div>
                  <div className="text-sm text-gray-500">{datesJours[jour] || 'Chargement...'}</div>
                </th>
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
