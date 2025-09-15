import { reminders } from "../../data";
import ReminderItem from "./ReminderItem";

const ReminderMaintenance = () => {
  return (
    <div className="flex-1 bg-jaune flex flex-col items-center gap-6 py-4 shadow-jaune shadow-lg"> 
      <h2 className="text-2xl uppercase font-bold">rappels</h2>

      <div className="w-full flex-1 overflow-y-auto space-y-6 px-4">
        {reminders.map((reminder, index) => (
          <ReminderItem key={index} {...reminder} />
        ))}
      </div>

      <button className="w-full bg-vert py-2 rounded-lg font-semibold cursor-pointer">
        Planifier un entretien
      </button>
    </div>
  );
};

export default ReminderMaintenance;