"use client";

import { useEffect, useState } from "react";
import CarFilter from "../_components/CarFilters.tsx/CarFilter";
import CarCard from "../_components/CarCard";
import FloatingButton from "../_components/FloatingButton";
import { cars } from '../data';
import { dataCarsFilter } from "../../utils/dataCarsFilter";
import Header from "../_components/Header";
import AddCarModal from "../_gerant/modals/AddCarModal";
import { Car, User } from "../type";
import { fetcher } from "@/app/lib/fetcher";
import useSWR from "swr";


interface HomePageProps {
  user: string;
}


// import MaintenanceFilter from "./details/[car_id]/_components/maintenance/MaintenanceFilter";

// ---- Page principale ---- //
export default function HomePage({user}: HomePageProps) {

    const url = `${process.env.NEXT_PUBLIC_API_URL}cars`;
    const { data: cars = [], isLoading, mutate } = useSWR<Car[]>(url, fetcher);
    const [filters, setFilters] = useState({
        carType: "",
        fuel: "",
        search: "",
    });

    console.log("Cars data:", cars);
    const filteredCars = dataCarsFilter(cars, filters);
    const [show, setShow] = useState("hidden")
    const [showSuv, setShowSuv] = useState("Suv")
    const showFilter = () => {
        setShow( show === "hidden"? "visible" : "hidden")
    }
    const [listMenu, setListMenu] = useState([
        { id: 1, name: "Trier", action: showFilter },
    ]);

    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
    const fetchData = async () => {
        
        try {
            if (user === "FLEETMANAGEMENT"){

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
    }, [show, user]);

    return (
        <div className="w-full flex md:px-6 flex-col gap-8 relative">
            <Header title="Listes des véhicules" listMenu={listMenu}/>
            <CarFilter onChange={setFilters} show={show}/>
      
        <div className="w-full flex items-start md:justify-between  flex-wrap gap-6 px-5 justify-center">
            {filteredCars.map((car) => (
            <CarCard
                key={car.id}
                id={car.id}
                immatriculation={car.registrationNumber || 'N/A'}
                kilometrage={car.odometer || 0}
                visiteTechnique={car.technicalControlDate || 'N/A'}
                assurance={car.assuranceDate || 'N/A'}
                etat={car.availabilityStatus || 'ACTIVE'}
                notif = {car.warning?.length || 0}
                // imageUrl={car.imageUrl}
                user = {user}
            />
        ))}
        {user === "FLEETMANAGEMENT" ? 
            openModal && (<AddCarModal isOpen={openModal} onClose={() => setOpenModal(false)}  user={user}/>
            ) : ""
        }
        </div>
    </div>
  );
}