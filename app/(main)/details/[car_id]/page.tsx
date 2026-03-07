'use client'
import React, { useState, useEffect } from 'react';
import ReminderMaintenance from "./_components/reminder/ReminderMaintenance";
import Maintenance from "./_components/maintenance/Maintenance";
import Header from "../../_components/Header";
import { dataCarsFilter } from "@/app/utils/dataCarsFilter";
import FloatingButton from "../../_components/FloatingButton";
import Detail from "./_components/details/Detail";
import { Car } from '../../type';
import { cars } from '../../data';

function Details() {
  // État pour stocker les données récupérées
  const [immatriculation, setImmatriculation] = useState("");
  const [id, setId] = useState(0);
  const [selectedCar, setSelectedCar] = useState<Car>(cars[id]);
  // État pour gérer l'état de chargement
  // const [isLoading, setIsLoading] = useState(true);
  // État pour gérer les erreurs
  // const [error, setError] = useState(null);

  const [showDetail, setShowDetail] = useState("hidden")
  const [showRappel, setShowRappel] = useState("hidden")

  const actionToSetTitle = (immatriculation : string)=>{
    setImmatriculation(immatriculation);
  }
  
  const actionToShowDetail = () => {
    if (showDetail === "hidden"){
      setShowDetail("visible")
      setShowRappel("hidden" )
    }
    else{
      setShowDetail("hidden")
    }
  }
  const actionToshowRappel = () => { 
    if (showRappel === "hidden"){
      setShowRappel("visible" )
      setShowDetail("hidden")
    }
    else{
      setShowRappel("hidden")
    }
  }
  const listMenu = [
    { id: 1, name: "Rappels", action: actionToshowRappel },
    { id: 2, name: "Informations", action: actionToShowDetail  },
  ];
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const im = urlParams.get('im');
    const idParams = Number(urlParams.get('id'))-1;
    if (im) {
      setImmatriculation(im);
    }
    if (idParams){
      setId(Number(idParams));
      setSelectedCar(cars[Number(idParams)])
    }
    console.log(selectedCar)
    // Appeler la fonction de récupération des données
  }, [selectedCar]); // Le tableau vide assure que le `useEffect` ne s'exécute qu'une seule fois

  if (immatriculation === "") {
    return <p>Chargement des données...</p>;
  }
  console.log(showDetail)
  return (
    <div className="w-full h-full flex gap-2 pt-7 md:px-2">
        <Header title="Détails" subTitle={immatriculation.toLocaleString()} listMenu={listMenu}/>
        <ReminderMaintenance show={showRappel} selectedCar = {selectedCar}/>
        <Maintenance />
        <Detail id={id} show={showDetail} setImTitle={actionToSetTitle} selectedCardProp={selectedCar}/>

    </div>
  );
}

export default Details;

