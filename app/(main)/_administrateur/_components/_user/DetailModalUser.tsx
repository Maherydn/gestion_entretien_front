import React from "react";
import {
  Contact,
  FileDown,
  Plus,
  X,
  ShieldCheck,
  IdCard,
  MapPin,
  Phone,
  Mail,
  Cake,
  Briefcase,
} from "lucide-react";

interface UserDetailProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: number;
    name: string;
    firstName: string;
    birthday: string;
    speciality?: string;
    email: string;
    contact: string;
    adress: string;
    profilPath: string;
    role: string;
    status: string;
    cin?: {
      num: string;
      frontPicture: string;
      backPicture: string;
    };
    drivingLicense?: {
      frontPicture: string;
      backPicture: string;
    } | null;
  } | null;
}

const DetailModalUser = ({ isOpen, onClose, user }: UserDetailProps) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-md transition-opacity"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-5xl h-[95vh] sm:h-auto sm:max-h-[92vh] overflow-hidden bg-white shadow-2xl rounded-t-[2rem] sm:rounded-[2.5rem] border border-white flex flex-col animate-in slide-in-from-bottom sm:zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-white/80 backdrop-blur-md z-20">
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <ShieldCheck size={24} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Profil {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
              </h2>
              <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${user.status === "ACTIVE" ? "bg-emerald-500" : "bg-red-500"}`}
                ></span>
                ID: {user.id.toString().padStart(4, "0")}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="group w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 transition-all hover:bg-red-50"
          >
            <X
              size={20}
              strokeWidth={2.5}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-10 custom-scrollbar">
          <div className="grid grid-cols-12 gap-6 lg:gap-12">
            {/* Colonne Gauche */}
            <div className="col-span-12 lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-slate-100 pb-8 lg:pb-0 lg:pr-10">
              <div className="relative w-32 h-32 sm:w-48 sm:h-48 mb-6 group">
                <img
                  src={user.profilPath}
                  alt={user.name}
                  className="w-full h-full rounded-[2.5rem] object-cover border-4 border-white shadow-xl"
                />
                <div
                  className={`absolute -bottom-2 -right-2 w-8 h-8 border-4 border-white rounded-full shadow-lg ${user.status === "ACTIVE" ? "bg-emerald-500" : "bg-slate-300"}`}
                ></div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                {user.name}
                <br />
                <span className="text-indigo-600">{user.firstName}</span>
              </h3>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-4">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase">
                  {user.role}
                </span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase border border-emerald-100">
                  {user.status}
                </span>
              </div>
            </div>

            {/* Colonne Droite */}
            <div className="col-span-12 lg:col-span-8 py-4 lg:py-0 space-y-10">
              {/* Informations personnelles & Contact */}
              <section>
                <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-6 flex items-center">
                  <span className="w-8 h-[2px] bg-indigo-600 mr-3"></span>
                  Informations Générales
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Date de naissance */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Cake size={10} /> Date de naissance
                    </label>
                    <p className="text-sm sm:text-base text-slate-800 font-semibold">
                      {formatDate(user.birthday)}
                    </p>
                  </div>

                  {/* Spécialité */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Briefcase size={10} /> Spécialité
                    </label>
                    <p className="text-sm sm:text-base text-slate-800 font-semibold">
                      {user.speciality || "Non spécifiée"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Mail size={10} /> Email
                    </label>
                    <p className="text-sm sm:text-base text-slate-800 font-semibold break-all">
                      {user.email}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Phone size={10} /> Téléphone
                    </label>
                    <p className="text-sm sm:text-base text-slate-800 font-semibold italic">
                      {user.contact}
                    </p>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      <MapPin size={10} /> Adresse Physique
                    </label>
                    <p className="text-sm sm:text-base text-slate-800 font-semibold underline decoration-slate-200 decoration-2 italic">
                      {user.adress}
                    </p>
                  </div>
                </div>
              </section>

              {/* Documents */}
              <section>
                <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-6 flex items-center">
                  <span className="w-8 h-[2px] bg-indigo-600 mr-3"></span>
                  Documents Numérisés
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-500 mb-3 flex items-center gap-2">
                      <Contact className="w-4 h-4 text-indigo-600" /> CIN N°{" "}
                      {user.cin?.num || "N/A"}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {user.cin ? (
                        <>
                          <div className="aspect-video rounded-xl overflow-hidden shadow-sm border border-white">
                            <img
                              src={user.cin.frontPicture}
                              alt="CIN Front"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="aspect-video rounded-xl overflow-hidden shadow-sm border border-white">
                            <img
                              src={user.cin.backPicture}
                              alt="CIN Back"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </>
                      ) : (
                        <div className="col-span-2 py-4 text-center text-[10px] text-slate-400 italic">
                          Aucun document chargé
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-3xl border ${!user.drivingLicense ? "border-dashed border-slate-200 bg-white" : "bg-slate-50 border-slate-100"}`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <p
                        className={`text-[10px] font-bold flex items-center gap-2 ${!user.drivingLicense ? "text-slate-400" : "text-slate-500"}`}
                      >
                        <IdCard className="w-4 h-4 text-indigo-600" /> Permis 
                        Conduire
                      </p>
                      {!user.drivingLicense && (
                        <span className="text-[8px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded font-black uppercase">
                          Vide
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {user.drivingLicense ? (
                        <>
                          <div className="aspect-video rounded-xl overflow-hidden shadow-sm border border-white relative group">
                            <img
                              src={user.drivingLicense.frontPicture}
                              alt="License Front"
                              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition"></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                              <span className="text-black font-bold">
                                Voir plus
                              </span>
                            </div>
                          </div>
                          <div className="aspect-video rounded-xl overflow-hidden shadow-sm border border-white">
                            <img
                              src={user.drivingLicense.backPicture}
                              alt="License Back"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="aspect-video rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                            <Plus
                              className="text-slate-400"
                              size={20}
                              strokeWidth={2.5}
                            />
                          </div>
                          <div className="aspect-video rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                            <Plus
                              className="text-slate-400"
                              size={20}
                              strokeWidth={2.5}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button className="w-full sm:w-auto text-[11px] font-black text-red-500 hover:text-red-700 uppercase tracking-[0.2em] order-2 sm:order-1 transition-colors">
            Suspendre l&apos;accès
          </button>
          <div className="flex w-full sm:w-auto gap-3 order-1 sm:order-2">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors"
            >
              Fermer
            </button>
            <button className="flex-1 sm:flex-none px-6 py-3 rounded-2xl bg-slate-900 text-white text-sm font-bold shadow-xl shadow-slate-200 flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95">
              <FileDown size={18} strokeWidth={2.5} className="text-white" />
              <span>Exporter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModalUser;

const formatDate = (dateString: string) => {
  if (!dateString) return "Non spécifiée";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
