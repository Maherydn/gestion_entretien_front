import { Car } from "@/app/(main)/type";
import { Reminder } from "../../type";
import Tableau from "@/app/(main)/_gerant/_components/_datatable/table";
import { useState } from "react";
// import ListForm from "./MaintenanceForm";

interface ReminderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  reminderSelected? : Reminder;
  submitReminder? : (id: unknown) => void;
  selectedCar: Car
}


const ReminderDetailModal: React.FC<ReminderDetailModalProps> = ({
  isOpen,
  onClose,
  reminderSelected,
  submitReminder,
  selectedCar
}) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const openAddCarModal = () => {setOpenModal(true)}
    return (
        <dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 h-screen w-full"
        
        >
        <div className="bg-white rounded-lg shadow-md w-fullshadow-lg p-6 w-3/4 dark:bg-slate-100 flex flex-col">
            <div className="flex justify-between w-full shadow-md mb-4">
                <h2 className="text-2xl font-bold m-4">
                    {
                        (typeof reminderSelected !== 'undefined')?
                            reminderSelected.title.toLocaleUpperCase():
                            "Aucun element selectionne"
                    }
                </h2>
            </div>
            <div className="mb-4">
                <p className=" text-xl">
                    <span className="font-semibold">Odometre actuel : </span> 
                    {
                        (typeof selectedCar !== 'undefined')?
                            selectedCar.kilometrage.toLocaleString():
                            "Aucun element selectionne"
                    }
                    <span className=""> KM</span>
                </p>
                <Tableau editUser = {openAddCarModal} _user_="Administrateur"/>
            </div>
            <button
            className="bg-vert hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md w-full transition-colors duration-200 disabled:opacity-50"
            onClick={onClose}
            >
            OK
            </button>
        </div>
        
        </dialog>
    );
    };

export default ReminderDetailModal;
