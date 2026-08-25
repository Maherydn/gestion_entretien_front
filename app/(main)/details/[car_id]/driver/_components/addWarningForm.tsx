"use client";

import { useState } from "react";
import { Car } from "../../type";
import toast from "react-hot-toast";
import { /*FileDropMultiple,*/ InputField, /*SelectField*/ } from "@/app/(main)/_administrateur/_components/formulaires/_components/fields";
// import { carTypesData } from "@/app/(main)/data";

interface AddWarningFormProps {
  selectedCar?: Car;
  onClose: () => void;
  setCars?: (values: Car) => void;
  cars?: Car[];
  setImTitle?: (immatriculation: string) => void;
  carId: number;
}

const AddWarningForm = ({
  selectedCar,
  onClose,
  carId,
  // setCars,
  // cars,
  // setImTitle,
}: AddWarningFormProps) => {
  // const [title, setTitle] = useState("");
  const [formData, setFormData] = useState<Record<string, any>>({});
  // const [errors, setErrors] = useState<Record<string, string>>({});
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

  // const handleFilesChange = (name: string, files: File[]) =>
  //   setFormData((prev) => ({ ...prev, [name]: files }));

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
      const url = isEdit
        ? `${process.env.NEXT_PUBLIC_API_URL}warnings/${selectedCar.registrationNumber}`
        : `${process.env.NEXT_PUBLIC_API_URL}warnings/${carId}`;

      const method = isEdit ? "PATCH" : "POST";
      console.log("URL : "+ url +" METHOD : "+ method)
      // console.log(formData)
      console.log('id: '+carId)
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
        `Avertissement ${selectedCar ? "modifié" : "ajouté"} avec succès !`,
      );
      // setTitle(""); 
      onClose();
      console.log(formData);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'envoi du formulaire");
    } finally {
      setLoading(false);
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 w-full mx-auto  bg-white overflow-y-auto sm:text-xl"
    >
      {/* <SelectField
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
      )} */}

        {/* Degre de priorite */}
      <InputField
        label="Degré de priorité"
        name="priorityLevel"
        value={formData.priorityLevel ?? ""}
        type="number"
        // max={2}
        onChange={handleChange}
        required
      />
      {/* Description */}
      <InputField
        label="Description"
        name="description"
        value={formData.description ?? ""}
        onChange={handleChange}
        // type= "textarea"
        required
      />

      {/* fichier */}
      {/* <FileDropMultiple
        label="Inserer un photo du vehicule"
        name="photoCarPath"
        files={formData.photoCarPath ?? []}
        onChange={(f) => handleFilesChange("photoCarPath", f)}
        accept="image/*"
        multiple={false}
      /> */}
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

export default AddWarningForm;
