import { Car } from "../../type";
import AddCarForm from "../formulaires/AddCarForm";

interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCar?: Car;
  setCars: (values: Car) => void;
  cars?: Car[];
  setImTitle?: (immatriculation : string)=> void;
}

const AddCarModal: React.FC<AddCarModalProps> = ({
  isOpen,
  onClose,
  selectedCar,
  setCars,
  cars,
  setImTitle
}) => {
  return (
    <dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 h-screen w-full"
    >
      <div className="bg-white rounded-lg shadow-md w-fullshadow-lg p-6 w-1/2 h-1/2 dark:bg-slate-100 flex flex-col">
        <div className="flex justify-between w-full shadow-md mb-4">
          <h2 className="text-lg font-semibold m-4">
            {
              (typeof selectedCar !== 'undefined')?
                "Modifier le vehicule no:  " + selectedCar.immatriculation :
                "Ajout d'une nouvelle voiture"
            }
            
          </h2>
          <button
            onClick={onClose}
            className="rounded-md text-slate-800 hover:bg-red-500  w-6 h-6 text-xl flex justify-center items-center pb-px cursor-pointer hover:text-white duration-300 m-4"
          >
            <p className="mb-2">x</p>
          </button>
          
        </div>
        
        <AddCarForm selectedCar = {selectedCar} onClose={onClose} setCars={setCars} cars={cars} setImTitle={setImTitle}/>

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