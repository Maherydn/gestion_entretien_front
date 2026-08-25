import { ReactElement, useEffect, useState } from "react";
import { User } from "../type";
import { Car } from "../type";
import { toast } from "react-hot-toast";
// import {useRouter} from "next/router";
// import useSWR, { mutate } from 'swr';
interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: string;
  selectedUser?: User;
  setImTitle?: (immatriculation: string) => void;
  selectedCar?: Car;
  modalIndex?: string;
  mutate?: () => Promise<User[] | Car[] | void>;
}

const SupprModal: React.FC<AddCarModalProps> = ({
  isOpen,
  onClose,
  user,
  setImTitle,
  selectedUser,
  selectedCar,
  modalIndex,
  mutate,
}) => {
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalForm, setModalForm] = useState<ReactElement>();
  const [loading, setLoading] = useState(false);
  // const router = useRouter();
  const deleteUser = async (id: number) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); 
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) throw new Error("Erreur delete");

      const result = await res.json();
      console.log("Réponse API :", result);
      // console.log(data);
      toast.success(`Utilisateur supprimer avec succes`);
      onClose();
      if (mutate) {
        await mutate();
      }
      // router.reload();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression de l'utilisateur");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    switch (user) {
      case "Gerant":
        if (selectedCar !== undefined) {
          setModalTitle(
            "Suppression du vehicule no: " + selectedCar.immatriculation,
          );
          setModalForm(
            <h2 className="text-lg font-semibold m-4">
              Voulez-vous vraiment supprimer ce vehicule?
            </h2>,
          );
        } else setModalTitle("Suppression du vehicule");
        break;
      case "ADMIN":
        if (selectedUser !== undefined) {
          setModalTitle(
            "Suppression de l'utilisateur Nom : " + selectedUser.name,
          );
          setModalForm(
            <h2 className="text-lg font-semibold m-4">
              Voulez-vous vraiment supprimer cet utilisateur?
            </h2>,
          );
        } else setModalTitle("Profil utilisateur");
        break;
      default:
        if (selectedUser !== undefined)
          setModalTitle(selectedUser.name + " " + selectedUser.firstName);
        break;
    }
  }, [user, selectedUser, selectedCar]); // Optional dependency array
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
            onClick={() => selectedUser?.id && deleteUser(selectedUser.id)}
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

export default SupprModal;
