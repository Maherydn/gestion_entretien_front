"use client";
import React, { useEffect, useMemo, useState } from "react";
import type {SVGProps} from "react";
import type {ChipProps} from "@heroui/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Pagination 
} from "@heroui/react";
import FloatingButton from "@/app/(main)/_components/FloatingButton";
import AddCarModal from "@/app/(main)/_gerant/modals/AddCarModal";

import SupprModal from "@/app/(main)/_components/supprModal";
import { User } from "../../../type";
import { users } from "../../../data";
import { DeleteIcon, EditIcon, EyeIcon } from "@/app/(main)/_assets/icon";

import { rappels } from '../../../data';

export const columns = [
  {name: "DESIGNATION", uid: "designation"},
  {name: "ODOMETRE (KM)", uid: "kilometrage"},
  {name: "DATE D'AJOUT", uid: "created_at"},
  {name: "ACTIONS", uid: "actions"},
];


const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

// type User = (typeof users)[0];

interface TableauProps{
  editUser : ()=>void;
  _user_: string
}


export default function Tableau( {editUser, _user_}: TableauProps ) {


  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User>()
  const actionToOpenEditModal = (user:User) =>{
    setSelectedUser(user)
    setOpenEditModal(true)
  }

  const [openProfilModal, setOpenProfilModal] = useState<boolean>(false);
  const actionToOpenProfilModal = (user:User) => {
    setSelectedUser(user)
    setOpenProfilModal(true)
  }

  const [openSupprModal, setopenSupprModal] = useState<boolean>(false);
  const actionToOpenSupprModal = (user:User) => {
    setSelectedUser(user)
    setopenSupprModal(true)
  }

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "designation":
        return (
          <div className="flex flex-col">
            <p className="">{cellValue}</p>
          </div>
        );
      case "kilometrage":
        return (
          <div className="flex flex-col">
            <p className="">
              {cellValue?.toLocaleString()}
            </p>
          </div>
        );
      case "created_at":
        return (
          <div className="flex flex-col">
            <p className="">
              {cellValue?.toLocaleString()}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={()=>actionToOpenProfilModal(user)}>
                <EyeIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  
  // filtrer le donnee users
  const [search, setSearch] = useState<string>('');
  const dataFilter = rappels.filter(reminder =>
    reminder.designation.toLowerCase().includes(search.toLowerCase())
  );

  //ajout index
  const dataWithIndex = dataFilter.map((item, index) => ({
    ...item,
    _index: index,
  }));


  // 1. Calculer le nombre total de pages
  const pages = Math.ceil(dataWithIndex.length / rowsPerPage);

  // 2. Extraire les données de la page actuelle
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return dataWithIndex.slice(start, end);
  }, [page, dataWithIndex]);

  // console.log(dataWithIndex);


  return (
    <>
      <Table 
      classNames={{
        wrapper: "text-left ", // Couleur du conteneur
        thead: "text-black text-left text-xl", // En-tête
        tbody: "text-gray-700 text-left text-xl capitalize", // Corps
        // base: "max-h-[1000px] overflow-scroll", // Définit la zone de défilement
        // table: "min-h-[400px]",  
      }}
      aria-label="Tableau avec entête fixe"
      // isHeaderSticky 
      // removeWrapper
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            // showControls
            // showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
            classNames={{
              // wrapper: "gap-2 shadow-lg", // Espace entre les boutons et ombre
              item: "w-8 h-8 text-small rounded-none bg-transparent", // Boutons carrés
              cursor: "bg-vert text-white font-bold", // Style du curseur actif
              prev: "bg-default-200 hover:bg-default-300", // Style du bouton précédent
            }}
          />
        </div>
      }
      topContent={
        <div className="flex w-full justify-left">
          <div className="flex font-semibold italic gap-3 items-center mb-2">
            <p>Recherche :</p> 
            <div className="max-sm:flex sm:flex-2 flex-col w-full bg-jaune">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>  setSearch(e.target.value)}
                        className="bg-white w-full h-10 rounded-sm px-4 border "
                        placeholder="recherche...."
                    />
            </div>
          </div>
        </div>
      }
      >
      
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} /*align={column.uid === "actions" ? "start" : "start"}*/>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell className={item._index % 2 === 0? "":"bg-jaune"}>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>

    {
      selectedUser === undefined ?
        openEditModal && (<AddCarModal isOpen={openEditModal} onClose={() => setOpenEditModal(false)} user={_user_}/>)
        :
        openEditModal && (<AddCarModal isOpen={openEditModal} onClose={() => setOpenEditModal(false)} user={_user_} selectedUser={selectedUser}/>)
    }
    {_user_ === "Administrateur" ?
          openSupprModal && (<SupprModal isOpen={openSupprModal} onClose={() => setopenSupprModal(false)} selectedUser={selectedUser} user={_user_}/>) 
          : ""
    }
    </>
  );
}
