'use client'

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import axios from "axios";

type Enseignant = { id_Es: number; nom: string };
type Matiere = { id: number; nom: string };
type Groupe = { id: number; nom: string };

type Affectation = {
  id:number;
  enseignant: Enseignant;
  matiere: Matiere;
  type_enseignement: string;
  groupe?: Groupe | null;
};

const defaultAffectation: Affectation = {
  id:0,
  enseignant: { id_Es: 0, nom: "" },
  matiere: { id: 0, nom: "" },
  type_enseignement: "CM",
  groupe: null,
};

export default function AdminPage() {
  const [affectations, setAffectations] = useState<Affectation[]>([]);
  const [enseignants, setEnseignants] = useState<Enseignant[]>([]);
  const [matieres, setMatieres] = useState<Matiere[]>([]);
  const [groupes, setGroupes] = useState<Groupe[]>([]);
  const [newAffectation, setNewAffectation] = useState<Affectation>(defaultAffectation);

  useEffect(() => {
    fetchEnseignants();
    fetchMatieres();
    fetchAffectations();
    fetchGroupes();
  }, []);

  const fetchEnseignants = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/enseignants/");
      setEnseignants(data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des enseignants :", error);
    }
  };

  const fetchMatieres = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/matieres/");
      setMatieres(data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des matières :", error);
    }
  };

  const fetchAffectations = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/affectations_enseignants/");
      setAffectations(data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des affectations :", error);
    }
  };

  const fetchGroupes = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/groupes");
      setGroupes(data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des groupes :", error);
    }
  };

  const handleAddAffectation = async () => {
    try {
      const payload = {
        enseignant: newAffectation.enseignant,  
        matiere: newAffectation.matiere,          
        type_enseignement: newAffectation.type_enseignement,
        groupe: newAffectation.groupe ? newAffectation.groupe : null 
      };
      await axios.post("http://127.0.0.1:8000/api/affectations_enseignants/", payload);
      fetchAffectations();
      setNewAffectation(defaultAffectation);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'affectation :", error);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Tableau de bord Administrateur</h2>
      <Card className="shadow-lg rounded-lg p-4">
        <CardContent>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Ajouter une Affectation</h3>
          <div className="grid grid-cols-3 gap-4">
            <Select
              onValueChange={(value) =>
                setNewAffectation({ ...newAffectation, enseignant: enseignants.find(e => e.id_Es.toString() === value) || defaultAffectation.enseignant })
              }
              value={newAffectation.enseignant.id_Es ? newAffectation.enseignant.id_Es.toString() : ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir un enseignant" />
              </SelectTrigger>
              <SelectContent>
                {enseignants.map((ens) => (
                  <SelectItem key={ens.id_Es} value={ens.id_Es.toString()}>{ens.nom}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                setNewAffectation({ ...newAffectation, matiere: matieres.find(m => m.id.toString() === value) || defaultAffectation.matiere })
              }
              value={newAffectation.matiere.id ? newAffectation.matiere.id.toString() : ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir une matière" />
              </SelectTrigger>
              <SelectContent>
                {matieres.map((mat) => (
                  <SelectItem key={mat.id} value={mat.id.toString()}>{mat.nom}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => setNewAffectation({ ...newAffectation, type_enseignement: value, groupe: value === "CM" ? null : newAffectation.groupe })}
              value={newAffectation.type_enseignement}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type d'enseignement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CM">Cours Magistral</SelectItem>
                <SelectItem value="TD">Travaux Dirigés</SelectItem>
                <SelectItem value="TP">Travaux Pratiques</SelectItem>
              </SelectContent>
            </Select>
            
            {(newAffectation.type_enseignement === "TD" || newAffectation.type_enseignement === "TP") && (
              <Select
                onValueChange={(value) =>
                  setNewAffectation({ ...newAffectation, groupe: groupes.find(g => g.nom.toString() === value) || null })
                }
                value={newAffectation.groupe ? newAffectation.groupe.nom.toString() : ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un groupe" />
                </SelectTrigger>
                <SelectContent>
                  {groupes.map((groupe) => (
                    <SelectItem key={groupe.nom} value={groupe.nom.toString()}>{groupe.nom}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold" onClick={handleAddAffectation}>Ajouter</Button>
        </CardContent>
      </Card>
      <Card className="shadow-lg rounded-lg p-4">
        <CardContent>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Affectations des Enseignants</h3>
          <Table className="border border-gray-200 rounded-lg">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableCell className="font-semibold">Enseignant</TableCell>
                <TableCell className="font-semibold">Matière</TableCell>
                <TableCell className="font-semibold">Type</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {affectations.map((aff) => (
                <TableRow key={`affectation-${aff.id}`} className="hover:bg-gray-50">
                  <TableCell>{aff.enseignant?.nom || "N/A"}</TableCell>
                  <TableCell>{aff.matiere?.nom || "N/A"}</TableCell>
                  <TableCell>{aff.type_enseignement}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

