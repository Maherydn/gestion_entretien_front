"use client";

import { useState } from "react";
import { User, UserStatus } from '../../../type';
import Chauffeur from '../../../_chauffeur/page';
import { userFonctionData, userStatutData } from "@/app/(main)/data";
import { form } from "@heroui/react";


interface AddUserFormProps {
  selectedUser?: User;
  onClose: ()=>void;
  setUser?: (values: User) => void;
  users?: User[];
}

const AddUserForm = ({selectedUser,onClose,setUser,users} : AddUserFormProps) => {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedUserState, setSelectedUserState] = useState(selectedUser);
    const [selectedUserFonctionState, setSelectedUserFonctionState] = useState(selectedUser?.fonction.id);
    const [formData, setFormData] = useState({});
    const [newUser, setNewUser] = useState<User>();
    const [inputPermis, setInputPermis] = useState<boolean>(false)
    const [inputSpecialite, setInputSpecialite] = useState<boolean>(false)


    const _user = {
        id: 3,
        nom: "RAKOTONDRAMELO",
        prenom: "Safidinandrasana Angelo",
        date_naissance: new Date('2025-02-18'),
        cin: {num:"101 241 155 000" , photo: "https://i.pravatar.cc/150?u=a042581f4e29026024d"},
        email: "tony.reichert@example.com",
        contact: "0332203223",
        fonction: userFonctionData[4],
        status: userStatutData[0],
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        cv: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        created_at : new Date('10-02-2026'),
        adress: 'LOT 3 W5 T6',
        mdp: "STRing0123",
      }
    const typeUser = (selectedUserState != undefined)? Object.keys(selectedUserState) : Object.keys(_user)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { type, name, value} = e.target
        setFormData(prev => {
            if (selectedUserFonctionState !== undefined){
                setSelectedUserFonctionState(formData.fonction || selectedUserFonctionState)
            }
            return {
                ...prev,
                [name]: value
            }
        })

        // setTitle(e.target.value);
    };
    const addUser = ()=>{
        if (selectedUserState != undefined){
            setSelectedUserState({
                id: selectedUserState.id,
                nom: formData.nom || selectedUserState.nom,
                prenom: formData.prenom || selectedUserState.prenom,
                date_naissance: new Date(formData.date_naissance || selectedUserState.date_naissance,),
                cin: {num:formData.num_cin || selectedUserState.cin.num,  photo: formData.photo_cin || selectedUserState.cin.photo},
                email: formData.email || selectedUserState.email,
                contact: formData.contact || selectedUserState.contact,
                fonction: userFonctionData[Number(formData.fonction || selectedUserState.fonction.id)],
                status: userStatutData[Number(formData.statut || selectedUserState.status.id)],
                avatar: formData.avatar || selectedUserState.avatar,
                cv: formData.cv || selectedUserState.cv,
                created_at : new Date(selectedUserState.created_at),
                modify_at : new Date(),
                adress: formData.adress || selectedUserState.adress,
                mdp: formData.mdp || selectedUserState.mdp,
                permis: {num: formData.num_permis || selectedUserState.permis?.num, photo: formData.photo_permis || selectedUserState.permis?.photo,},
                specialite: formData.specialite || selectedUserState.specialite || null
                })
        }else{
            setNewUser({
                id: selectedUserState.id,
                nom: formData.nom ,
                prenom: formData.prenom ,
                date_naissance: new Date(formData.date_naissance),
                cin: {num:formData.num_cin , photo: formData.photo_cin},
                email: formData.email,
                contact: formData.contact,
                fonction: userFonctionData[Number(formData.fonction)],
                status: userStatutData[Number(formData.statut)],
                avatar: formData.avatar,
                cv: formData.cv ,
                created_at : new Date(),
                modify_at : new Date(),
                adress: formData.adress,
                mdp: "hasard",
                permis: {num: formData.num_permis || null , photo: formData.photo_permis || null},
                specialite: formData.specialite || null
            })
        }
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // if (!formData.type.trim()) return; // ne rien envoyer si vide
        // setLoading(true);
        
        try {
        // ⚡ Ici tu peux remplacer par ton API call
        console.log(selectedUserState)
        console.log(newUser)
        // Exemple : await createList({ title });
        alert(`Liste enregistrée : ${formData.nom}`);
        onClose();
        } catch (err) {
        console.error("Erreur :", err);
        } finally {
        setLoading(false);
        }
    };
    console.log(selectedUserFonctionState)
    
    const [typeMap,setTypeMap] = useState({
        date_naissance: 'date',
        email: 'email',
        avatar: 'file',
        cv: 'file',
        mdp:'password'
        
    })
    return (
        <form onSubmit={handleSubmit} className="flex flex-col  justify-between w-full mb-4 p-4 overflow-auto gap-4">

            {/* modele */}
            {typeUser.slice(1).map((type, index) => (
                type === 'created_at' || type === '_index' || type === 'mdp' || type === 'specialite' || type === 'permis'?'':
                type === 'cin' ?
                    <div key={index}>
                        <div className="flex flex-col" key={`num_${index}`}>
                            <label>
                                NUMERO {type.toLocaleUpperCase()}
                            </label>
                            <input
                                id={`num_${type}`}
                                name={`num_${type}`}
                                type= {typeMap[type] || "string" }
                                placeholder={`numero ${type}`}
                                value=
                                {
                                    selectedUserState !== undefined? 
                                        formData[`num_${type}`] || selectedUserState[type]?.num 
                                        :
                                        formData[`num_${type}`] || ""
                                }
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                required
                            />
                        </div>
                        {
                        selectedUserState === undefined? 
                        <div className="flex flex-col mt-4" key={`photo_${index}`}>
                            <label>
                                PHOTO {type.toLocaleUpperCase()}
                            </label>
                            <input
                                id={`photo_${type}`}
                                name={`photo_${type}`}
                                type= 'file'
                                value= {formData[`photo_${type}`] || ""}
                                // disabled = {false}
                                placeholder={`photo ${type}`}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                required
                            />
                            <img className="flex flex-col w-full" key={`photo_${index}`} src={formData[`photo_${type}`]}/>
                        </div>
                        :
                        <div className="flex flex-col mt-4" key={`photo_${index}`}>
                            <label htmlFor={`photo_${type}`}>
                                PHOTO {type.toLocaleUpperCase()}
                            </label>
                            
                            <input
                                id={`photo_${type}`}
                                name={`photo_${type}`}
                                type= 'file'
                                value= {formData[`photo_${type}`] || ""}
                                // disabled = {false}
                                placeholder={`photo ${type}`}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                            />
                            <img className="flex flex-col w-full" key={`photo_${index}`} src={selectedUserState[type]?.photo}/>
                        </div>
                        }
                        
                    </div>
                :
                type ==="fonction"?
                    <div className="flex flex-col " key={index}>
                        <label>
                            {type.toUpperCase()}
                        </label>
                        <select 
                            className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                            required
                            onChange={handleChange}
                            id={type}
                            name={type}
                            value={formData.fonction || selectedUserFonctionState}
                        >
                            {
                                selectedUserState !== undefined ? '':<option value="">Choisissez sa fonction</option>
                            }
                            {
                                userFonctionData.map((userFonction)=>(
                                    <option value={userFonction.id} key={userFonction.id}>{userFonction.desc}</option>
                                ))
                            }
                        </select>
                        {
                            parseInt(formData.fonction) === 1 || selectedUserFonctionState === 1? 
                            <div className="flex flex-col mt-4" >
                                <label>
                                    SPECIALITE
                                </label>
                                <input
                                    id="specialite"
                                    name="specialite"
                                    value={formData.specialite || selectedUserState?.specialite || ''}
                                    onChange={handleChange}
                                    placeholder="Ajouter specialite"
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                    required
                                />
                            </div>
                            :
                            parseInt(formData.fonction) === 0 || selectedUserFonctionState === 0? 
                            <div key={index} className="mt-4">
                                <div className="flex flex-col" key={`num_${index}`}>
                                    <label>
                                        NUMERO PERMIS
                                    </label>
                                    <input
                                        id={`num_permis`}
                                        name={`num_permis`}
                                        type= {typeMap[type] || "string" }
                                        placeholder={`numero permis`}
                                        value=
                                        {
                                            selectedUserState !== undefined? 
                                                formData[`num_permis`] || selectedUserState['permis']?.num || '' 
                                                :
                                                formData[`num_permis`] || ""
                                        }
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                        required
                                    />
                                </div>
                                {
                                selectedUserState === undefined? 
                                <div className="flex flex-col mt-4" key={`photo_${index}`}>
                                    <label>
                                        PHOTO PERMIS
                                    </label>
                                    <input
                                        id={`photo_permis`}
                                        name={`photo_permis`}
                                        type= 'file'
                                        value= {formData[`photo_permis`] || ""}
                                        // disabled = {false}
                                        placeholder={`photo ${type}`}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                        required
                                    />
                                    <img className="flex flex-col w-full" key={`photo_permis`} src={formData['photo_permis']}/>
                                </div>
                                :
                                <div className="flex flex-col mt-4" key={`photo_${index}`}>
                                    <label htmlFor="photo_permis">PHOTO PERMIS</label>
                                    <input
                                        id={`photo_permis`}
                                        name={`photo_permis`}
                                        type= 'file'
                                        value= {formData[`photo_permis`] || ""}
                                        // disabled = {false}
                                        placeholder={`photo ${type}`}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                    />
                                    <img className="flex flex-col w-full" key={`photo_permis`} src={selectedUserState["permis"]?.photo}/>
                                </div>
                                }
                                
                            </div>:''
                        }
                    </div>
                    :
                type==="status"?
                    <div className="flex flex-col " key={index}>
                        <label>
                            {type.toUpperCase()}
                        </label>
                        <select 
                            className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                            required
                            onChange={handleChange}
                            id={type}
                            name={type}
                            value={formData.status || selectedUserState?.status || ''}
                        >
                            {
                                selectedUserState !== undefined ? '':<option value="">Choisissez sa disponibilite actuelle</option>
                            }
                            {
                                userStatutData.map((userStatut)=>(
                                    <option value={userStatut.id} key={userStatut.id}>{userStatut.desc}</option>
                                ))
                            }
                        </select>
                    </div>
                    :
                type==="team"?
                    <div className="flex flex-col " key={index}>
                        <label>
                            {type.toUpperCase()}
                        </label>
                        <select 
                            className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                            required
                            onChange={handleChange}
                            id={type}
                            name={type}
                            value={formData.team || selectedUserState?.team}
                        >
                            <option value={"executeur"}>Executeur</option>
                            <option value={"ordonnateur"}>Ordonnateur</option>
                        </select>
                    </div>
                    :
                    <div className="flex flex-col" key={index}>
                        <label>
                            {type === "date_naissance"? "Date de naissance".toLocaleUpperCase():type.toUpperCase()}
                        </label>
                        <input
                            id={type}
                            name={type}
                            type= {typeMap[type] || "string" }
                            value={
                                selectedUserState !== undefined? 
                                    type !== 'avatar'?
                                        type !== 'cv'?
                                            type !== 'date_naissance'?
                                                formData[type] || selectedUserState[type]:
                                                formData[type] ||new Date(selectedUserState[type]).toISOString().split('T')[0]
                                        : 
                                        formData[type] || ""
                                    :
                                    formData[type] || ""
                                : 
                                formData[type] || ""
                            }
                            onChange={handleChange}
                            placeholder={(selectedUserState !== undefined)? selectedUserState[type]:type}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                            required= {selectedUserState !== undefined? false:true}
                        />
                    </div>
            ))}
            {/* Bouton */}
            <button
                type="submit"
                onClick={addUser}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md w-full transition-colors duration-200 disabled:opacity-50"
                >
                {loading ? "Envoi..." : (selectedUserState !== undefined)?"Modifier":"Ajouter"}
            </button>
        </form>
        );
};

export default AddUserForm;