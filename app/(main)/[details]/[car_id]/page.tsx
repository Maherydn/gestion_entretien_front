'use client'
import React, { useState, useEffect } from 'react';
import ReminderMaintenance from "./_components/reminder/ReminderMaintenance";
import Maintenance from "./_components/maintenance/Maintenance";
import Header from "../../_components/Header";
import { dataCarsFilter } from "@/app/utils/dataCarsFilter";
import FloatingButton from "../.././_components/FloatingButton";
import Detail from "./_components/details/Detail";

function Details() {
  // État pour stocker les données récupérées
  const [immatriculation, setImmatriculation] = useState("");
  const [id, setId] = useState(1);
  // État pour gérer l'état de chargement
  // const [isLoading, setIsLoading] = useState(true);
  // État pour gérer les erreurs
  // const [error, setError] = useState(null);

  const [showDetail, setShowDetail] = useState("hidden")
  const [showRappel, setShowRappel] = useState("hidden")
  
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
  console.log(showDetail)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const im = urlParams.get('im');
    const idParams = urlParams.get('id');
    if (im) {
      setImmatriculation(im);
    }
    if (idParams){
      setId(Number(idParams));
    }
    // Appeler la fonction de récupération des données
  }, []); // Le tableau vide assure que le `useEffect` ne s'exécute qu'une seule fois

  if (immatriculation === "") {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="w-full h-full flex gap-2 pt-7 md:px-2">
        <Header title="Détails" subTitle={immatriculation.toLocaleString()} listMenu={listMenu}/>
        <ReminderMaintenance show={showRappel}/>
        <Maintenance />
        <Detail id={id-1} show={showDetail}/>
      
    </div>
  );
}

export default Details;





// import ReminderMaintenance from "./_components/reminder/ReminderMaintenance";
// import Maintenance from "./_components/maintenance/Maintenance";
// import Header from "../../_components/Header";
// import { dataCarsFilter } from "@/app/utils/dataCarsFilter";
// import FloatingButton from "../.././_components/FloatingButton";
// import Detail from "./_components/details/Detail";


// interface DetailsProps {
//     params: Promise<{
//       details: any;
//       car_id: any;
//       id: string;
//     }>;
//     searchParams: Promise<Record<string,string | string[]>>;
//   }

// const Details: React.FC<DetailsProps> = async (props) => {
//   // const params = await props.params;
//   const searchParams = await props.searchParams;
//   //const imageUrl = "/images/fond_login.webp";

//   // console.log(params);
//   // console.log (searchParams);
//   const selectedCarIndex = (await props.params).car_id;
  
//   // console.log(selectedCar);

//   // const [show, setShow] = useState("hidden")
  
//   // const showMenu = () => {
//   //     setShow( show === "hidden"? "visible" : "hidden")
//   //   }
  
  
//   return (
//     <div className="w-full h-[calc(100vh-96px)] flex gap-2 pt-10">
//       <Header title="Détails" subTitle={searchParams.im.toLocaleString()} listMenu={[]}/>
//       <ReminderMaintenance/>
//       <Maintenance />
//       <Detail id={selectedCarIndex}/>
//       <div className="fixed bottom-5 max-lg:right-5 right-80 p-4">
//         <FloatingButton />
//       </div>
//     </div>
//   );
// };

// export default Details;
