"use client";

import { useState } from "react";
import { Reminder } from "../../type";
import ReminderItem from "../reminder/ReminderItem";
import { Car } from "@/app/(main)/type";

interface ListFormProps {
  reminders : Reminder[];
  onClose?: () => void;
  submitReminder : (id: unknown) => void;
  selectedCar : Car 
}

const MaintenanceForm = ({  onClose,reminders,submitReminder,selectedCar} : ListFormProps) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    // if (!title.trim()) return; // ne rien envoyer si vide
    // setLoading(true);

    try {
      // ⚡ Ici tu peux remplacer par ton API call
      console.log("Formulaire soumis :", { reminders });
      reminders.map((reminder, index)=> submitReminder(reminder.id))
      onClose();
      // // Exemple : await createList({ title });
      // alert(`Liste enregistrée : ${title}`);
      // setTitle(""); // reset du formulaire
    } catch (err) {
      console.error("Erreur :", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col  justify-between w-full mb-4 overflow-auto">
      {/* Nom */} 
      <div className="flex flex-col">
        {reminders.map((reminder, index) => (
          <label key={index} htmlFor="title" className={`p-2 text-gray-700 font-medium ${index%2 !== 0? "bg-jaune" : ""} ` }>
            <ReminderItem key={index} {...reminder} reminderSelected={reminder} selectedCar={selectedCar}/>
          </label>
        ))}
        {/* <input
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="Nom de la liste"
          className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
        /> */}
      </div>

      {/* Bouton */}
      <button
        // type="submit"
        // disabled={loading}
        className="bg-vert hover:bg-blue-700 text-white font-semibold py-2 px-4  mt-2 rounded-md w-full transition-colors duration-200 disabled:opacity-50"
        onClick={handleSubmit}
      >
        {loading ? "Envoi..." : "Ajouter"}
      </button>
    </div>
  );
};

export default MaintenanceForm;
