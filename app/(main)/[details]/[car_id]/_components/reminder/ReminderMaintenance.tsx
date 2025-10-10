"use client";

import { useState } from "react";
import { reminders } from "../../data";
import ReminderItem from "./ReminderItem";
import MaintenanceModal from "../modal/MaintenanceModal";

interface reminderMaintenanceProps {
  show: string;
}
const ReminderMaintenance = ({ show }: reminderMaintenanceProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className={`flex-1 bg-jaune flex flex-col items-center gap-6 pt-4 shadow-jaune shadow-lg 
      max-md:${show} max-md:fixed max-md:top-18  max-sm:w-screen max-md:px-5 max-md:h-[90%] 
      z-20
    `}> 
      <h2 className="text-2xl uppercase font-bold">rappels</h2>

      <div className="w-full flex-1 overflow-y-auto space-y-6 px-2">
        {reminders.map((reminder, index) => (
          <ReminderItem key={index} {...reminder} />
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
        />
      )}
    </div>
  );
};

export default ReminderMaintenance;
