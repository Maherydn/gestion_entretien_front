import { reminders } from "../../data";
import ReminderItem from "./ReminderItem";

const ReminderMaintenance = () => {
  return (
    <div className="flex-1 bg-jaune flex flex-col items-center gap-6 pt-4 shadow-jaune shadow-lg max-md:hidden"> 
      <h2 className="text-2xl uppercase font-bold">rappels</h2>

      <div className="w-full flex-1 overflow-y-auto space-y-6 px-2">
        {reminders.map((reminder, index) => (
          <ReminderItem key={index} {...reminder} />
        ))}
      </div>
      <div className="flex flex-col w-full p-2 gap-2">
        <button className="w-full bg-vert py-1 font-semibold cursor-pointer">
          Planifier un entretien
        </button>
      </div>  
      
    </div>
  );
};

export default ReminderMaintenance;