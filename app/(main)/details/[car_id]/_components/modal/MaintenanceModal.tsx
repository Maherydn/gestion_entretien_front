import { Reminder } from "../../type";
import ListForm from "./MaintenanceForm";

interface MaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  reminders : Reminder[];
  submitReminder : (id: unknown) => void;
}

const MaintenanceModal: React.FC<MaintenanceModalProps> = ({
  isOpen,
  onClose,
  reminders,
  submitReminder
}) => {
  return (
    <dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 h-screen w-full"
      
    >
      {(reminders.length != 0)?
      <div className="bg-white rounded-lg shadow-md p-6 w-1/3 h-1/2 max-sm:w-[80%] max-sm:h-[80%] dark:bg-slate-100 flex flex-col">
        <div className="flex justify-between w-full shadow-md mb-4">
          <h2 className="text-lg font-semibold m-4">
            Recapitulatif
          </h2>
          <button
            onClick={onClose}
            className="rounded-md text-slate-800 hover:bg-red-500  w-6 h-6 text-xl flex justify-center items-center pb-px cursor-pointer hover:text-white duration-300 m-4"
          >
            <p className="mb-2">x</p>
          </button>
          
        </div>
        <ListForm reminders={reminders} onClose={onClose} submitReminder={submitReminder}/>
      </div> : 
      <div className="bg-white rounded-lg shadow-md w-fullshadow-lg p-6   dark:bg-slate-100 flex flex-col">
        <div className="flex justify-between w-full shadow-md mb-4">
          <h2 className="text-lg font-semibold m-4">
            Veuillez selectionner les taches a executer
          </h2>

        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md w-full transition-colors duration-200 disabled:opacity-50"
          onClick={onClose}
        >
          OK
        </button>
      </div>
      }
      
    </dialog>
  );
};

export default MaintenanceModal;
