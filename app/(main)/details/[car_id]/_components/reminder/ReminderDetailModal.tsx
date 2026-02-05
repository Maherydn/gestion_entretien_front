import { Reminder } from "../../type";
// import ListForm from "./MaintenanceForm";

interface ReminderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  reminderSelected? : Reminder;
  submitReminder? : (id: unknown) => void;
}


const ReminderDetailModal: React.FC<ReminderDetailModalProps> = ({
  isOpen,
  onClose,
  reminderSelected,
  submitReminder
}) => {
    return (
        <dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 h-screen w-full"
        
        >
        <div className="bg-white rounded-lg shadow-md w-fullshadow-lg p-6   dark:bg-slate-100 flex flex-col">
            <div className="flex justify-between w-full shadow-md mb-4">
                <h2 className="text-lg font-semibold m-4">
                    {
                        (typeof reminderSelected !== 'undefined')?
                            reminderSelected.title:
                            "Aucun element selectionne"
                    }
                </h2>
            </div>
            <div className="mb-4">
                <p>
                    date du dernier maintenance : 
                    {
                        (typeof reminderSelected !== 'undefined')?
                            reminderSelected.value:
                            "Aucun element selectionne"
                    }
                </p>
            </div>
            <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md w-full transition-colors duration-200 disabled:opacity-50"
            onClick={onClose}
            >
            OK
            </button>
        </div>
        
        </dialog>
    );
    };

export default ReminderDetailModal;
