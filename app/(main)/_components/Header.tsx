"use client";

import { useEffect, useState } from "react";
import { BurgerIcon } from "../_assets/icon";
import Menu from "./Menu";
import DetailUserModal from "../_administrateur/_components/_user/detailModal";
import { users } from "../data";
interface HeaderProps {
  title?: string;
  subTitle?: string;
  listMenu: {
    id: number;
    name: string;
    action: React.MouseEventHandler<HTMLButtonElement>;
  }[];
}

const Header = ({ title, subTitle, listMenu }: HeaderProps) => {
  const [show, setShow] = useState("hidden");
  const [me, setMe] = useState<any>(null);
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "users/me", {
          method: "GET",
          // credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          // throw new Error("Unauthorized");
          console.log("Unauthorized access - no valid token");
          setMe(null);
          return;
        }

        const data = await res.json();
        // console.log("User data:", data);
        setMe(data[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMe();
  }, []);
  const showMenu = () => {
    setShow(show === "hidden" ? "visible" : "hidden");
  };
  const [openProfilModal, setOpenProfilModal] = useState<boolean>(false);
  const actionToOpenProfilModal = () => {
    setOpenProfilModal(true);
  };
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
          <p className="text-white text-lg text-center">{subTitle}</p>
        </div>
      </div>
      <Menu
        show={show}
        listMenu={listMenu}
        showProfil={actionToOpenProfilModal}
      />
      {openProfilModal && (
        <DetailUserModal
          isOpen={openProfilModal}
          onClose={() => setOpenProfilModal(false)}
          selectedUser={me}
          isProfile={true}
        />
      )}
    </header>
  );
};

export default Header;
