import { Reminder } from "../../type";

const ReminderItem = ({ title, value }: Reminder) => (
  <div className="flex items-center justify-between h-12 ">
    <div className="flex flex-col justify-between h-full font-semibold">
      <p className="capitalize text-md">{title}</p>
      <p className="text-sm text-black/80">{value}</p>
    </div>
    <div className="flex gap-2">
      <input  name="rappel" type="checkbox" className="w-8 h-8" />
      <button className="h-8 w-8 text-black font-bold rounded-full border-[3px]  cursor-pointer">
        i
      </button>
    </div>
  </div>
);

export default ReminderItem;
