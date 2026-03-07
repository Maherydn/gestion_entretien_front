import { User } from "@/app/(main)/type";
import { p } from "framer-motion/client";
import { ReactElement, useEffect, useState } from "react";

interface DetailUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: string;
  selectedUser?: User;
  setImTitle?: (immatriculation : string)=> void;
  modalIndex?: string
}


const DetailUserModal: React.FC<DetailUserModalProps> = ({
  isOpen,
  onClose,
  user,
  setImTitle,
  selectedUser,
  modalIndex
}) => {
  const [modalTitle,setModalTitle] = useState<string>('')
  const [modalForm,setModalForm] = useState<ReactElement>()
  useEffect(() => {
      switch (user) {
      case "Gerant":
        if (typeof selectedUser !== 'undefined'){
          setModalTitle("Modifier le vehicule no:  ")
        }
        else   
          setModalTitle("Ajout d'une nouvelle voiture")
        break;
      case "Administrateur":
        if (selectedUser !== undefined )
          setModalTitle(selectedUser.nom+" "+selectedUser.prenom)
        else 
          setModalTitle("Profil utilisateur")
        break;
      default:
        if (selectedUser !== undefined )
          setModalTitle(selectedUser.nom+" "+selectedUser.prenom)
        break;
    }
  }, [ onClose, setImTitle, user,selectedUser]); // Optional dependency array
  return (
    <dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 h-screen w-full"
      id={modalIndex || ''}
    >
      <div className="bg-white rounded-lg shadow-md p-6  w-1/2  max-md:w-full  dark:bg-slate-100 flex flex-col max-w-6xl">
        <div className="flex justify-between w-full shadow-md mb-4">
          <h2 className="text-lg font-semibold m-4">
            {
              modalTitle
            }
          </h2>
          <button
            onClick={onClose}
            className="rounded-md text-slate-800 hover:bg-red-500  w-6 h-6 text-xl flex justify-center items-center pb-px cursor-pointer hover:text-white duration-300 m-4"
          >
            <p className="mb-2">x</p>
          </button>
        </div>
        <div className="flex flex-row">
            <div className="w-1/3">
              <img src={selectedUser?.avatar} alt="profil" className="rounded-full m-auto" />
            </div>
            <div className="flex flex-col  w-2/3 justify-center items-center">
              <p className="font-bold min-lg:text-4xl">{selectedUser?.fonction.label}</p>
              <p className="font-bold min-lg:text-2xl">{selectedUser?.specialite?.map((spec)=>(spec+"/"))}</p>
            </div>
        </div>
        <div className="flex flex-row ">
            <div className="w-1/3 items-end pt-4 min-lg:text-xl p-4 gap-4 font-bold">
              <p className="text-left">Date de naissance </p>
            </div>
            <div className="flex flex-col  w-2/3 justify-center min-lg:text-xl italic">
              <p className="">{new Intl.DateTimeFormat('fr-FR', {year: 'numeric',month: 'long',day: 'numeric',timeZone: 'UTC',}).format(selectedUser?.date_naissance)}</p>
            </div>
        </div>
        <div className="flex flex-row ">
            <div className="w-1/3 items-end pt-4 min-lg:text-xl p-4 gap-4 font-bold">
              <p className="text-left">C.I.N </p>
            </div>
            <div className="flex flex-col  w-2/3 justify-center min-lg:text-xl italic">
              <p className="">
                {selectedUser?.cin.num}
                
                <button className="ml-4 py-1 px-5 text-md border-1"><a className="" href={selectedUser?.cin.photo}>Telecharger</a></button>
              </p>
              
            </div>
        </div>
        <div className="flex flex-row ">
            <div className="w-1/3 items-end pt-4 min-lg:text-xl p-4 gap-4 font-bold">
              <p className="text-left">Email </p>
            </div>
            <div className="flex flex-col  w-2/3 justify-center min-lg:text-xl italic">
              <p className="">{selectedUser?.email}</p>
            </div>
        </div>
        <div className="flex flex-row ">
            <div className="w-1/3 items-end pt-4 min-lg:text-xl p-4 gap-4 font-bold">
              <p className="text-left">Telephone </p>
            </div>
            <div className="flex flex-col  w-2/3 justify-center min-lg:text-xl italic">
              <p className="">{selectedUser?.contact}</p>
            </div>
        </div>
        <div className="flex flex-row ">
            <div className="w-1/3 items-end pt-4 min-lg:text-xl p-4 gap-4 font-bold">
              <p className="text-left">Adresse </p>
            </div>
            <div className="flex flex-col  w-2/3 justify-center min-lg:text-xl italic">
              <p className="">{selectedUser?.adress}</p>
            </div>
        </div>
        <div className="flex flex-row ">
            <div className="w-1/3 items-end pt-4 min-lg:text-xl p-4 gap-4 font-bold">
              <p className="text-left">C.V  </p>
            </div>
            <div className="flex flex-col  w-2/3 justify-center min-lg:text-xl italic">
              <button className="py-1 px-5 text-md border-1"><a className="" href={selectedUser?.cv}>Telecharger</a></button>
            </div>
        </div>
        <div className="flex flex-row ">
            <div className="w-1/3 items-end pt-4 min-lg:text-xl p-4 gap-4 font-bold">
              <p className="text-left">Compte cree le </p>
            </div>
            <div className="flex flex-col  w-2/3 justify-center min-lg:text-xl italic">
              <p className="">{new Intl.DateTimeFormat('fr-FR', {year: 'numeric',month: 'long',day: 'numeric',timeZone: 'UTC',}).format(selectedUser?.created_at)}</p>
            </div>
        </div>
        <div className="flex flex-row ">
            <div className="w-1/3 items-end pt-4 min-lg:text-xl p-4 gap-4 font-bold">
              <p className="text-left">{selectedUser?.permis !== undefined ? 'Permis':''}</p>
            </div>
            <div className="flex flex-col  w-2/3 justify-center min-lg:text-xl italic">
              {selectedUser?.permis !== undefined ? <button className="py-1 px-5 text-md border-1"><a className="" href={selectedUser?.permis.photo}>Telecharger</a></button>:''}
            </div>
        </div>
        {/* {modalForm} */}
      </div>
    </dialog>
  );
};

export default DetailUserModal;