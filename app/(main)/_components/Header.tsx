'use client';

import { useState } from "react";
import { BurgerIcon } from "../_assets/icon";
import Menu from "./Menu";
interface HeaderProps{
  title?: string;
  subTitle?: string;
  showFilter? : React.MouseEventHandler<HTMLButtonElement>;
}


const Header = (
  {
    title,subTitle,showFilter
  }:HeaderProps
) => {
  const [show, setShow] = useState("hidden")

  const showMenu = () => {
    setShow( show === "hidden"? "visible" : "hidden")
  }
  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl bg-vert">
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
      <Menu show={show} showFilter={showFilter}/>
    </header>
  );
};

export default Header;
