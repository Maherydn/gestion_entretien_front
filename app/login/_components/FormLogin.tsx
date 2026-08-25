"use client";
import { InputField } from "@/app/(main)/_administrateur/_components/formulaires/_components/fields";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const FormLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name } = e.target;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);

      const url = `${process.env.NEXT_PUBLIC_API_URL}auth/login`;

      const method = "POST";

      const res = await fetch(url, {
        method,
        body: JSON.stringify(data),
        // credentials: "true",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        switch (res.status) {
          case 404:
            setErrors((prev) => ({
              ...prev,
              email: "Email non enregistré",
              mdp: "",
            }));
            throw new Error("Email non enregistré");
          case 401:
            setErrors((prev) => ({
              ...prev,
              email: "",
              mdp: "Mot de passe incorrect",
            }));
            throw new Error("Mot de passe incorrect");
          default:
            throw new Error("Erreur API");
        }
      }

      const result = await res.json();
      console.log("Réponse API :", result);
      localStorage.setItem("token", result.access_token);
      setErrors({});
      toast.success(`Connexion reussi !`);
      router.replace("/");
    } catch (err) {
      // console.log(err.message);
      toast.error("Une erreur est survenue lors de la connexion");
    }
  };

  // console.log(errors.email);
  return (
    <div className="bg-jaune flex flex-col gap-10 w-80 p-6 h-fit rounded-xl">
      <h2 className="text-2xl text-vert uppercase font-bold">login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email ?? ""}
          onChange={handleChange}
          required
          error={errors.email}
        />
        <InputField
          label="Mot de passe"
          name="password"
          value={formData.password ?? ""}
          onChange={handleChange}
          type="password"
          required
          error={errors.mdp}
          isPassword
        />

        <button
          type="submit"
          className="w-full py-2 border rounded cursor-pointer bg-vert text-white"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
