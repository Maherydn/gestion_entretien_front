import ReminderMaintenance from "./_components/reminder/ReminderMaintenance";
import Maintenance from "./_components/maintenance/Maintenance";

const Details = () => {
  return (
    <div className="w-full h-[calc(100vh-96px)] flex gap-2 bg-white p-2">
      <ReminderMaintenance/>
      <Maintenance />
      <div className="flex-1 bg-jaune"></div>
    </div>
  );
};

export default Details;
