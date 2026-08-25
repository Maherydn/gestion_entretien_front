

import { Reminder } from "../../type";
// import { reminders } from '../../data';

const Item = ({ id, title, value, handleOptionChange,selectedOptions,selectedCar  }: Reminder) => {
  return (
  <div className="flex items-center justify-between h-12 ">
    <div className="flex flex-col justify-between h-full font-semibold">
      <p className="capitalize text-md">{title}</p>
      <p className="text-sm text-black/80">{value}</p>
    </div>
  </div>
  
)};

export default Item;
