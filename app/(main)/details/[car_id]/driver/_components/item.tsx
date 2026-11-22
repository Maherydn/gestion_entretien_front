

import { Warning } from "@/app/(main)/type";
import { Reminder } from "../../type";
// import { reminders } from '../../data';

const Item = ({ id, description, priorityLevel, handleOptionChange,selectedOptions,selectedCar  }: Warning) => {
  return (
  <div className="flex items-center justify-between h-12 ">
    <div className="flex flex-col justify-between h-full font-semibold">
      <p className="capitalize text-md">{description}</p>
      <p className="text-sm text-black/80">{priorityLevel}</p>
    </div>
  </div>
  
)};

export default Item;
