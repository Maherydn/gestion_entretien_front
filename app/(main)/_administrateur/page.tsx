import { useState } from "react";
import CarFilter from "../_components/CarFilters.tsx/CarFilter";
import CarCard from "../_components/CarCard";
import FloatingButton from "../_components/FloatingButton";
import { cars } from "../data";
import { dataCarsFilter } from "../../utils/dataCarsFilter";
import Header from "../_components/Header";
import Tableau from "./_components/_datatable/table";
import AddCarModal from "../_gerant/modals/AddCarModal";




// import MaintenanceFilter from "./details/[car_id]/_components/maintenance/MaintenanceFilter";

interface HomeAdminProps {
  user: string;
}


// ---- Page principale ---- //
export default function Administrateur({user}: HomeAdminProps) {
  const [filters, setFilters] = useState({
    carType: "",
    fuel: "",
    search: "",
  });

  const [openModal, setOpenModal] = useState<boolean>(false);
  const openAddCarModal = () => {setOpenModal(true)}

  

    const listMenu = [
        { id: 1, name: "Ajouter un utilisateur", action: openAddCarModal },
      ];
    return (
    <div className="w-full flex md:px-6 flex-col gap-8 relative max-w-6xl">
      <Header title="Listes des utilisateurs" listMenu={listMenu}/>
      <Tableau editUser = {openAddCarModal}  _user_={user}/>
      {user === "Administrateur" ?
          openModal && (<AddCarModal isOpen={openModal} onClose={() => setOpenModal(false)} user={user}/>) 
          : ""
      }
    </div>
  );
 
}