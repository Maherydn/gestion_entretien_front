"use client";

import { useState } from "react";
import CarFilter from "../_components/CarFilters.tsx/CarFilter";
import CarCard from "../_components/CarCard";
import FloatingButton from "../_components/FloatingButton";
import { cars } from "../data";
import { dataCarsFilter } from "../../utils/dataCarsFilter";
import Header from "../_components/Header";




// import MaintenanceFilter from "./details/[car_id]/_components/maintenance/MaintenanceFilter";

// ---- Page principale ---- //
export default function Chauffeur() {
  const [filters, setFilters] = useState({
    carType: "",
    fuel: "",
    search: "",
  });

  const [show, setShow] = useState("hidden")
  const [showSuv, setShowSuv] = useState("Suv")

  const showFilter = () => {
    setShow( show === "hidden"? "visible" : "hidden")
  }
  const actionToshowSuv = () => {
    setShowSuv( showSuv === "Suv"? "Suv2.0" : "Suv")
    console.log(showSuv)
  }

  const filteredCars = dataCarsFilter(cars, filters);


  console.log(show)

    const listMenu = [
        { id: 1, name: "Trier", action: showFilter },
        { id: 2, name: "bla", action: actionToshowSuv },
      ];
    return (
    <div className="w-full flex md:px-6 flex-col gap-8 relative">
      <Header title="Listes des véhicules" listMenu={listMenu}/>
      <CarFilter onChange={setFilters} show={show}/>
      
      <div className="w-full flex items-start md:justify-between  flex-wrap gap-6 px-5 justify-center">
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
           user = "Chauffeur"
        />
      ))}
        {/* <div className="fixed bottom-10 right-10 ">
          <FloatingButton />
        </div> */}
      </div>
      
    </div>
  );
 
}