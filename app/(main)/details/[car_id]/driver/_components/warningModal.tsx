import { ReactElement, useEffect, useState } from "react";
import { Car } from '../../type';
import { X } from "lucide-react";
import AddCarForm from "@/app/(main)/_gerant/formulaires/AddCarForm";
import AddWarningForm from "./addWarningForm";
interface AddWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  carId: number;
  user: string;
  selectedCar?: Car;
//   selectedUser?: User;
  setCars?: (values: Car) => void;
  cars?: Car[];
  setImTitle?: (immatriculation : string)=> void;
  modalIndex?: string
//   mutate?: () => Promise<User[] | undefined>;
}


const AddWarningModal: React.FC<AddWarningModalProps> = ({
  isOpen,
  onClose,
  carId,
  selectedCar,
  user,
  setCars,
  cars,
  setImTitle,
//   selectedUser,
  modalIndex,
//   mutate
}) => {
  const [modalTitle,setModalTitle] = useState<string>("Ajout d'une nouvelle alerte")
  const [modalForm,setModalForm] = useState<ReactElement>()
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

          <AddWarningForm selectedCar = {selectedCar} onClose={onClose} setCars={setCars} cars={cars} setImTitle={setImTitle} carId={carId}/>

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

export default AddWarningModal;