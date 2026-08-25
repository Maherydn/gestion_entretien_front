"use client";

import { useState, useRef } from "react";
import { User } from "../../../type";
import { userFonctionData, userStatutData } from "@/app/(main)/data";
import {
  FileDropMultiple,
  InputField,
  SelectField,
} from "./_components/fields";
// import router from "next/router";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import { useRouter } from "next/router";

// ===== Formulaire principal =====
const AddUserForm = ({
  selectedUser,
  onClose,
  mutate,
}: {
  selectedUser?: User;
  onClose: () => void;
  mutate?: () => Promise<User[] | undefined>;
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  const router = useRouter();
  const toHtmlDate = (date: string | Date) => {
    const d = new Date(date);
    // On récupère l'année, le mois et le jour en LOCAL (pas UTC)
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email))
      errs.email = "Email invalide";
    if (formData.contact && !/^\d{8,15}$/.test(formData.contact))
      errs.contact = "Numéro invalide";
    if (formData.numCin && !/^\d{12}$/.test(formData.numCin))
      errs.numCin = "C.I.N invalide";
    if (formData.password && formData.password.length < 8)
      errs.password = "Le mot de passe doit faire au moins 8 caractères";
    if (
      formData.password &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(
        formData.password,
      )
    )
      errs.password =
        "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  // const router = useRouter();
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
    const isValid = validate();

    if (!isValid) {
      setLoading(false);
      return;
    }
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value))
          value.forEach((f: File) => data.append(key, f));
        else if (value instanceof File) data.append(key, value);
        else if (value !== undefined && value !== null)
          data.append(key, value.toString());
      });

      const isEdit = !!selectedUser;

      const url = isEdit
        ? `${process.env.NEXT_PUBLIC_API_URL}users/${selectedUser.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}users`;

      const method = isEdit ? "PUT" : "POST";
      // console.log("URL : "+ url +" METHOD : "+ method)
      // console.log(formData)
      console.log(data);
      const token = localStorage.getItem("token");
      const res = await fetch(url, {
        method,
        body: data,
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      if (!res.ok) throw new Error("Erreur API");

      const result = await res.json();
      console.log("Réponse API :", result);
      // console.log(data);

      // window.location.reload();
      // router.refresh();
      // router.reload();
      if (typeof mutate === "function") {
        console.log("Mutating data...");
        await mutate();
      }
      toast.success(
        `Utilisateur ${selectedUser ? "modifié" : "ajouté"} avec succès !`,
      );
      onClose();
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
      <InputField
        label="Nom"
        name="name"
        value={formData.name ?? selectedUser?.name.toUpperCase() ?? ""}
        onChange={handleChange}
        required
      />
      <InputField
        label="Prénom"
        name="firstName"
        value={formData.firstName ?? selectedUser?.firstName ?? ""}
        onChange={handleChange}
        required
      />
      <InputField
        label="Date de naissance"
        name="birthday"
        type="date"
        value={
          formData.birthday ??
          toHtmlDate(
            selectedUser?.birthday ? selectedUser?.birthday : new Date(),
          ) ??
          ""
        }
        onChange={handleChange}
        required
      />
      <InputField
        label="Adresse"
        name="adress"
        value={formData.adress ?? selectedUser?.adress ?? ""}
        onChange={handleChange}
        required
      />
      <InputField
        label="Email"
        name="email"
        type="email"
        value={formData.email ?? selectedUser?.email ?? ""}
        onChange={handleChange}
        required
        error={errors.email}
      />
      <InputField
        label="Contact"
        name="contact"
        value={formData.contact ?? selectedUser?.contact ?? ""}
        onChange={handleChange}
        required
        error={errors.contact}
      />

      <InputField
        label="Numéro CIN"
        name="numCin"
        value={formData.numCin ?? selectedUser?.cin?.num ?? ""}
        onChange={handleChange}
        error={errors.numCin}
        required
      />
      <FileDropMultiple
        label="Photo CIN"
        name="photo_cin"
        files={formData.photo_cin ?? []}
        onChange={(f) => handleFilesChange("photo_cin", f)}
        accept="image/*"
        multiple
      />

      <FileDropMultiple
        label="Photo de profil"
        name="profil"
        files={formData.profil ?? []}
        onChange={(f) => handleFilesChange("profil", f)}
        accept="image/*"
        multiple={false}
      />

      <FileDropMultiple
        label="CV"
        name="cv"
        files={formData.cv ?? []}
        onChange={(f) => handleFilesChange("cv", f)}
        accept=".pdf,.doc,.docx"
        multiple={false}
      />

      <SelectField
        label="Role"
        name="role"
        value={formData.role ?? selectedUser?.role.toLocaleString() ?? ""}
        options={userFonctionData.map((f) => ({
          value: f.value,
          label: f.label,
        }))}
        onChange={handleChange}
        required
      />

      {/* Champ Specialite conditionnel */}
      {String(formData.role || selectedUser?.role) === "TECHNICIAN" && (
        <InputField
          label="Spécialité"
          name="speciality"
          value={formData.speciality || selectedUser?.speciality || ""}
          onChange={handleChange}
          required
        />
      )}

      {/* Champ Permis conditionnel */}
      {String(formData.role || selectedUser?.role) === "DRIVER" && (
        <>
          <InputField
            label="Numéro Permis"
            name="numDrivingLicense"
            value={
              formData.numDrivingLicense ??
              selectedUser?.drivingLicense?.num ??
              ""
            }
            onChange={handleChange}
            required
          />
          <FileDropMultiple
            label="Photo Permis"
            name="photo_permis"
            files={formData.photo_permis ?? []}
            onChange={(f) => handleFilesChange("photo_permis", f)}
            accept="image/*,.pdf"
            multiple
          />
        </>
      )}

      <SelectField
        label="Statut"
        name="status"
        value={formData.status ?? selectedUser?.status ?? ""}
        options={userStatutData.map((s) => ({
          value: s.value,
          label: s.label,
        }))}
        onChange={handleChange}
        required
      />
      {selectedUser && !passwordReset && (
        <button
          type="button"
          onClick={() => setPasswordReset(true)}
          className="text-blue-500 hover:text-blue-700"
        >
          Réinitialiser le mot de passe
        </button>
      )}
      {(!selectedUser || passwordReset) && (
        <InputField
          label="Mot de passe"
          name="password"
          value={formData.password ?? ""}
          onChange={handleChange}
          type="password"
          required
          error={errors.password}
          isPassword
        />
      )}
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md mt-4 disabled:opacity-50"
      >
        {loading ? "Envoi..." : selectedUser ? "Modifier" : "Ajouter"}
      </button>
    </form>
  );
};

export default AddUserForm;
