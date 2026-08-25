"use client";
import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
} from "@heroui/react";
import AddCarModal from "@/app/(main)/_gerant/modals/AddCarModal";
import DetailUserModal from "../_user/detailModal";
import SupprModal from "@/app/(main)/_components/supprModal";
import { User } from "../../../type";
import { DeleteIcon, EditIcon, EyeIcon } from "@/app/(main)/_assets/icon";
import { ROLE_CONFIG, STATUS_CONFIG } from "@/app/constants/enums";
import ConfirmationModal from "@/app/(main)/_components/confirmationModal";

export const columns = [
  { name: "NOM", uid: "name" },
  { name: "DATE DE NAISSANCE", uid: "birthday" },
  { name: "FONCTION", uid: "role" },
  { name: "CONTACT", uid: "contact" },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status" },
  { name: "ACCES", uid: "acces" },
  { name: "ACTIONS", uid: "actions" },
];


interface TableauProps {
  _user_: string;
  users?: User[];
  mutate?: () => Promise<User[] | void>;
  isLoading?: boolean;
}

export default function Tableau({
  _user_,
  users,
  mutate,
  isLoading,
}: TableauProps) {

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const actionToOpenEditModal = (user: User) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const [openProfilModal, setOpenProfilModal] = useState<boolean>(false);
  const actionToOpenProfilModal = (user: User) => {
    setSelectedUser(user);
    setOpenProfilModal(true);
  };

  const [openSupprModal, setopenSupprModal] = useState<boolean>(false);
  const actionToOpenSupprModal = (user: User) => {
    setSelectedUser(user);
    setopenSupprModal(true);
  };

  const [openConfirmModal, setopenConfirmModal] = useState<boolean>(false);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    // type SafeCellValue = Exclude<User[keyof User], File | File[]>;
    // const cellValue = user[columnKey as keyof User] as SafeCellValue;
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className=" text-sm capitalize">
              {user.name.toLocaleUpperCase()}
            </p>
            <p className=" text-sm capitalize text-default-400">
              {user.firstName}
            </p>
          </div>
        );
      case "birthday":
        return (
          <div className="flex flex-col">
            <p>{cellValue ? formatDate(cellValue as string) : ""}</p>
          </div>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-sm  capitalize">
              {ROLE_CONFIG[cellValue as keyof typeof ROLE_CONFIG].label}
            </p>
            {/* <p className=" text-sm capitalize text-default-400">{user.specialite!==undefined ? user.specialite[0]:""}</p> */}
          </div>
        );
      case "contact":
        return (
          <div className="flex flex-col">
            <p className=" text-sm capitalize">
              {user.contact.toLocaleString()}
            </p>
          </div>
        );
      case "status":
        return (
          <div className="flex flex-col">
            <span
              className={`px-3 py-1 ${STATUS_CONFIG[cellValue as keyof typeof STATUS_CONFIG].textColor} ${STATUS_CONFIG[cellValue as keyof typeof STATUS_CONFIG].bgColor} text-[10px] font-bold rounded-full uppercase text-center`}
            >
              {STATUS_CONFIG[cellValue as keyof typeof STATUS_CONFIG].label}
            </span>
          </div>
        );
      case "acces":
        return (
          <div className="flex flex-col">
            <div className="flex flex-col">
              <span
                className={`px-3 py-1  text-[10px] font-bold rounded-full uppercase text-center ${user.acces ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
              >
                {user.acces ? "autorise" : "suspendu"}
              </span>
            </div>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => actionToOpenProfilModal(user)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => actionToOpenEditModal(user)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => actionToOpenSupprModal(user)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        // CRITIQUE : Si cellValue est un objet ou un tableau (comme vos filePath),
        // React va planter. Il faut le transformer en string ou renvoyer null.
        if (typeof cellValue === "object") {
          return null; // Ou JSON.stringify(cellValue) pour débugger
        }

        return cellValue as React.ReactNode;
    }
  }, []);

  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  // filtrer le donnee users
  const [search, setSearch] = useState<string>("");

  // 3. Calculer les données filtrées (utilisez un tableau vide par défaut pour éviter les erreurs)
  const dataFilter = useMemo(() => {
    if (!users) return [];
    return users.filter(
      (user) =>
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        ROLE_CONFIG[user.role as keyof typeof ROLE_CONFIG].label
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.contact.toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  const dataWithIndex = useMemo(() => {
    return dataFilter.map((item, index) => ({
      ...item,
      _index: index,
    }));
  }, [dataFilter]);

  // 1. Calculer le nombre total de pages
  const pages = Math.ceil(dataWithIndex.length / rowsPerPage);

  // 2. Extraire les données de la page actuelle
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return dataWithIndex.slice(start, end);
  }, [page, dataWithIndex]);

  // console.log(dataWithIndex);
  // chargement de la page
  if (isLoading || !users) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <Table
        classNames={{
          wrapper: "text-left ", // Couleur du conteneur
          thead: "text-black text-left ", // En-tête
          tbody: "text-gray-700 text-left", // Corps
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
                cursor: "bg-vert text-white ", // Style du curseur actif
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
                  onChange={(e) => setSearch(e.target.value)}
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
            <TableColumn
              key={
                column.uid
              } /*align={column.uid === "actions" ? "start" : "start"}*/
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className={item._index % 2 === 0 ? "" : "bg-jaune"}>
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedUser === undefined
        ? openEditModal && (
            <AddCarModal
              isOpen={openEditModal}
              onClose={() => setOpenEditModal(false)}
              user={_user_}
              mutate={mutate}
            />
          )
        : openEditModal && (
            <AddCarModal
              isOpen={openEditModal}
              onClose={() => setOpenEditModal(false)}
              user={_user_}
              selectedUser={selectedUser}
              mutate={mutate}
            />
          )}
      {_user_ === "ADMIN"
        ? openProfilModal && (
            <DetailUserModal
              isOpen={openProfilModal}
              onClose={() => setOpenProfilModal(false)}
              selectedUser={selectedUser}
              user={_user_}
              confirmModal={() => setopenConfirmModal(true)}
            />
          )
        : ""}
      {_user_ === "ADMIN"
        ? openSupprModal && (
            <SupprModal
              isOpen={openSupprModal}
              onClose={() => setopenSupprModal(false)}
              selectedUser={selectedUser}
              user={_user_}
              mutate={mutate}
            />
          )
        : ""}
      {_user_ === "ADMIN"
        ? openConfirmModal && (
            <ConfirmationModal
              isOpen={openConfirmModal}
              onClose={() => setopenConfirmModal(false)}
              onCloseParent={() => setOpenProfilModal(false)}
              selectedUser={selectedUser}
              user={_user_}
              mutate={mutate}
            />
          )
        : ""}
    </>
  );
}
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "Non spécifiée";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
