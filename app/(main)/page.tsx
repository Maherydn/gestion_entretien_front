"use client";

import { useState } from "react";
import CarFilter from "./_components/CarFilters.tsx/CarFilter";
import CarCard from "./_components/CarCard";
import FloatingButton from "./_components/FloatingButton";
import { cars } from "./data";
import { dataCarsFilter } from "../utils/dataCarsFilter";
import Header from "./_components/Header";

import MaintenanceFilter from "././[details]/[car_id]/_components/maintenance/MaintenanceFilter";

// ---- Page principale ---- //
export default function Main() {
  const [filters, setFilters] = useState({
    carType: "",
    fuel: "",
    search: "",
  });

  const [show, setShow] = useState("hidden")

  const showFilter = () => {
    setShow( show === "hidden"? "visible" : "hidden")
  }

  const filteredCars = dataCarsFilter(cars, filters);


  return (
    <div className="w-full flex md:px-6 flex-col gap-8">
      <Header title="Listes des véhicules" showFilter={showFilter}/>
      <CarFilter onChange={setFilters} show={show}/>
      
      <div className="w-full flex items-start md:justify-start flex-wrap gap-6 px-1 justify-center">
       {filteredCars.map((car) => (
        <CarCard
           key={car.id}
           id={car.id}
           immatriculation={car.immatriculation}
           kilometrage={car.kilometrage}
           visiteTechnique={car.visiteTechnique}
           assurance={car.assurance}
           etat={car.etat}
           imageUrl={car.imageUrl}        
        />
      ))}
        <div className="fixed bottom-15 right-10 p-4">
          <FloatingButton />
        </div>
      </div>
      
    </div>
  );
}
