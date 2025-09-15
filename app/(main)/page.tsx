"use client";

import { useState } from "react";
import CarFilter from "./_components/CarFilters.tsx/CarFilter";
import CarCard from "./_components/CarCard";
import { cars } from "./data";
import { dataCarsFilter } from "../utils/dataCarsFilter";

// ---- Page principale ---- //
export default function Main() {
  const [filters, setFilters] = useState({
    carType: "",
    fuel: "",
    search: "",
  });

   const filteredCars = dataCarsFilter(cars, filters);


  return (
    <div className="w-full flex md:px-6 flex-col gap-4">
      <CarFilter onChange={setFilters} />

      <div className="w-full flex items-start md:justify-start flex-wrap gap-6 px-1 justify-center ">
       {filteredCars.map((car) => (
        <CarCard
          key={car.id}
          immatriculation={car.immatriculation}
          kilometrage={car.kilometrage}
          visiteTechnique={car.visiteTechnique}
          assurance={car.assurance}
          etat={car.etat}
          imageUrl={car.imageUrl}
        />
      ))}
      </div>
    </div>
  );
}
