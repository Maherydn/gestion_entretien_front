import { ReactElement, useEffect, useState } from "react";
import { Car } from "../../type";
import AddCarForm from '../formulaires/AddCarForm';
import AddUserForm from "../../_administrateur/_components/formulaires/AddUserForm";
import {User} from "@heroui/react";
interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: string;
  selectedCar?: Car;
  selectedUser?: typeof User;
  setCars?: (values: Car) => void;
  cars?: Car[];
  setImTitle?: (immatriculation : string)=> void;
  modalIndex?: string
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
  modalIndex
}) => {
  const [modalTitle,setModalTitle] = useState<string>('')
  const [modalForm,setModalForm] = useState<ReactElement>()
  useEffect(() => {
      switch (user) {
      case "Gerant":
        if (typeof selectedCar !== 'undefined'){
          setModalTitle("Modifier le vehicule no:  " + selectedCar.immatriculation)
        }
        else   
          setModalTitle("Ajout d'une nouvelle voiture")
        setModalForm(<AddCarForm selectedCar = {selectedCar} onClose={onClose} setCars={setCars} cars={cars} setImTitle={setImTitle}/>)
        break;
      case "Administrateur":
        if (selectedUser !== undefined){
          setModalTitle("Modification des informations de " +selectedUser.nom)
          setModalForm(<AddUserForm onClose={onClose} selectedUser={selectedUser}/>)
        }else{
          setModalTitle("Ajout d'un nouvel utilisateur")
          setModalForm(<AddUserForm onClose={onClose}/>)
        }
        break;
      default:
        break;
    }
  }, [cars, onClose, selectedCar, setCars, setImTitle, user,selectedUser]); // Optional dependency array
  return (
    <dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-100 bg-black/50 h-screen w-full"
      id={modalIndex || ''}
    >
      <div className="bg-white rounded-lg shadow-md w-fullshadow-lg p-6  h-8/12 dark:bg-slate-100 flex flex-col">
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