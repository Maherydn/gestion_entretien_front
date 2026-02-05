"use client";

import { useEffect, useState } from "react";


interface MenuProps {
    show: string;
    listMenu: {id: number, name: string, action: React.MouseEventHandler<HTMLButtonElement>}[];
}

const Menu: React.FC<MenuProps> = ({show,listMenu}) => {

  return (
    <div className={`flex flex-col bg-vert  fixed opacity-90 hover:opacity-100 ${show}`}>
      {/* Bloc Filtre */}
      {listMenu.map((list) => (
        <button key={list.id} 
          className={`flex px-10 py-4 hover:bg-jaune text-xl max-md:text-lg font-bold text-white hover:text-black  cursor-pointer 
            ${list.name=="Rappels"?"md:hidden":""} ${list.name=="Informations"?"md:hidden":""}`}
          onClick={list.action} 
        >
          {list.name}
        </button>
      ))}
      <button className="flex px-10 py-4 hover:bg-jaune text-xl max-md:text-lg font-bold text-white hover:text-black  cursor-pointer">
        Profil
      </button>
      <button className="flex px-10 py-4 hover:bg-jaune text-xl max-md:text-lg font-bold text-white hover:text-black  cursor-pointer">
        Se déconnecter
      </button>
    </div>
  );
};

export default Menu;