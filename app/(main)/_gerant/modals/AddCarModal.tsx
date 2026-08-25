import { ReactElement, useEffect, useState } from "react";
import { Car, User } from '../../type';
import AddCarForm from '../formulaires/AddCarForm';
import AddUserForm from "../../_administrateur/_components/formulaires/AddUserForm";
import { X } from "lucide-react";
interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: string;
  selectedCar?: Car;
  selectedUser?: User;
  setCars?: (values: Car) => void;
  cars?: Car[];
  setImTitle?: (immatriculation : string)=> void;
  modalIndex?: string
  mutate?: () => Promise<User[] | undefined>;
  users?: User[];
}


const AddCarModal: React.FC<AddCarModalProps> = ({
  isOpen,
  onClose,
  selectedCar,
  user,
  setCars,
  cars,
  setImTitle,
  selectedUser,
  modalIndex,
  mutate
}) => {
  const [modalTitle,setModalTitle] = useState<string>('')
  const [modalForm,setModalForm] = useState<ReactElement>()
  useEffect(() => {
      switch (user) {
      case "FLEETMANAGEMENT":
        if (typeof selectedCar !== 'undefined'){
          setModalTitle("Modifier le vehicule no:  " + selectedCar.immatriculation)
        }
        else
          setModalTitle("Ajout d'une nouvelle voiture")
        setModalForm(<AddCarForm selectedCar = {selectedCar} onClose={onClose} setCars={setCars} cars={cars} setImTitle={setImTitle}/>)
        break;
      case "ADMIN":
        if (selectedUser !== undefined){
          setModalTitle("Veuillez entrer les nouvelles informations de l'utilisateur")
          setModalForm(<AddUserForm onClose={onClose} selectedUser={selectedUser}  mutate={mutate}/>)
        }else{
          setModalTitle("Ajout d'un nouvel utilisateur")
          setModalForm(<AddUserForm onClose={onClose} mutate={mutate}/>)
        }
        break;
      default:
        break;
    }
  }, [cars, onClose, selectedCar, setCars, setImTitle, user,selectedUser,mutate]); // Optional dependency array
  return (
    <dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-100 bg-black/50 h-screen w-full"
      id={modalIndex || ''}
    >
      <div className="relative w-full max-w-3xl h-[95vh] sm:h-auto sm:max-h-[92vh] overflow-hidden bg-white shadow-2xl  border border-white flex flex-col animate-in slide-in-from-bottom sm:zoom-in duration-300">
        <div className="flex justify-between w-full shadow-md mb-1 sm:text-xl bg-vert text-white">
          <h2 className="font-bold m-6">
            {
              modalTitle
            }
            
          </h2>
          <button
            onClick={onClose}
            className="group w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 transition-all hover:bg-red-50 m-6"
          >
            <X
              size={20}
              strokeWidth={2.5}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
          </button>
          
        </div>

          {modalForm}

        
        

        {/* <button 
          className="absolute top-[0%] right-[0%]  px-3 py-1 text-white text-xl font-bold rounded-full cursor-pointer"
          onClick={onClose}
          >
          x
        </button> */}
      </div>
    </dialog>
  );
};

export default AddCarModal;