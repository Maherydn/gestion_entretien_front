'use client";';
import { useState } from "react";
import Header from "../_components/Header";
import Tableau from "./_components/_datatable/table";
import AddCarModal from "../_gerant/modals/AddCarModal";
import useSWR from "swr";
import { User } from "../type";
import { fetcher } from "@/app/lib/fetcher";

// import MaintenanceFilter from "./details/[car_id]/_components/maintenance/MaintenanceFilter";

interface HomeAdminProps {
  user: string;
}

// ---- Page principale ---- //
export default function Administrateur({ user }: HomeAdminProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const openAddCarModal = () => {
    setOpenModal(true);
  };

  const listMenu = [
    { id: 1, name: "Ajouter un utilisateur", action: openAddCarModal },
  ];

  const url = `${process.env.NEXT_PUBLIC_API_URL}users`;
  const { data: users = [], isLoading, mutate } = useSWR<User[]>(url, fetcher);

  // if (user !== "ADMiN") {
  //   return <div>Accès refusé</div>;
  // }

  return (
    <div className="w-full flex md:px-6 flex-col gap-8 relative max-w-6xl">
      <Header title="Listes des utilisateurs" listMenu={listMenu} />
      <Tableau
        _user_={user}
        users={users}
        mutate={mutate}
        isLoading={isLoading}
      />
      {openModal && (
        <AddCarModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          user={user}
          users={users}
          mutate={mutate}
        />
      )}
    </div>
  );
}
