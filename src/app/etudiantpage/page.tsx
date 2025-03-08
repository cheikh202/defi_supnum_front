import StudentLayout from './layout';

export default function StudentPage() {
  return (
    
      <div className="bg-white shadow-lg p-6 rounded-lg text-center">
        <h2 className="text-3xl font-bold text-blue-900">Bienvenue, Étudiant !</h2>
        <p className="text-gray-600 mt-2">
          Consultez vos cours et suivez votre progression facilement.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Mes Cours */}
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-900">Mes Cours</h3>
            <p className="text-gray-700 mt-2">Accédez à tous vos cours et leçons.</p>
          </div>

          {/* Card Progression */}
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-green-900">Progression</h3>
            <p className="text-gray-700 mt-2">Suivez votre avancement et vos notes.</p>
          </div>
        </div>
      </div>
    
  );
}
