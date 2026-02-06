"use client";
import React, { useMemo, useState } from "react";
import type {SVGProps} from "react";
import type {ChipProps} from "@heroui/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Pagination 
} from "@heroui/react";
import FloatingButton from "@/app/(main)/_components/FloatingButton";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const columns = [
  {name: "NOM", uid: "nom"},
  // {name: "PRENOM", uid: "prenom"},
  {name: "FONCTION", uid: "fonction"},
  {name: "CONTACT", uid: "contact"},
  {name: "EMAIL", uid: "email"},
  {name: "STATUS", uid: "status"},
  {name: "ACTIONS", uid: "actions"},
];

export const users = [
  {
    id: 1,
    nom: "RAKOTONDRAMELO",
    prenom: "Safidinandrasana Angelo",
    fonction: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
    contact: "0332203223"
  },
  {
    id: 2,
    nom: "Zoey Lang",
    prenom: "Albert",
    fonction: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
    contact: "0332203223"
  },
  {
    id: 3,
    nom: "Jane Fisher",
    prenom: "Albert",
    fonction: "Senior Developer",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
    contact: "0332203223"
  },
  {
    id: 4,
    nom: "William Howard",
    prenom: "Albert",
    fonction: "Community Manager",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
    contact: "0332203223"
  },
  {
    id: 5,
    nom: "Kristen Copper",
    prenom: "Albert",
    fonction: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
    contact: "0332203223"
  },
  {
    id: 6,
    nom: "RAKOTONDRAMELO",
    prenom: "Safidinandrasana Angelo",
    fonction: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
    contact: "0332203223"
  },
  {
    id: 7,
    nom: "Zoey Lang",
    prenom: "Albert",
    fonction: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
    contact: "0332203223"
  },
  {
    id: 8,
    nom: "Jane Fisher",
    prenom: "Albert",
    fonction: "Senior Developer",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
    contact: "0332203223"
  },
  {
    id: 9,
    nom: "William Howard",
    prenom: "Albert",
    fonction: "Community Manager",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
    contact: "0332203223"
  },
  {
    id: 10,
    nom: "Kristen Copper",
    prenom: "Albert",
    fonction: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
    contact: "0332203223"
  },
  {
    id: 11,
    nom: "Zoey Lang",
    prenom: "Albert",
    fonction: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
    contact: "0332203223"
  },
  {
    id: 12,
    nom: "Jane Fisher",
    prenom: "Albert",
    fonction: "Senior Developer",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
    contact: "0332203223"
  },
  {
    id: 13,
    nom: "William Howard",
    prenom: "Albert",
    fonction: "Community Manager",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
    contact: "0332203223"
  },
  {
    id: 14,
    nom: "Kristen Copper",
    prenom: "Albert",
    fonction: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
    contact: "0332203223"
  },
  {
    id: 15,
    nom: "Zoey Lang",
    prenom: "Albert",
    fonction: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
    contact: "0332203223"
  },
  {
    id: 16,
    nom: "Jane Fisher",
    prenom: "Albert",
    fonction: "Senior Developer",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
    contact: "0332203223"
  },
  {
    id: 17,
    nom: "William Howard",
    prenom: "Albert",
    fonction: "Community Manager",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
    contact: "0332203223"
  },
  {
    id: 18,
    nom: "Kristen Copper",
    prenom: "Albert",
    fonction: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
    contact: "0332203223"
  },
  {
    id: 19,
    nom: "Zoey Lang",
    prenom: "Albert",
    fonction: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
    contact: "0332203223"
  },
  {
    id: 20,
    nom: "Jane Fisher",
    prenom: "Albert",
    fonction: "Senior Developer",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
    contact: "0332203223"
  },
  {
    id: 21,
    nom: "William Howard",
    prenom: "Albert",
    fonction: "Community Manager",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
    contact: "0332203223"
  },
  {
    id: 22,
    nom: "Kristen Copper",
    prenom: "Albert",
    fonction: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
    contact: "0332203223"
  },
];

export const EyeIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const DeleteIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const EditIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};
const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

type User = (typeof users)[0];

export default function App() {
  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "nom":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.prenom}</p>

          </div>
        );
      // case "prenom":
      //   return (
      //     <div className="flex flex-col">
      //       <p className="text-bold text-sm capitalize">{cellValue}</p>
      //     </div>
      //   );
      case "fonction":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
          </div>
        );
      case "contact":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
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
  const dataFilter = users.filter(user =>
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.nom.toLowerCase().includes(search.toLowerCase()) ||
    user.prenom.toLowerCase().includes(search.toLowerCase()) ||
    user.fonction.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.contact.toLowerCase().includes(search.toLowerCase())
  );
  // 1. Calculer le nombre total de pages
  const pages = Math.ceil(dataFilter.length / rowsPerPage);

  // 2. Extraire les données de la page actuelle
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return dataFilter.slice(start, end);
  }, [page, dataFilter]);


  return (
    <Table 
      classNames={{
        wrapper: "text-left ", // Couleur du conteneur
        thead: "text-black text-left", // En-tête
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
            {(columnKey) => <TableCell className={item.id%2 === 0? "":"bg-jaune"}>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
