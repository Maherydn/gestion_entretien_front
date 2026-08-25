'use client'
import React, { useState, useEffect } from 'react';
import Header from "../../../_components/Header";
import { Car } from '../../../type';
import { cars } from '../../../data';
import Section from './_components/section';
import AddWarningModal from './_components/warningModal';

function Details() {
  // État pour stocker les données récupérées
  const [immatriculation, setImmatriculation] = useState("");
  const [id, setId] = useState(0);
  const [selectedCar, setSelectedCar] = useState<Car>(cars[id]);
  // État pour gérer l'état de chargement
  // const [isLoading, setIsLoading] = useState(true);
  // État pour gérer les erreurs
  // const [error, setError] = useState(null);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const openAddWarningModal = () => {
    setOpenModal(true);
  };

  const listMenu = [
    { id: 2, name: "Envoyer une alerte", action: openAddWarningModal },
  ];
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const im = urlParams.get('im');
    const idParams = Number(urlParams.get('id'));
    if (im) {
      setImmatriculation(im);
    }
    if (idParams){
      setId(Number(idParams));
      setSelectedCar(cars[Number(idParams)-1])
    }
    console.log('id: '+ id)
    console.log(selectedCar)
    // Appeler la fonction de récupération des données
  }, [selectedCar,id]); // Le tableau vide assure que le `useEffect` ne s'exécute qu'une seule fois

  if (immatriculation === "") {
    return <p>Chargement des données...</p>;
  }
  const title = ['Alertes envoyées','Réparation en attente','Réparation en cours','Réparation terminées']
  const titleColor = ['jaune', 'rouge', 'gray-500', 'vert']
  return (
    <div className="w-full h-full flex flex-wrap gap-2 pt-7 md:px-2">
        <Header title="Détails" subTitle={immatriculation.toLocaleString()} listMenu={listMenu}/>
        <Section title={title[0]} titleColor={titleColor[0]} selectedCar={selectedCar}/>
        <Section title={title[1]} titleColor={titleColor[1]} selectedCar={selectedCar}/>
        <Section title={title[2]} titleColor={titleColor[2]} selectedCar={selectedCar}/>
        <Section title={title[3]} titleColor={titleColor[3]} selectedCar={selectedCar}/>
        {openModal && (
        <AddWarningModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          user='driver'
          carId={id}
        />
      )}
    </div>
  );
}

export default Details;

