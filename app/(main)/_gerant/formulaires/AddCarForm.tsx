"use client";

import { useState } from "react";
import { Car } from "../../type";

interface AddCarFormProps {
  selectedCar?: Car;
  onClose: ()=>void;
  setCars?: (values: Car) => void;
  cars?: Car[];
  setImTitle?: (immatriculation: string)=> void;
}

const AddCarForm = ({selectedCar,onClose,setCars,cars,setImTitle} : AddCarFormProps) => {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectCarModify, setModifyCar] = useState(selectedCar);
    const [formData, setFormData] = useState({});
    const [newCar, setNewCar] = useState<Car>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { type, name, value} = e.target
        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })

        // setTitle(e.target.value);
    };

    const addNewCar = ()=>{
        if (typeof selectedCar != 'undefined'){
            setModifyCar({
                    id:selectCarModify.id,
                    immatriculation: formData.immatriculation || selectCarModify?.immatriculation,
                    kilometrage: formData.kilometrage || selectCarModify?.kilometrage,
                    visiteTechnique: formData.visiteTechnique || selectCarModify?.visiteTechnique,
                    assurance: formData.assurance || selectCarModify?.assurance,
                    etat: formData.etat || selectCarModify?.etat,
                    imageUrl: formData.imageUrl || selectCarModify?.imageUrl,
                    sit: formData.sit || selectCarModify?.sit,
                    carType: { id: 4, type: "Pickup" },
                    fuel: { id: 4, type: "Diesel", conso: 5 },
                })
        }else{
            setNewCar({
                    id:cars.length+1,
                    immatriculation: formData.immatriculation,
                    kilometrage: formData.kilometrage,
                    visiteTechnique: formData.visiteTechnique,
                    assurance: formData.assurance,
                    etat: formData.etat,
                    imageUrl: formData.imageUrl,
                    sit: formData.sit,
                    carType: { id: 4, type: "Pickup" },
                    fuel: { id: 4, type: formData.fuel, conso: 5 },
                })
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // if (!formData.type.trim()) return; // ne rien envoyer si vide
        // setLoading(true);
        
        try {
        // ⚡ Ici tu peux remplacer par ton API call
            if (typeof selectCarModify != 'undefined'){
                console.log("Vehicule modifier");    
                setCars(selectCarModify)
                setImTitle(selectCarModify.immatriculation)
                console.log(selectCarModify)
            }else{
                setCars(newCar)
            }
        // Exemple : await createList({ title });
        alert(`Liste enregistrée : ${formData.immatriculation}`);
        onClose();
        setTitle(""); // reset du formulaire
        } catch (err) {
        console.error("Erreur :", err);
        } finally {
        setLoading(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col  justify-between w-full mb-4 p-4 overflow-auto gap-4">

            {/* type */}
            <div className="flex flex-col">
                <label>
                    Type de vehicule
                </label>
                <select 
                    className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                    required
                    onChange={handleChange}
                    id="type"
                    name="type"
                    value={formData.type || "voiture"}
                >
                    {
                        (typeof selectCarModify !== 'undefined')?
                            
                            <>
                                <option value={selectCarModify.carType.type.toString()}>{selectCarModify.carType.type.toString()}</option>
                            </>
                            :
                            <>
                                <option value={"autre"}>Autre</option>
                                <option value={"moto"}>Moto</option>
                                <option value={"voiture"}>Voiture</option>
                            </>
                    }
                </select>
            </div>
            {
                formData.type === "autre" ? 
                   <div className="flex flex-col">
                <label>
                    Nouveau type de vehicule
                </label>
                <input
                    id="newType"
                    name="newType"
                    value={formData.newType || ""}
                    onChange={handleChange}
                    placeholder="nouveau type de vehicule"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                    required
                />
            </div>:""
            
            }
            {/* im */}
            <div className="flex flex-col">
                <label>
                    Immatriculation
                </label>
                <input
                    id="immatriculation"
                    name="immatriculation"
                    value=
                    {
                        (typeof selectCarModify !== 'undefined')? formData.immatriculation || selectCarModify.immatriculation : formData.immatriculation || ""
                    }
                    onChange={handleChange}
                    placeholder="immatriculation"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                    required
                />
            </div>

            {/* marque */}
            <div className="flex flex-col">
                <label>
                    Marque
                </label>
                <input
                    id="marque"
                    name="marque"
                    value={formData.marque || ""}
                    onChange={handleChange}
                    placeholder="marque"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                    required
                />
            </div>

            {/* modele */}
            <div className="flex flex-col">
                <label>
                    Modele
                </label>
                <input
                    id="modele"
                    name="modele"
                    value={formData.modele || ""}
                    onChange={handleChange}
                    placeholder="modele"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                    required
                />
            </div>

            {/* energie */}
            <div className="flex flex-col">
                <label>
                    Type d'energie utilise
                </label>
                <select 
                    className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                    required
                    onChange={handleChange}
                    id="fuel"
                    name="fuel"
                    value={formData.fuel || "Diesel"}
                >
                    {
                        (typeof selectCarModify !== 'undefined')?
                            
                            <>
                                <option value={selectCarModify.fuel.type}>{selectCarModify.fuel.type}</option>
                            </>
                            :
                            <>
                                <option value={"Diesel"}>Diesel</option>
                                <option value={"Essence"}>Essence</option>
                                <option value={"Electrique"}>Electrique</option>
                                <option value={"Hybride"}>Hybride</option>
                            </>
                    }
                </select>
            </div>

            {/* place */}
            
            <div className="flex flex-col">
                <label>
                    Nombre de places
                </label>
                <input
                    id="sit"
                    name="sit"
                    value=
                    {
                        (typeof selectCarModify !== 'undefined')? formData.sit || selectCarModify.sit : formData.sit || ""
                    }
                    onChange={handleChange}
                    placeholder="nombre de places"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                    required
                    type="number"
                    min={2}
                />
            </div>
            
            {/* Puissance */}
            
            <div className="flex flex-col">
                <label>
                    Puissance fiscale
                </label>
                <input
                    id="puissance"
                    name="puissance"
                    value=
                    {
                        (typeof selectCarModify !== 'undefined')? formData.puissance || 5 : formData.puissance || ""
                    }
                    onChange={handleChange}
                    placeholder="puissance fiscale"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                    required
                    type="number"
                    min={0}
                />
            </div>

            {/* annee de mise en circulation */}
            
            <div className="flex flex-col">
                <label>
                    Annee de premiere mise en circulation
                </label>
                <input
                    id="annee"
                    name="annee"
                    value={formData.annee || ""}
                    onChange={handleChange}
                    placeholder="annee de premiere mise em circulation"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                    required
                    type = "date"
                />
            </div>

            {/* odometre */}
            
            <div className="flex flex-col">
                <label>
                    Odometre actuel
                </label>
                <input
                    id="kilometrage"
                    name="kilometrage"
                    value=
                    {
                        (typeof selectCarModify !== 'undefined')? formData.kilometrage || selectCarModify.kilometrage : formData.kilometrage || ""
                    }
                    onChange={handleChange}
                    placeholder="odometre actuel"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                    required
                    type="number"
                    min={0}
                />
            </div>

            {/* Assurance */}
            
            <div className="flex flex-col">
                <label>
                    Date de validite de l'assurance
                </label>
                <input
                    id="assurance"
                    name="assurance"
                    value=
                    {
                        (typeof selectCarModify !== 'undefined')? formData.assurance || selectCarModify.assurance : formData.assurance || ""
                    }
                    
                    onChange={handleChange}
                    placeholder="assurance"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                    required
                    type="date"
                />
            </div>

            {/* Visite */}
            
            <div className="flex flex-col">
                <label>
                    Date de validite du visite technique
                </label>
                <input
                    id="visiteTechnique"
                    name="visiteTechnique"
                    value=
                    {
                        (typeof selectCarModify !== 'undefined')? formData.visiteTechnique || selectCarModify.visiteTechnique : formData.visiteTechnique || ""
                    }
                    onChange={handleChange}
                    placeholder="visite technique"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                    required
                    type = "date"
                />
            </div>

            <div className="flex flex-col">
                <label >
                    Inserer un photo de la voiture
                </label>
                <input 
                    type="file" 
                    id="imageUrl" 
                    name="imageUrl"
                    value={formData.imageUrl || ""}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                    required
                    onChange={handleChange}
                    accept="image/*"
                />
            </div>
            <div className="flex flex-col">
                <label >
                    Inserer les photos du carte grise
                </label>
                <input 
                    type="file" 
                    id="cg" 
                    name="cg"
                    value={formData.cg || ""}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                    required
                    onChange={handleChange}
                    accept="image/* , .pdf"
                    multiple
                />
            </div>
            <div className="flex flex-col">
                <label >
                    Inserer les photos du carte fiscale
                </label>
                <input 
                    type="file" 
                    id="nif" 
                    name="nif"
                    value={formData.nif || ""}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                    required
                    onChange={handleChange}
                    accept="image/* , .pdf"
                    multiple
                />
            </div>
            <div className="flex flex-col">
                <label >
                    Inserer les photos du carte statistique
                </label>
                <input 
                    type="file" 
                    id="statistique" 
                    name="statistique"
                    value={formData.statistique || ""}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                    required
                    onChange={handleChange}
                    accept="image/* , .pdf"
                    multiple
                />
            </div>
            {/* Bouton */}
            <button
                type="submit"
                onClick={addNewCar}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md w-full transition-colors duration-200 disabled:opacity-50"
                >
                {loading ? "Envoi..." : "Ajouter"}
            </button>
        </form>
        );
};

export default AddCarForm;