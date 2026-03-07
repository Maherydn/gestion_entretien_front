"use client";

import { useEffect, useState } from "react";
import CarFilter from "../_components/CarFilters.tsx/CarFilter";
import CarCard from "../_components/CarCard";
import FloatingButton from "../_components/FloatingButton";
import { cars } from '../data';
import { dataCarsFilter } from "../../utils/dataCarsFilter";
import Header from "../_components/Header";
import AddCarModal from "../_gerant/modals/AddCarModal";
import { Car } from "../type";


interface HomePageProps {
  user: string;
}


// import MaintenanceFilter from "./details/[car_id]/_components/maintenance/MaintenanceFilter";

// ---- Page principale ---- //
export default function HomePage({user}: HomePageProps) {

    const [filters, setFilters] = useState({
        carType: "",
        fuel: "",
        search: "",
    });

    const [carStates, setCars] = useState(cars)
    const carsStatesUpdate = (newCar: Car) => {
        carStates.push(newCar)
        setCars(carStates)
    }

    const [show, setShow] = useState("hidden")
    const [showSuv, setShowSuv] = useState("Suv")

    const showFilter = () => {
        setShow( show === "hidden"? "visible" : "hidden")
    }

    const filteredCars = dataCarsFilter(carStates, filters);

    const [listMenu, setListMenu] = useState([
        { id: 1, name: "Trier", action: showFilter },
    ]);

    const [openModal, setOpenModal] = useState<boolean>(false);
    useEffect(() => {
    const fetchData = async () => {
        try {
            if (user === "Gerant"){
                const openAddCarModal = () => {
                    setOpenModal(true)
                }
                setListMenu([
                    { id: 1, name: "Trier", action: showFilter },
                    { id: 2, name: "Ajouter un véhicule", action: openAddCarModal },
                ]);
            }
            if (user === "Chauffeur"){
                setListMenu([
                    { id: 1, name: "Trier", action: showFilter },
                ]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        };

        fetchData();
    }, [show]);

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
                user = {user}
            />
        ))}
        {/* <div className="fixed bottom-10 right-10 ">
          <FloatingButton />
        </div> */}
        {user === "Gerant" ? 
            openModal && (<AddCarModal isOpen={openModal} onClose={() => setOpenModal(false)} setCars = {carsStatesUpdate} cars={carStates} user={user}/>
            ) : ""
        }
        </div>
    </div>
  );
}