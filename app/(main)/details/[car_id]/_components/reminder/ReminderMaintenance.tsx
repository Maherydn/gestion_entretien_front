"use client";

import { useState } from "react";
import { reminders } from '../../data';
import ReminderItem from "./ReminderItem";
import MaintenanceModal from "../modal/MaintenanceModal";
import { Reminder } from '../../type';
import { Car } from "@/app/(main)/type";

interface reminderMaintenanceProps {
  show: string;
  selectedCar: Car;
}
const ReminderMaintenance = ({ show,selectedCar }: reminderMaintenanceProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // const [reminderSelected, setReminderSelected] = useState<Reminder[]>([]);
  const reminderSelected : Reminder[] = [];

  const [remindersTab, setRemindersTab] = useState(reminders);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedOptions([...selectedOptions, value]);
      
    } else {
      setSelectedOptions(selectedOptions.filter((title) => title !== value));
    }
  };

  const removeSelectedReminders = (id: unknown) =>{
    setRemindersTab((remindersTab) => remindersTab.filter((reminder) => reminder.id !== id ))
  }

  const cheboxSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // if (!formData.type.trim()) return; // ne rien envoyer si vide
        // setLoading(true);

        try {
        // ⚡ Ici tu peux remplacer par ton API call
        console.log("Formulaire soumis :", { selectedOptions });
        // Exemple : await createList({ title });
        // alert(`Liste enregistrée : ${formData.im}`);
        // setTitle(""); // reset du formulaire
        } catch (err) {
        console.error("Erreur :", err);
        }
        // } finally {
        // setLoading(false);
        // }
    };
  // console.log(reminderSelected)
  
  remindersTab.map((reminder, index) => (
    selectedOptions.map((selectedOption, index)=> (selectedOption === reminder.title)? 
      // setReminderSelected([...reminderSelected, reminder])
      reminderSelected.push(reminder)
      // console.log(reminder)
      : 
      console.log("coucou") )
  ))
  
//  selectedOptions.map((selectedOption, index) => reminderSelected.push(reminders.filter(selectedOption)) )

  // selectedOptions.map((selectedOption, index)=>
  //   setReminderSelected(reminders.filter(reminder => reminder.title.includes(selectedOption)))
  // )

  
  console.log(remindersTab)
  return (
    <div className={`flex-1 bg-jaune flex flex-col items-center gap-6 pt-4 shadow-jaune shadow-lg 
      max-md:${show} fixed max-md:top-18 w-[25%] max-w-lg max-sm:w-screen max-md:px-5 h-[90%] 
      z-20
    `}> 
      <h2 className="text-2xl uppercase font-bold">rappels</h2>

      <div className="w-full h-1/2 flex-1 overflow-y-auto space-y-6 px-2">
        {remindersTab.map((reminder, index) => (
          <ReminderItem key={index} {...reminder}  handleOptionChange={handleOptionChange} selectedOptions = {selectedOptions} reminderSelected= {reminder} selectedCar = {selectedCar}/>
        ))}
      </div>
      
      <div className="flex flex-col w-full p-2 gap-2">
        <button
          className="w-full bg-vert py-1 font-semibold cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          Planifier un entretien
        </button>
      </div>
      {openModal && (
        <MaintenanceModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          reminders = {reminderSelected}
          submitReminder = {removeSelectedReminders}
          selectedCar = {selectedCar}
        />
      )}
    </div>
  );
};

export default ReminderMaintenance;
