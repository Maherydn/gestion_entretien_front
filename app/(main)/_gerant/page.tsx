"use client";

import { useState } from "react";
import HomePage from "../_components/Homepage";
import AddCarModal from "./modals/AddCarModal";

interface GerantProps {
  user: string;
}

export default function Gerant({user}: GerantProps) {
  return (
    <>
      <HomePage user= {user}/>
    </>
);
}
