"use client";

import { useState } from "react";
import { Car } from "../../type";
import {
  FileDropMultiple,
  InputField,
  SelectField,
} from "../../_administrateur/_components/formulaires/_components/fields";
import { carTypes, carTypesData, fuelTypesData } from "../../data";
import toast from "react-hot-toast";

interface AddCarFormProps {
  selectedCar?: Car;
  onClose: () => void;
  setCars?: (values: Car) => void;
  cars?: Car[];
  setImTitle?: (immatriculation: string) => void;
}

const AddCarForm = ({
  selectedCar,
  onClose,
  setCars,
  cars,
  setImTitle,
}: AddCarFormProps) => {
  const [title, setTitle] = useState("");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, type } = e.target;
    const value =
      type === "file"
        ? (e.target as HTMLInputElement).files?.[0]
        : e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilesChange = (name: string, files: File[]) =>
    setFormData((prev) => ({ ...prev, [name]: files }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const isValid = validate();

    // if (!isValid) {
    //   setLoading(false);
    //   return;
    // }
    // setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value))
          value.forEach((f: File) => data.append(key, f));
        else if (value instanceof File) data.append(key, value);
        else if (value !== undefined && value !== null)
          data.append(key, value.toString());
      });

      const isEdit = !!selectedCar;
      // if (typeof selectCarModify != "undefined") {
      //   console.log("Vehicule modifier");
      //   setCars(selectCarModify);
      //   setImTitle(selectCarModify.immatriculation);
      //   console.log(selectCarModify);
      // } else {
      //   setCars(newCar);
      // }
      const url = isEdit
        ? `${process.env.NEXT_PUBLIC_API_URL}cars/${selectedCar.registrationNumber}`
        : `${process.env.NEXT_PUBLIC_API_URL}cars`;

      const method = isEdit ? "PUT" : "POST";
      console.log("URL : "+ url +" METHOD : "+ method)
      // console.log(formData)
      console.log(data);
      const token = localStorage.getItem("token");
      const res = await fetch(url, {
        method,
        body: data,
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      // if (!res.ok) throw new Error("Erreur API");
      if (!res.ok) {
  const text = await res.text();
  console.log(text);
  throw new Error(text);
}

      const result = await res.json();
      console.log("Réponse API :", result);
      console.log(data);
      // if (typeof mutate === "function") {
      //   console.log("Mutating data...");
      //   await mutate();
      // }
      toast.success(
        `Vehicule ${selectedCar ? "modifié" : "ajouté"} avec succès !`,
      );
      setTitle(""); 
      onClose();
      console.log(formData);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'envoi du formulaire");
    } finally {
      setLoading(false);
    }
  };

  // const addNewCar = () => {
  //   if (typeof selectedCar != "undefined") {
  //     setModifyCar({
  //       id: selectCarModify.id,
  //       immatriculation:
  //         formData.immatriculation || selectCarModify?.immatriculation,
  //       kilometrage: formData.kilometrage || selectCarModify?.kilometrage,
  //       visiteTechnique:
  //         formData.visiteTechnique || selectCarModify?.visiteTechnique,
  //       assurance: formData.assurance || selectCarModify?.assurance,
  //       etat: formData.etat || selectCarModify?.etat,
  //       imageUrl: formData.imageUrl || selectCarModify?.imageUrl,
  //       sit: formData.sit || selectCarModify?.sit,
  //       carType: { id: 4, type: "Pickup" },
  //       fuel: { id: 4, type: "Diesel", conso: 5 },
  //     });
  //   } else {
  //     setNewCar({
  //       id: cars.length + 1,
  //       immatriculation: formData.immatriculation,
  //       kilometrage: formData.kilometrage,
  //       visiteTechnique: formData.visiteTechnique,
  //       assurance: formData.assurance,
  //       etat: formData.etat,
  //       imageUrl: formData.imageUrl,
  //       sit: formData.sit,
  //       carType: { id: 4, type: "Pickup" },
  //       fuel: { id: 4, type: formData.fuel, conso: 5 },
  //     });
  //   }
  // };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 w-full mx-auto  bg-white overflow-y-auto sm:text-xl"
    >
      <SelectField
        label="Type de vehicule"
        name="type"
        value={formData.type ?? ""}
        options={carTypesData.map((f) => ({
          value: f.type,
          label: f.type,
        }))}
        onChange={handleChange}
        required
      />
      {formData.type === "autre" ? (
        <InputField
          label="Nouveau type de vehicule"
          name="newType"
          value={formData.newType ?? ""}
          onChange={handleChange}
          required
        />
      ) : (
        ""
      )}
      {/* immatriculation */}
      <InputField
        label="Immatriculation"
        name="registrationNumber"
        value={formData.registrationNumber ?? selectedCar?.registrationNumber ?? ""}
        onChange={handleChange}
        required
      />

      <InputField
        label="Date de premiere mise en circulation"
        name="releaseDate"
        value={formData.releaseDate ?? selectedCar?.releaseDate ?? ""}
        onChange={handleChange}
        type= 'date'
        required
      />

      <InputField
        label="Numero du chassis"
        name="chassisNumber"
        value={formData.chassisNumber ?? selectedCar?.chassisNumber ?? ""}
        onChange={handleChange}
      />

      <InputField
        label="Puissance fiscale"
        name="fiscalPower"
        value={formData.fiscalPower ?? selectedCar?.fiscalPower ?? ""}
        onChange={handleChange}
        type= 'number'
      />

      <InputField
        label="Type de transmission"
        name="transmissionType"
        value={formData.transmissionType ?? selectedCar?.transmissionType ?? ""}
        onChange={handleChange}
      />

      <InputField
        label="Couleur"
        name="color"
        value={formData.color ?? selectedCar?.color ?? ""}
        onChange={handleChange}
      />

      <InputField
        label="Nombre de portes"
        name="numberOfDoors"
        value={formData.numberOfDoors ?? selectedCar?.numberOfDoors ?? ""}
        onChange={handleChange}
        type= 'number'
      />

      {/* marque */}
      <InputField
        label="Marque"
        name="brand"
        value={formData.brand ?? selectedCar?.brand ?? ""}
        onChange={handleChange}
      />

      {/* modele */}
      <InputField
        label="Modele"
        name="model"
        value={formData.model ?? selectedCar?.model ??""}
        onChange={handleChange}
      />

      <InputField
        label="Type de carrosserie"
        name="bodyType"
        value={formData.bodyType ?? selectedCar?.bodyType ?? ""}
        onChange={handleChange}
      />

      {/* energie */}
      <SelectField
        label="Type de motorisation"
        name="engineType"
        value={formData.engineType ?? selectedCar?.engineType ?? ""}
        options={fuelTypesData.map((f) => ({
          value: f.type,
          label: f.type,
        }))}
        onChange={handleChange}
        required
      />

      <InputField
        label="Capacite du coffre"
        name="trunkCapacity"
        value={formData.trunkCapacity ?? selectedCar?.trunkCapacity ?? ""}
        onChange={handleChange}
        type= 'number'
      />

      {/* place */}
      <InputField
        label="Nombre de places"
        name="seats"
        value={formData.seats ?? selectedCar?.seats ?? ""}
        onChange={handleChange}
        required
        type="number"
        // min={2}
      />


      {/* odometre */}
      <InputField
        label="Odometre actuel"
        name="odometer"
        value={formData.odometer ?? selectedCar?.odometer ?? ""}
        onChange={handleChange}
        required
        type="number"
      />

      <InputField
        label="Consommation moyenne"
        name="averageConsumption"
        value={formData.averageConsumption ?? selectedCar?.averageConsumption ?? ""}
        onChange={handleChange}
        required
        type="number"
      />

      <InputField
        label="Type d'achat (neuf ou occasion)"
        name="purchaseType"
        value={formData.purchaseType ?? selectedCar?.purchaseType ?? ""}
        onChange={handleChange}
        required
      />

      <InputField
        label="Prix d'achat du vehicule"
        name="purchasePrice"
        value={formData.purchasePrice ?? selectedCar?.purchasePrice ?? ""}
        onChange={handleChange}
        required
        type="number"
      />

      {/* Assurance */}
      <InputField
        label="Date de validite de l'assurance"
        name="assuranceDate"
        value={formData.assuranceDate ?? ""}
        onChange={handleChange}
        type="date"
      />

      {/* Visite */}
      <InputField
        label="Date de validite du visite technique"
        name="technicalControlDate"
        value={formData.technicalControlDate ?? ""}
        onChange={handleChange}
        type="date"
      />
      {/* fichier */}
      <FileDropMultiple
        label="Inserer un photo du vehicule"
        name="photoCarPath"
        files={formData.photoCarPath ?? []}
        onChange={(f) => handleFilesChange("photoCarPath", f)}
        accept="image/*"
        multiple={false}
      />
      <FileDropMultiple
        label="Inserer les photos du carte grise"
        name="registrationCard"
        files={formData.registrationCard ?? []}
        onChange={(f) => handleFilesChange("registrationCard", f)}
        accept="image/*"
        multiple={true}
      />
      <FileDropMultiple
        label="Inserer les photos du carte fiscale"
        name="nifCardPath"
        files={formData.nif ?? []}
        onChange={(f) => handleFilesChange("nifCardPath", f)}
        accept="image/*"
        multiple={true}
      />
      <FileDropMultiple
        label="Inserer les photos du carte statistique"
        name="statCardPath"
        files={formData.statCardPath ?? []}
        onChange={(f) => handleFilesChange("statCardPath", f)}
        accept="image/*"
        multiple={true}
      />
      <SelectField
        label="Etat du vehicule"
        name="availabilityStatus"
        value={formData.availabilityStatus ?? ""}
        options={[
          { label: "En service", value: "ACTIVE" },
          { label: "En reparation", value: "REPAIR" },
          { label: "En panne", value: "BROKEN" },
        ].map((f) => ({
          value: f.value,
          label: f.label,
        }))}
        onChange={handleChange}
        required
      />
      {/* Bouton */}
      <button
        type="submit"
        // onClick={addNewCar}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md w-full transition-colors duration-200 disabled:opacity-50"
      >
        {loading ? "Envoi..." : "Ajouter"}
      </button>
    </form>
  );
};

export default AddCarForm;
