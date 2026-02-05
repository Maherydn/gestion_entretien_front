"use client";

import { useState } from "react";
import CarFilter from "./_components/CarFilters.tsx/CarFilter";
import CarCard from "./_components/CarCard";
import FloatingButton from "./_components/FloatingButton";
import { cars } from "./data";
import { dataCarsFilter } from "../utils/dataCarsFilter";
import Header from "./_components/Header";
import Chauffeur from "./_chauffeur/page";
import HomePage from "./_components/Homepage";


import MaintenanceFilter from "./details/[car_id]/_components/maintenance/MaintenanceFilter";
import Gerant from "./_gerant/page";
import Administrateur from "./_administrateur/page";

// ---- Page principale ---- //
export default function Main() {

  const [log, setLog] = useState("Administrateur")

  if (log === "Gerant"){
    return (
    <div className="w-full flex md:px-6 flex-col gap-8 relative">
      <Gerant  user="Gerant"/>
    </div>
  );
  }
  if (log === "Chauffeur") {
    return (
    <div className="w-full flex md:px-6 flex-col gap-8 relative">
      <HomePage user="Chauffeur"/>
    </div>
  );
  }
   if (log === "Administrateur") {
    return (
    <div className="w-full flex md:px-6 flex-col gap-8 relative items-center">
      <Administrateur />
    </div>
  );
  }
   if (log === "Technicien") {
    return (
    <div className="w-full flex md:px-6 flex-col gap-8 relative">
      <Chauffeur />
    </div>
  );
  }
}
