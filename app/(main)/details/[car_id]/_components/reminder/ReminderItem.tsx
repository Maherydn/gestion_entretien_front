

import { Reminder } from "../../type";
import ReminderDetailModal from "./ReminderDetailModal";
import { useState } from "react";
// import { reminders } from '../../data';

const ReminderItem = ({ id, title, value, handleOptionChange,selectedOptions,reminderSelected  }: Reminder) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
  <div className="flex items-center justify-between h-12 ">
    <div className="flex flex-col justify-between h-full font-semibold">
      <p className="capitalize text-md">{title}</p>
      <p className="text-sm text-black/80">{value}</p>
    </div>
    <div className="flex gap-2">
      {selectedOptions?
        <input  
          name={id.toString()} 
          className="w-8 h-8" 
          type="checkbox"
          id={id.toString()}
          value={title}
          checked={selectedOptions?.includes(title)}
          onChange={handleOptionChange}
        />
        :
        <></>
      }  
      <button 
        className="h-8 w-8 text-black font-bold rounded-full border-[3px]  cursor-pointer"
        onClick={() => setOpenModal(true)}
      >
        i
      </button>
    </div>
    {openModal && (
        <ReminderDetailModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          reminderSelected = {reminderSelected}
          // submitReminder = {removeSelectedReminders}
        />
      )}
  </div>
  
)};

export default ReminderItem;
