"use client";

import SelectField from "@/app/(main)/_components/CarFilters.tsx/SelectField";
import { useEffect, useState } from "react";
import { maintenanceData } from "../../data";
import { Maintenance, MaintenanceValue } from "../../type";

interface MaintenanceProps {
  onChange: (values: {
    MaintenanceType: string;
    MaintenanceValue: string;
  }) => void;
}

interface Option {
  id: number;
  name: string;
}

const MaintenanceFilter: React.FC<MaintenanceProps> = ({ onChange }) => {
  const [value, setValues] = useState<{
    MaintenanceType: string;
    MaintenanceValue: string;
  }>({
    MaintenanceType: "",
    MaintenanceValue: "",
  });

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value: newValue } = e.target;

    if (name === "MaintenanceType") {
      // Quand on change de type, on réinitialise la valeur
      setValues({ MaintenanceType: newValue, MaintenanceValue: "" });
    } else {
      setValues((prev) => ({ ...prev, [name]: newValue }));
    }
  };

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  // Transformation pour SelectField (Option[])
  const typeOptions: Option[] = maintenanceData.map((t: Maintenance) => ({
    id: t.id,
    name: t.type,
  }));
  const selectedType = maintenanceData.find(
    (t: Maintenance) => t.type === value.MaintenanceType
  );

  const valuesOptions: Option[] = selectedType
    ? selectedType.values.map((v: MaintenanceValue) => ({
        id: v.id,
        name: v.value,
      }))
    : [];

  return (
      <div className="flex items-center justify-start gap-4">
        <p className="font-bold">Filtre</p>

        {/* Select Type */}
        <SelectField
          id="MaintenanceType"
          name="MaintenanceType"
          value={value.MaintenanceType}
          options={typeOptions}
          placeholder="Choisir un type"
          onChange={handleChangeSelect}
        />

        {/* Select Value */}
        <SelectField
          id="MaintenanceValue"
          name="MaintenanceValue"
          value={value.MaintenanceValue}
          options={valuesOptions}
          placeholder="Choisir une valeur"
          onChange={handleChangeSelect}
        />
      </div>
  );
};

export default MaintenanceFilter;
