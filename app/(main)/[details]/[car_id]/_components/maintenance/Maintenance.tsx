"use client";

import { useState } from "react";
import MaintenanceFilter from "./MaintenanceFilter";
import SelectField from "../../../../_components/CarFilters.tsx/SelectField";
import FloatingButton from "@/app/(main)/_components/FloatingButton";

const Maintenance = () => {
  const [filters, setFilters] = useState({
    MaintenanceType: "",
    MaintenanceValue: "",
  });
  const [value, setValue] = useState<string>('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  return (
    <div className="flex-2 flex flex-col p-2 gap-4 rounded relative">
      <h2 className="text-xl font-semibold ">Historiques des entretiens</h2>
      <MaintenanceFilter onChange={setFilters} />
      <div className="flex gap-4 items-center max-sm:flex-wrap">
        <p className="flex-1 font-bold ">Recherche </p>
        <div className="max-sm:flex sm:flex-2 flex-col w-full bg-jaune">
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="bg-white w-full h-10 rounded-sm px-4 border "
            placeholder="recherche...."
          />
        </div>
        <div className="max-sm:flex sm:flex-2 flex-col w-full bg-jaune">

        </div>
      </div>
      <div className="fixed bottom-5 max-lg:right-5 right-80 p-4">
        <FloatingButton />
      </div>
    </div>
  );
};

export default Maintenance;
