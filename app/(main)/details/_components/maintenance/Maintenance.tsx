"use client";

import { useState } from "react";
import MaintenanceFilter from "./MaintenanceFilter";

const Maintenance = () => {
  const [filters, setFilters] = useState({
    MaintenanceType: "",
    MaintenanceValue: "",
  });
  const [value, setValue] = useState<string>('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  return (
    <div className="flex-2 flex flex-col p-4 gap-4 rounded">
      <h2 className="text-2xl font-semibold ">Historiques des entretiens</h2>
      <MaintenanceFilter onChange={setFilters} />
      <div className="flex gap-2 items-center ">
        <p>Recherche : </p>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="bg-white w-80 h-10 rounded-lg px-4 border "
          placeholder="recherche...."
        />
      </div>
    </div>
  );
};

export default Maintenance;
