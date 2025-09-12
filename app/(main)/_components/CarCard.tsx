"use client";

interface CarCardProps {
  immatriculation: string;
  kilometrage: number;
  visiteTechnique: string;
  assurance: string;
  etat: string;
  imageUrl?: string;
}

const CarCard = ({
  immatriculation,
  kilometrage,
  visiteTechnique,
  assurance,
  etat,
  imageUrl,
}: CarCardProps) => {
  return (
    <div className="flex flex-col h-96 w-64 min-w-0 rounded-lg overflow-hidden shadow-md">
      {/* Image ou placeholder */}
      <div className="w-full h-3/5 bg-orange-50 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={immatriculation} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-500">Pas d’image</span>
        )}
      </div>

      {/* Infos véhicule */}
      <div className="flex flex-col items-center p-2 flex-1 bg-jaune">
        <div className="flex w-full items-center">
          <h3 className="w-3/5 text-lg font-semibold capitalize">Immatriculation</h3>
          <p>: {immatriculation}</p>
        </div>
        <div className="flex w-full items-center">
          <h3 className="w-3/5 text-lg font-semibold capitalize">Kilométrage</h3>
          <p>: {kilometrage.toLocaleString()} km</p>
        </div>
        <div className="flex w-full items-center">
          <h3 className="w-3/5 text-lg font-semibold capitalize">Visite technique</h3>
          <p>: {visiteTechnique}</p>
        </div>
        <div className="flex w-full items-center">
          <h3 className="w-3/5 text-lg font-semibold capitalize">Assurance</h3>
          <p>: {assurance}</p>
        </div>
        <div className="flex w-full items-center">
          <h3 className="w-3/5 text-lg font-semibold capitalize">État</h3>
          <p>: {etat}</p>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
