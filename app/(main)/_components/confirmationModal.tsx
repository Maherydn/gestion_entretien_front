import { ReactElement, useEffect, useState } from "react";
import { User } from "../type";
import { Car } from "../type";
import { toast } from "react-hot-toast";
// import {useRouter} from "next/router";
// import useSWR, { mutate } from 'swr';
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCloseParent: () => void;
  user?: string;
  selectedUser?: User;
  modalIndex?: string;
  mutate?: () => Promise<User[] | void>;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onCloseParent,
  user,
  selectedUser,
  modalIndex,
  mutate,
}) => {
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalForm, setModalForm] = useState<ReactElement>();
  const [loading, setLoading] = useState(false);
  const handleChangeAcces = async (acces: boolean | undefined) => {
    try {
      const url = acces
        ? `${process.env.NEXT_PUBLIC_API_URL}users/${selectedUser?.id}/disable`
        : `${process.env.NEXT_PUBLIC_API_URL}users/${selectedUser?.id}/enable`;

      const method = "PUT";

      const token = localStorage.getItem("token");
      const res = await fetch(url, {
        method,
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      if (!res.ok) throw new Error("Erreur API");

      const result = await res.json();
      toast.success(`Accès ${acces ? "suspendu" : "restauré"} avec succès !`);
      onClose();
      onCloseParent(); 
      if (mutate) {
        console.log("Mutating data...");
        await mutate();
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'envoi du formulaire");
    }
  };

  useEffect(() => {
    switch (user) {
      case "ADMIN":
        if (selectedUser !== undefined) {
          if (selectedUser.acces) {
            setModalTitle("Suspension d'acces");
            setModalForm(
              <h2 className="text-lg font-semibold m-4">
                Voulez-vous vraiment suspendre l&apos;acces de cet utilisateur?
              </h2>,
            );
          } else {
            setModalTitle("Restauration d'acces");
            setModalForm(
              <h2 className="text-lg font-semibold m-4">
                Voulez-vous vraiment restaurer l&apos;acces de cet utilisateur?
              </h2>,
            );
          }
        } else setModalTitle("Profil utilisateur");
        break;
      default:
        if (selectedUser !== undefined)
          setModalTitle(selectedUser.name + " " + selectedUser.firstName);
        break;
    }
  }, [user, selectedUser]); // Optional dependency array
  return (
    <dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-100 bg-black/50 h-screen w-full"
      id={modalIndex || ""}
    >
      <div className="bg-white rounded-lg shadow-md w-fullshadow-lg p-6 dark:bg-slate-100 flex flex-col">
        <div className="flex justify-between w-full shadow-md mb-4">
          <h2 className="text-lg font-semibold m-4">{modalTitle}</h2>
          <button
            onClick={onClose}
            className="rounded-md text-slate-800 hover:bg-red-500  w-6 h-6 text-xl flex justify-center items-center pb-px cursor-pointer hover:text-white duration-300 m-4"
          >
            <p className="mb-2">x</p>
          </button>
        </div>
        {modalForm}
        <div className="mt-6 space-x-2  flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-amber-800 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md w-1/4 transition-colors duration-200 disabled:opacity-50"
          >
            NON
          </button>
          <button
            type="button"
            onClick={() => selectedUser?.id && handleChangeAcces(selectedUser.acces)}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md w-1/4 transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? "Envoi..." : "OUI"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmationModal;
