"use client";
import Link from "next/link";
interface CarCardProps {
  id?: number;
  immatriculation: string;
  kilometrage: number;
  visiteTechnique?: string;
  assurance?: string;
  etat: string;
  imageUrl?: string;
  user?: string;
  notif?: number;
}

const statusColorMap: Record<string, string> = {
  ACTIVE: "bg-vert",
  BROKEN: "bg-rouge",
  REPAIR: "bg-blue-400",
};
const statusLabelMap: Record<string, string> = {
  ACTIVE: "EN SERVICE",
  BROKEN: "EN PANNE",
  REPAIR: "EN REPARATION",
};

const CarCard = ({
  id,
  immatriculation,
  kilometrage,
  visiteTechnique,
  assurance,
  etat,
  imageUrl,
  user,
  notif
}: CarCardProps) => {
  const bulleNotif = (
    <div className="absolute top-[-2%] right-[-6%] bg-rouge px-3 py-1 text-white text-xl font-bold rounded-full">
      {notif}
    </div>
  );
  const linkGerant = `/details/${id}?im=${immatriculation}&id=${id}`;
  const linkChauffeur = `/details/${id}/driver?im=${immatriculation}&id=${id}`;
  return (
    <Link href={user === "FLEETMANAGEMENT" ? linkGerant : linkChauffeur}>
      <div className="relative">
        <div className="flex flex-col h-96 w-64 min-w-0 rounded-sm overflow-hidden shadow-md relative">
          {/* Image ou placeholder */}
          <div className="w-full h-3/5 bg-orange-50 flex items-center justify-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={immatriculation}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500">Pas d’image</span>
            )}
          </div>

          {/* Infos véhicule */}
          <div className="flex flex-col items-center p-2 flex-1 bg-jaune">
            <div className="flex w-full items-center">
              <h3 className="w-3/5 text-lg font-semibold capitalize">N°</h3>
              <p>: {immatriculation}</p>
            </div>
            <div className="flex w-full items-center">
              <h3 className="w-3/5 text-lg font-semibold capitalize">KM</h3>
              <p>: {kilometrage.toLocaleString()} km</p>
            </div>
            <div className="flex w-full items-center">
              <h3 className="w-3/5 text-lg font-semibold capitalize">
                Visite technique
              </h3>
              <p>: {visiteTechnique}</p>
            </div>
            <div className="flex w-full items-center">
              <h3 className="w-3/5 text-lg font-semibold capitalize">
                Assurance
              </h3>
              <p>: {assurance}</p>
            </div>
          </div>
          <div
            className={`flex w-full items-center justify-center ${statusColorMap[etat.toLocaleUpperCase()] || "bg-gray-500"}`}
          >
            <p className="flex text-lg font-semibold capitalize text-white text-center">
              {statusLabelMap[etat.toLocaleUpperCase()] || etat}
            </p>
          </div>
        </div>
        {user === "FLEETMANAGEMENT" ? bulleNotif : ""}
      </div>
    </Link>
  );
};

export default CarCard;
