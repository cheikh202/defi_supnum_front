
import ProfessorLayout from "./layout";
export default function ProfessorPage() {
  return (
    
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-3xl font-bold text-blue-900">Bienvenue, Professeur !</h2>
        <p className="text-gray-600 mt-2">
          Gérez vos cours et interagissez avec vos étudiants facilement.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Cours */}
          <div className="bg-blue-100 p-4 rounded-lg shadow flex flex-col items-center">
            <h3 className="text-xl font-semibold text-blue-900">Mes Cours</h3>
            <p className="text-gray-700 text-center mt-2">Consultez et gérez vos cours.</p>
          </div>

          {/* Card Étudiants */}
          <div className="bg-green-100 p-4 rounded-lg shadow flex flex-col items-center">
            <h3 className="text-xl font-semibold text-green-900">Étudiants</h3>
            <p className="text-gray-700 text-center mt-2">Accédez aux informations de vos étudiants.</p>
          </div>

          {/* Card Paramètres */}
          <div className="bg-yellow-100 p-4 rounded-lg shadow flex flex-col items-center">
            <h3 className="text-xl font-semibold text-yellow-900">Paramètres</h3>
            <p className="text-gray-700 text-center mt-2">Personnalisez votre espace.</p>
          </div>
        </div>
      </div>
      
  );
}
