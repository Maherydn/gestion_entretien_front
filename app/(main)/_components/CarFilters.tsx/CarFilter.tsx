"use client";

import { useEffect, useState } from "react";
import SelectField from "./SelectField";
import SearchInput from "./SearchInput";

const carTypes = [
  { id: 1, name: "SUV" },
  { id: 2, name: "Berline" },
  { id: 3, name: "Coupé" },
  { id: 4, name: "Pickup" },
];

const fuels = [
  { id: 1, name: "Essence" },
  { id: 2, name: "Diesel" },
  { id: 3, name: "Électrique" },
  { id: 4, name: "Hybride" },
];

interface CarFilterProps {
  onChange: (values: { carType: string; fuel: string; search: string }) => void;
}

const CarFilter: React.FC<CarFilterProps> = ({ onChange }) => {
  const [value, setValues] = useState({
    carType: "",
    fuel: "",
    search: "",
  });

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValues({ ...value, [e.target.name]: e.target.value });
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...value, search: e.target.value });
  };

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  return (
    <div className="flex flex-col w-full gap-6 bg-vert px-4 py-2">
      {/* Bloc Filtre */}
      <div className="flex gap-6 items-center flex-wrap">
        <p className="capitalize text-white text-xl">Filtre :</p>
        <SelectField
          id="carType"
          name="carType"
          value={value.carType}
          options={carTypes}
          placeholder="Choisir un type"
          onChange={handleChangeSelect}
        />
        <SelectField
          id="fuel"
          name="fuel"
          value={value.fuel}
          options={fuels}
          placeholder="Choisir un carburant"
          onChange={handleChangeSelect}
        />
      </div>

      {/* Bloc Recherche */}
      <div className="flex gap-6 items-center flex-wrap">
        <p className="capitalize text-white text-xl">Recherche :</p>
        <SelectField
          id="fuel"
          name="fuel"
          value={value.fuel}
          options={fuels}
          placeholder="Choisir un carburant"
          onChange={handleChangeSelect}
        />
        <SearchInput value={value.search} onChange={handleChangeInput} />
      </div>
    </div>
  );
};

export default CarFilter;
