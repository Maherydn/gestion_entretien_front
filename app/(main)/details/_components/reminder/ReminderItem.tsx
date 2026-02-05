import { Reminder } from "../../type";

const ReminderItem = ({ title, value }: Reminder) => (
  <div className="flex items-center justify-between h-12 ">
    <div className="flex flex-col justify-between h-full font-semibold">
      <p className="capitalize text-sm">{title}</p>
      <p className="text-sm text-black/80">{value}</p>
    </div>
    <div className="flex gap-2">
      <div className="h-8 w-8 bg-slate-300" />
      <div className="h-8 w-8 bg-slate-300 rounded-full" />
    </div>
  </div>
);

export default ReminderItem;
