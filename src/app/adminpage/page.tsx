'use client'

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import axios from "axios";

// Types
type Affectation = {
  id: number;
  enseignant: { nom: string };
  matiere: { nom: string };
  type_enseignement: string;
  filiere?: { nom: string };
  groupe?: { nom: string };
};

type Charge = {
  id: number;
  matiere: { nom: string };
  filiere?: { nom: string };
  groupe?: { nom: string };
  cm_heures: number;
  td_heures: number;
  tp_heures: number;
  reconduite: boolean;
};

export default function AdminPage() {
  const [affectations, setAffectations] = useState<Affectation[]>([]);
  const [charges, setCharges] = useState<Charge[]>([]);
  const [newAffectation, setNewAffectation] = useState({ enseignant: "", matiere: "", type_enseignement: "CM" });

  useEffect(() => {
    fetchAffectations();
    fetchCharges();
  }, []);

  const fetchAffectations = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/affectations_enseignants/");
      setAffectations(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des affectations :", error);
    }
  };

  const fetchCharges = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/charges_hebdomadaires/");
      setCharges(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des charges :", error);
    }
  };

  const handleAddAffectation = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/affectations_enseignants/", newAffectation);
      fetchAffectations();
      setNewAffectation({ enseignant: "", matiere: "", type_enseignement: "CM" });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'affectation :", error);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Tableau de bord Administrateur</h2>

      {/* Formulaire d'ajout d'affectation */}
      <Card className="shadow-lg rounded-lg p-4">
        <CardContent>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Ajouter une Affectation</h3>
          <div className="grid grid-cols-3 gap-4">
            <Input
              placeholder="Enseignant"
              value={newAffectation.enseignant}
              onChange={(e) => setNewAffectation({ ...newAffectation, enseignant: e.target.value })}
            />
            <Input
              placeholder="Matière"
              value={newAffectation.matiere}
              onChange={(e) => setNewAffectation({ ...newAffectation, matiere: e.target.value })}
            />
            <Select
              value={newAffectation.type_enseignement}
              onValueChange={(value) => setNewAffectation({ ...newAffectation, type_enseignement: value })}
            >
              <SelectTrigger>{newAffectation.type_enseignement}</SelectTrigger>
              <SelectContent>
                <SelectItem value="CM">Cours Magistral</SelectItem>
                <SelectItem value="TD">Travaux Dirigés</SelectItem>
                <SelectItem value="TP">Travaux Pratiques</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold" onClick={handleAddAffectation}>
            Ajouter
          </Button>
        </CardContent>
      </Card>

      {/* Tableau des affectations */}
      <Card className="shadow-lg rounded-lg p-4">
        <CardContent>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Affectations des Enseignants</h3>
          <Table className="border border-gray-200 rounded-lg">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableCell className="font-semibold">Enseignant</TableCell>
                <TableCell className="font-semibold">Matière</TableCell>
                <TableCell className="font-semibold">Type</TableCell>
                <TableCell className="font-semibold">Filière/Groupe</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {affectations.length > 0 ? (
                affectations.map((affectation) => (
                  <TableRow key={affectation.id} className="hover:bg-gray-50">
                    <TableCell>{affectation.enseignant.nom}</TableCell>
                    <TableCell>{affectation.matiere.nom}</TableCell>
                    <TableCell>{affectation.type_enseignement}</TableCell>
                    <TableCell>{affectation.filiere ? affectation.filiere.nom : affectation.groupe?.nom}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    Aucune affectation trouvée.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
