// "use client";
// import { useState } from "react";

// export default function UploadFile() {
//   const [file, setFile] = useState(null);
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file || !name) {
//       alert("Veuillez remplir tous les champs");
//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("name", name);

//     for (let [key, value] of formData.entries()) {
//       console.log(key, value);
//     }

//     const res = await fetch("http://localhost:3000/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     console.log(data);

//     setLoading(false);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-5"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-700">
//           Upload de fichier
//         </h2>

//         {/* input name */}
//         <div className="flex flex-col gap-1">
//           <label className="text-sm text-gray-600">Nom</label>
//           <input
//             type="text"
//             placeholder="Entrer votre nom"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* input file */}
//         <div className="flex flex-col gap-2">
//           <label className="text-sm text-gray-600">Fichier</label>

//           <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition">
//             <span className="text-gray-500 text-sm">
//               Cliquer pour choisir un fichier
//             </span>

//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="hidden"
//             />
//           </label>

//           {file && (
//             <p className="text-sm text-green-600">
//               Fichier sélectionné : {file.name}
//             </p>
//           )}
//         </div>

//         {/* bouton */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
//         >
//           {loading ? "Envoi..." : "Envoyer"}
//         </button>
//       </form>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  nom: string;
  prenom: string;
  contact: number;
  email: string;
  profilUrl: string;
  cin: string;
  cinUrl: string;
  adresse: string;
  role: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:8000/users";
  const FILE_URL = "http://localhost:3001/uploads";

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      setUsers(data);
    } catch (error) {
      console.error("Erreur fetch users :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <p className="p-6">Chargement...</p>;
  }
  console.log(users);
  

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <div key={user.id} className="border rounded-lg shadow-md p-4 bg-white">
          {/* Profil */}
          <img
            src={`${user.profilUrl}`}
            alt="profil"
            className="w-24 h-24 rounded-full object-cover mb-3"
          />

          <h2 className="text-lg font-bold">
            {user.nom} {user.prenom}
          </h2>

          <p className="text-gray-600">@{user.name}</p>

          <p className="mt-2">📧 {user.email}</p>

          <p>📞 {user.contact}</p>

          <p>📍 {user.adresse}</p>

          <p className="mt-2 text-sm bg-blue-100 inline-block px-2 py-1 rounded">
            {user.role}
          </p>

          {/* CIN */}
          <div className="mt-4">
            <p className="font-semibold">CIN :</p>
            <p>{user.cin}</p>

            <img
              src={`${user.cinUrl}`}
              alt="cin"
              className="mt-2 rounded border w-96 h-96"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
