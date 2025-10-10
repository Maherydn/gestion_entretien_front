"use client";

import { useState } from "react";

const MaintenanceForm = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return; // ne rien envoyer si vide
    setLoading(true);

    try {
      // ⚡ Ici tu peux remplacer par ton API call
      console.log("Formulaire soumis :", { title });
      // Exemple : await createList({ title });
      alert(`Liste enregistrée : ${title}`);
      setTitle(""); // reset du formulaire
    } catch (err) {
      console.error("Erreur :", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      {/* Nom */}
      <div className="flex flex-col">
        <label htmlFor="title" className="mb-1 text-gray-700 font-medium">
          Nom
        </label>
        <input
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="Nom de la liste"
          className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
        />
      </div>

      {/* Bouton */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md w-full transition-colors duration-200 disabled:opacity-50"
      >
        {loading ? "Envoi..." : "Ajouter"}
      </button>
    </form>
  );
};

export default MaintenanceForm;
