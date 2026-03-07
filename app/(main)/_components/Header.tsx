'use client';

import { useState } from "react";
import { BurgerIcon } from "../_assets/icon";
import Menu from "./Menu";
import DetailUserModal from "../_administrateur/_components/_user/detailModal";
import { users } from "../data";
interface HeaderProps{
  title?: string;
  subTitle?: string;
  listMenu: {id: number, name: string, action: React.MouseEventHandler<HTMLButtonElement>}[];
}

const Header = (
  {
    title,subTitle,listMenu
  }:HeaderProps
) => {
  const [show, setShow] = useState("hidden")

  const showMenu = () => {
    setShow( show === "hidden"? "visible" : "hidden")
  }
  const [openProfilModal, setOpenProfilModal] = useState<boolean>(false);
  const actionToOpenProfilModal = () => {
    setOpenProfilModal(true)
  }
  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full bg-vert z-100">
      <div className="flex w-full items-center justify-between h-full px-10 my-2">
        <div className="w-8 h-8 text-white">
          <button type="button" onClick={showMenu} className="cursor-pointer">
            <BurgerIcon />
          </button>
        </div>
        <div className="text-white text-3xl max-md:text-lg">
            {title}
            <p className="text-white text-lg text-center">
              {subTitle}
            </p>
        </div>
      </div>
      <Menu show={show} listMenu={listMenu} showProfil = {actionToOpenProfilModal}/>
      {openProfilModal && (<DetailUserModal isOpen={openProfilModal} onClose={() => setOpenProfilModal(false)} selectedUser={users[1]}/>) }
    </header>
  );
};

export default Header;
