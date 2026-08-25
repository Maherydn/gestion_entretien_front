/* eslint-disable @next/next/no-img-element */
import { User } from "@/app/(main)/type";
import { ROLE_CONFIG, STATUS_CONFIG } from "@/app/constants/enums";
import { DownloadIcon } from "../../../_assets/icon";
import { p } from "framer-motion/client";
import {
  Briefcase,
  Cake,
  Contact,
  FileDown,
  IdCard,
  Mail,
  MapPin,
  Phone,
  Plus,
  ShieldCheck,
  X,
} from "lucide-react";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";

const handleExportImg = async (
  path: string | undefined,
  fileName: string | undefined,
) => {
  try {
    const urls =
      process.env.NEXT_PUBLIC_API_URL + "users/download/photo/" + path;

    if (!path) {
      console.log("Aucun chemin de fichier fourni pour l'exportation.");
      return;
    }
    const token = localStorage.getItem("token");
    const response = await fetch(urls, {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });

    if (!response.ok) throw new Error("Erreur lors de la génération");

    // Conversion de la réponse en Blob
    const blob = await response.blob();

    // Création du lien de téléchargement
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    // On peut dynamiser le nom du fichier ici aussi

    link.download = fileName ? fileName : "";
    document.body.appendChild(link);
    link.click();

    // Nettoyage de la mémoire
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Export échoué", error);
  }
};
const handleExportPdf = async (path: string | undefined, fileName: string) => {
  console.log("Export PDF : " + fileName);
  try {
    if (!path) {
      console.log("Aucun chemin de fichier fourni pour l'exportation.");
      return;
    }
    const file = path.split("\\").at(-1); // Extraire le nom du fichier du chemin
    console.log("File to download:", file);
    const urls = process.env.NEXT_PUBLIC_API_URL + "users/download/pdf/" + file;
    const link = document.createElement("a");
    link.href = urls;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error("Export PDF échoué :", error);
  }
};

const hoverDownloadIcon = (
  <>
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition"></div>
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
      <DownloadIcon />
    </div>
  </>
);
interface DetailUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: string;
  selectedUser?: User;
  setImTitle?: (immatriculation: string) => void;
  modalIndex?: string;
  confirmModal?: () => void;
  isProfile?: boolean;
}

