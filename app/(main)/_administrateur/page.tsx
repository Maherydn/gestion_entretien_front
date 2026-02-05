import { useState } from "react";
import CarFilter from "../_components/CarFilters.tsx/CarFilter";
import CarCard from "../_components/CarCard";
import FloatingButton from "../_components/FloatingButton";
import { cars } from "../data";
import { dataCarsFilter } from "../../utils/dataCarsFilter";
import Header from "../_components/Header";
import Tableau from "./_components/_datatable/table";




// import MaintenanceFilter from "./details/[car_id]/_components/maintenance/MaintenanceFilter";

// ---- Page principale ---- //
export default function Administrateur() {
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
        { id: 1, name: "coucou", action: showFilter },
        { id: 2, name: "salut", action: actionToshowSuv },
      ];
    return (
    <div className="w-full flex md:px-6 flex-col gap-8 relative max-w-6xl">
      <Header title="Listes des véhicules" listMenu={listMenu}/>
      <Tableau/>
      
    </div>
  );
 
}