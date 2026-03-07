import { ReactElement, useEffect, useState } from "react";
import {User} from "@heroui/react";
import { Car } from "../type";
interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: string;
  selectedUser?: typeof User;
  setImTitle?: (immatriculation : string)=> void;
  selectedCar?: Car;
  modalIndex?: string
}


const SupprModal: React.FC<AddCarModalProps> = ({
  isOpen,
  onClose,
  user,
  setImTitle,
  selectedUser,
  selectedCar,
  modalIndex
}) => {
  const [modalTitle,setModalTitle] = useState<string>('')
  const [modalForm,setModalForm] = useState<ReactElement>()
  const [loading, setLoading] = useState(false);
  useEffect(() => {
      switch (user) {
      case "Gerant":
        if (typeof selectedCar !== 'undefined'){
            setModalTitle("Suppression du vehicule no: "+selectedCar.immatriculation)
            setModalForm(
                <h2 className="text-lg font-semibold m-4">
                    Voulez-vous vraiment supprimer ce vehicule?
                </h2>
            )
        }
        else   
            setModalTitle("Suppression du vehicule")
        break;
      case "Administrateur":
        if (selectedUser !== undefined )
        {
            setModalTitle("Suppression de l'utilisateur IM : "+selectedUser.id)
            setModalForm(
                <h2 className="text-lg font-semibold m-4">
                    Voulez-vous vraiment supprimer cet utilisateur?
                </h2>
            )
        }
        else 
            setModalTitle("Profil utilisateur")
        break;
      default:
        if (selectedUser !== undefined )
            setModalTitle(selectedUser.nom+" "+selectedUser.prenom)
        break;
    }
  }, [ onClose, setImTitle, user,selectedUser]); // Optional dependency array
  return (
    <dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-100 bg-black/50 h-screen w-full"
      id={modalIndex || ''}
    >
      <div className="bg-white rounded-lg shadow-md w-fullshadow-lg p-6 dark:bg-slate-100 flex flex-col">
        <div className="flex justify-between w-full shadow-md mb-4">
          <h2 className="text-lg font-semibold m-4">
            {
              modalTitle
            }
          </h2>
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
                    // onClick={addNewUser}
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