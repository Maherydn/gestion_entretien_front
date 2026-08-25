import { Contact, ShieldCheck } from "lucide-react";

export const ROLE_CONFIG = {
  ADMIN: {
    label: "Administrateur",
    description: "Utilisateur qui gere les comptes des autres utilisateurs",
    icon: ShieldCheck,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  DRIVER: {
    label: "Chauffeur",
    icon: Contact,
    description:
      "Conducteur de véhicule, il peut acceder aux vehicules qu'on l'a assigne",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  FLEETMANAGEMENT:{
    label: "Gestionnaire de flotte",
    icon: ShieldCheck,
    description:
      "Utilisateur qui possede l'acces a tous les vehicules",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  TECHNICIAN:{
    label: "Technicien",
    icon: ShieldCheck,
    description:
       "Utilisateur qui possede l'acces a tous les fiches techniques des vehicules",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  }
};


export const STATUS_CONFIG = {
  AFFECT: {
    label: 'Affecter',
    description: 'Cette personne est envoye en mission',
    textColor: "text-sky-50",
    bgColor: "bg-sky-600",
  },

  VACATION: {
    label: 'En vacances',
    description: 'Cette personne est en conge',
    textColor: "text-red-600",
    bgColor: "bg-red-50",
  },

  ACTIVE: {
    label: 'active',
    description: 'Cette personne est disponible en ce momemt',
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
};