const DetailUserModal: React.FC<DetailUserModalProps> = ({
  isOpen,
  onClose,
  user,
  setImTitle,
  selectedUser,
  modalIndex,
  confirmModal,
  isProfile = false,
}) => {
  const [modalTitle, setModalTitle] = useState<string>("");
  // const [modalForm, setModalForm] = useState<ReactElement>();

  useEffect(() => {
    switch (user) {
      case "Gerant":
        if (typeof selectedUser !== "undefined") {
          setModalTitle("Modifier le vehicule no:  ");
        } else setModalTitle("Ajout d'une nouvelle voiture");
        break;
      case "ADMIN":
        if (selectedUser !== undefined)
          setModalTitle(selectedUser.name + " " + selectedUser.firstName);
        else setModalTitle("Profil utilisateur");
        break;
      default:
        if (selectedUser !== undefined)
          setModalTitle(selectedUser.name + " " + selectedUser.firstName);
        break;
    }
  }, [onClose, setImTitle, user, selectedUser]); // Optional dependency array
  const role = ROLE_CONFIG[selectedUser?.role as keyof typeof ROLE_CONFIG];
  const statut =
    STATUS_CONFIG[selectedUser?.status as keyof typeof STATUS_CONFIG];
  return (
    <dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 h-screen w-full"
      id={modalIndex || ""}
    >
      <div className="relative w-full max-w-5xl h-[95vh] sm:h-auto sm:max-h-[92vh] overflow-hidden bg-white shadow-2xl rounded-t-[2rem] sm:rounded-[2.5rem] border border-white flex flex-col animate-in slide-in-from-bottom sm:zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-white/80 backdrop-blur-md z-20">
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-vert flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <ShieldCheck size={24} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Profil {role.label}
              </h2>
              <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${selectedUser?.status === "ACTIVE" ? "bg-emerald-500" : "bg-red-500"}`}
                ></span>
                ID: {selectedUser?.id.toString().padStart(4, "0")}
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
                  src={
                    process.env.NEXT_PUBLIC_API_URL && selectedUser?.profilPath
                      ? process.env.NEXT_PUBLIC_API_URL +
                        selectedUser.profilPath
                      : process.env.NEXT_PUBLIC_API_URL +
                        "uploads\\users\\photo_profils\\default-profile.png"
                  }
                  alt={selectedUser?.name}
                  className="w-full h-full rounded-[2.5rem] object-cover border-4 border-white shadow-xl"
                />
                <div
                  className={`absolute -bottom-2 -right-2 w-8 h-8 border-4 border-white rounded-full shadow-lg ${selectedUser?.status === "ACTIVE" ? "bg-emerald-500" : "bg-slate-300"}`}
                ></div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                {selectedUser?.name.toLocaleUpperCase()}
                <br />
                <span className="text-jaune">{selectedUser?.firstName}</span>
              </h3>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-4">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase">
                  {role.label}
                </span>
                <span
                  className={`px-3 py-1 ${statut.textColor} ${statut.bgColor} text-[10px] font-bold rounded-full uppercase `}
                >
                  {statut.label}
                </span>
              </div>
            </div>

            {/* Colonne Droite */}
            <div className="col-span-12 lg:col-span-8 py-4 lg:py-0 space-y-10">
              {/* Informations personnelles & Contact */}
              <section>
                <h4 className="text-[11px] font-black text-jaune uppercase tracking-[0.2em] mb-6 flex items-center">
                  <span className="w-8 h-[2px] bg-jaune mr-3"></span>
                  Informations Générales
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Date de naissance */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Cake size={10} /> Date de naissance
                    </label>
                    <p className="text-sm sm:text-base text-slate-800 font-semibold">
                      {formatDate(selectedUser?.birthday)}
                    </p>
                  </div>

                  {/* Spécialité */}
                  {selectedUser?.speciality ? (
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                        <Briefcase size={10} /> Spécialité
                      </label>
                      <p className="text-sm sm:text-base text-slate-800 font-semibold">
                        {selectedUser?.speciality || "Non spécifiée"}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Mail size={10} /> Email
                    </label>
                    <p className="text-sm sm:text-base text-slate-800 font-semibold break-all">
                      {selectedUser?.email}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Phone size={10} /> Téléphone
                    </label>
                    <p className="text-sm sm:text-base text-slate-800 font-semibold italic">
                      {selectedUser?.contact}
                    </p>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      <MapPin size={10} /> Adresse Physique
                    </label>
                    <p className="text-sm sm:text-base text-slate-800 font-semibold underline decoration-slate-200 decoration-2 italic">
                      {selectedUser?.adress}
                    </p>
                  </div>
                </div>
              </section>

              {/* Documents */}
              <section>
                <h4 className="text-[11px] font-black text-jaune uppercase tracking-[0.2em] mb-6 flex items-center">
                  <span className="w-8 h-[2px] bg-jaune mr-3"></span>
                  Documents Numérisés
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-500 mb-3 flex items-center gap-2">
                      <Contact className="w-4 h-4 text-jaune" /> CIN N°{" "}
                      {selectedUser?.cin?.num || "N/A"}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedUser?.cin?.frontPicture &&
                      selectedUser?.cin?.backPicture ? (
                        <>
                          <div
                            className="aspect-video rounded-xl overflow-hidden shadow-sm border border-white relative group"
                            onClick={() =>
                              handleExportImg(
                                selectedUser?.cin?.frontPicture,
                                selectedUser?.name +
                                  "_" +
                                  selectedUser?.firstName +
                                  "_front_cin.png",
                              )
                            }
                          >
                            <img
                              src={
                                process.env.NEXT_PUBLIC_API_URL &&
                                selectedUser?.cin?.frontPicture
                                  ? process.env.NEXT_PUBLIC_API_URL +
                                    selectedUser?.cin?.frontPicture
                                  : process.env.NEXT_PUBLIC_API_URL + ""
                              }
                              alt="CIN Front"
                              className="w-full h-full object-cover"
                            />
                            {hoverDownloadIcon}
                          </div>
                          <div
                            className="aspect-video rounded-xl overflow-hidden shadow-sm border border-white relative group"
                            onClick={() =>
                              handleExportImg(
                                selectedUser?.cin?.backPicture,
                                selectedUser?.name +
                                  "_" +
                                  selectedUser?.firstName +
                                  "_back_cin.png",
                              )
                            }
                          >
                            <img
                              src={
                                process.env.NEXT_PUBLIC_API_URL &&
                                selectedUser?.cin?.backPicture
                                  ? process.env.NEXT_PUBLIC_API_URL +
                                    selectedUser?.cin?.backPicture
                                  : process.env.NEXT_PUBLIC_API_URL + ""
                              }
                              alt="CIN Back"
                              className="w-full h-full object-cover"
                            />
                            {hoverDownloadIcon}
                          </div>
                        </>
                      ) : (
                        <div className="col-span-2 py-4 text-center text-[10px] text-slate-400 italic">
                          Aucun document
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-3xl border ${!selectedUser?.drivingLicense ? "border-dashed border-slate-200 bg-white" : "bg-slate-50 border-slate-100"}`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <p
                        className={`text-[10px] font-bold flex items-center gap-2 ${!selectedUser?.drivingLicense ? "text-slate-400" : "text-slate-500"}`}
                      >
                        <IdCard className="w-4 h-4 text-jaune" /> Permis de
                        Conduire n° {selectedUser?.drivingLicense?.num || "N/A"}
                      </p>
                      {!selectedUser?.drivingLicense && (
                        <span className="text-[8px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded font-black uppercase">
                          Vide
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedUser?.drivingLicense?.backPicture &&
                      selectedUser?.drivingLicense?.frontPicture ? (
                        <>
                          <div
                            className="aspect-video rounded-xl overflow-hidden shadow-sm border border-white relative group"
                            onClick={() =>
                              handleExportImg(
                                selectedUser?.drivingLicense?.frontPicture,
                                selectedUser?.name +
                                  "_" +
                                  selectedUser?.firstName +
                                  "_front_permis.png",
                              )
                            }
                          >
                            <img
                              src={
                                process.env.NEXT_PUBLIC_API_URL &&
                                selectedUser?.drivingLicense?.frontPicture
                                  ? process.env.NEXT_PUBLIC_API_URL +
                                    selectedUser?.drivingLicense?.frontPicture
                                  : process.env.NEXT_PUBLIC_API_URL + ""
                              }
                              alt="License Front"
                              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                            />
                            {hoverDownloadIcon}
                          </div>
                          <div
                            className="aspect-video rounded-xl overflow-hidden shadow-sm border border-white relative group"
                            onClick={() =>
                              handleExportImg(
                                selectedUser?.drivingLicense?.backPicture,
                                selectedUser?.name +
                                  "_" +
                                  selectedUser?.firstName +
                                  "_back_permis.png",
                              )
                            }
                          >
                            <img
                              src={
                                process.env.NEXT_PUBLIC_API_URL &&
                                selectedUser?.drivingLicense?.backPicture
                                  ? process.env.NEXT_PUBLIC_API_URL +
                                    selectedUser?.drivingLicense?.backPicture
                                  : process.env.NEXT_PUBLIC_API_URL + ""
                              }
                              alt="License Back"
                              className="w-full h-full object-cover"
                            />
                            {hoverDownloadIcon}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-span-2 py-4 text-center text-[10px] text-slate-400 italic">
                            Aucun document
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
          {isProfile ? (
            <div></div>
          ) : (
            <button
              className={`}w-full sm:w-auto text-[11px] font-black uppercase tracking-[0.2em] order-2 sm:order-1 transition-colors ${selectedUser?.acces ? "text-red-500 hover:text-red-700" : "text-green-500 hover:text-green-700"}`}
              // onClick={()=>handleChangeAcces(selectedUser?.acces)}
              onClick={confirmModal}
            >
              {selectedUser?.acces ? "Suspendre l'accès" : "Restaurer l'accès"}
            </button>
          )}
          <div className="flex w-full sm:w-auto gap-3 order-1 sm:order-2">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors"
            >
              Fermer
            </button>
            <button
              className={`flex-1 sm:flex-none px-6 py-3 rounded-2xl bg-slate-900 text-white text-sm font-bold shadow-xl shadow-slate-200 flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95`}
              onClick={() =>
                handleExportPdf(
                  selectedUser?.cv?.at(-1)?.filePath
                    ? selectedUser?.cv?.at(-1)?.filePath
                    : undefined,
                  selectedUser?.name +
                    "_" +
                    selectedUser?.firstName +
                    "_cv.pdf",
                )
              }
            >
              <FileDown size={18} strokeWidth={2.5} className="text-white" />
              <span>Exporter CV</span>
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default DetailUserModal;
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "Non spécifiée";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
