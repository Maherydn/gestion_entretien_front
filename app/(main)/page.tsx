"use client";

import { useEffect, useState } from "react";
import CarFilter from "./_components/CarFilters.tsx/CarFilter";
import CarCard from "./_components/CarCard";
import FloatingButton from "./_components/FloatingButton";
import { cars } from "./data";
import { dataCarsFilter } from "../utils/dataCarsFilter";
import Header from "./_components/Header";
import Chauffeur from "./_chauffeur/page";
import HomePage from "./_components/Homepage";

import MaintenanceFilter from "./details/[car_id]/_components/maintenance/MaintenanceFilter";
import Gerant from "./_gerant/page";
import Administrateur from "./_administrateur/page";
import { redirect } from "next/navigation";

// ---- Page principale ---- //
export default function Main() {
  const [log, setLog] = useState("ADMIN");
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
          setLog("");
          return;
        }

        const data = await res.json();
        // console.log("User data:", data);
        setLog(data[0].role);
      } catch (err) {
        console.error(err);
        setLog("");
      }
    };

    fetchMe();
  }, []);
  console.log(log);
  if (log === "") {
    redirect("/login");
  }
  if (log === "FLEETMANAGEMENT") {
    return (
      <div className="w-full flex md:px-6 flex-col gap-8 relative">
        <Gerant user={log} />
      </div>
    );
  }
  if (log === "DRIVER") {
    return (
      <div className="w-full flex md:px-6 flex-col gap-8 relative">
        <HomePage user={log} />
      </div>
    );
  }
  if (log === "ADMIN") {
    return (
      <div className="w-full flex md:px-6 flex-col gap-8 relative items-center">
        <Administrateur user={log} />
      </div>
    );
  }
  if (log === "Technicien") {
    return (
      <div className="w-full flex md:px-6 flex-col gap-8 relative">
        <Chauffeur />
      </div>
    );
  }
}
