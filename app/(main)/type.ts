export interface CarType {
  id: number;
  type: string;
}

export interface Fuel {
  id: number;
  type: string;
  conso: number;
}
export interface GenreVehicule {
  id: number;
  label: string;
}

export interface Nif {
  id: number;
  registrationNumber?: number;
  frontPicture?: string;
  backPicture?: string;
  // durability?: number; // nombre de mois
  // price?: number; // chiffre en ariary
  // releaseDate?: Date; // date de paiement
  car?: Car;
  stat?: Stat;
  createdAt?: Date;
}
export interface Stat {
  id: number;
  registrationNumber?: number;
  frontPicture?: string;
  backPicture?: string;
  nif?: Nif[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface RegistrationCard {
  id: number;
  registrationNumber?: number;
  frontPicture?: string;
  backPicture?: string;
  car?: Car;
  createdAt?: Date;
}

export interface TechnicalControl {
  id: number;
  frontPicture?: string;
  backPicture?: string;
  car?: Car;
  createdAt?: Date;
}
export interface Car {
  id: number;
  type: string;
  // nombre de places
  seats?: number;
  // kilométrage
  odometer?: number;
  // immatriculation
  registrationNumber?: string;
  // année de sortie
  releaseDate?: Date;
  // numéro de chassis
  chassisNumber?: string;
  // puissance fiscale
  fiscalPower?: number;
  // type de boîte de vitesse
  transmissionType?: string;
  // nombre de portes
  numberOfDoors?: number;
  // couleur
  color?: string;
  // marque
  brand?: string;
  // modèle
  model?: string;
  // type de carrosserie
  bodyType?: string;
  // type de motorisation
  engineType?: string;
  // capacité du coffre
  trunkCapacity?: number; // -----------------------------
  // consommation moyenne
  averageConsumption?: number;
  // type d'achat
  purchaseType?: string;
  // prix d'achat
  purchasePrice?: number;
  // disponibilité
  availabilityStatus?: string;
  // photo de la voiture
  photoCarPath?: string;
  assuranceDate?: string;
  technicalControlDate?: string;
  warning ?: Rappel[];
  /**
   * Date de création
   */
  createdAt?: Date;
  /**
   * Date de modification
   */
  updatedAt?: Date;
  assurances?: Assurance[];
  nif?: Nif;
  registrationCard?: RegistrationCard;
  technicalControl?: TechnicalControl;
}

export interface Assurance {
  id: number;
  // durabilty?: string;
  // price?: number;
  // agence?: string;
  frontPicture?: string;
  backPicture?: string;
  // durability?: number; // nombre de mois
  // releaseDate?: Date; // date de paiement
  // beginDate?: Date; // date de debut de validite
  createdAt?: Date;
  updatedAt?: Date;
  car?: Car;
}

export interface UserStatus {
  id: number;
  label: string;
  value: string;
  description?: string;
}
export interface UserTeam {
  id: number;
  label: string;
  desc: string;
}
export interface UserFonction {
  id: number;
  label: string;
  value: string;
}
export interface User {
  id: number;
  name: string;
  firstName: string;
  birthday: string;
  email: string;
  contact: string;
  adress: string;
  password: string;
  acces: boolean;
  profil?: File;
  speciality?: string;
  role: string;
  status: string;
  profilPath?: string;
  cv?: { filePath?: string; created_at?: Date; id?: number }[];
  cin?: {
    num?: string;
    frontPicture?: string;
    backPicture?: string;
    created_at?: Date;
    id?: number;
  };
  drivingLicense?: {
    num?: string;
    frontPicture?: string;
    backPicture?: string;
    created_at?: Date;
    id?: number;
  };
}

export interface StatutRappel {
  id: number;
  desc: string;
}
export interface GenreRappel {
  id: number;
  desc: string;
}
export interface TypeRappel {
  id: number;
  label: string;
  desc: string;
  genre: string;
}
export interface Rappel {
  id: number;
  note: string;
  designation: string;
  kilometrage: number;
  son_panne?: string;
  photo_panne?: string;
  created_at: Date;
  id_user: number;
  id_vehicule: number;
  id_entretien?: number;
  statut?: StatutRappel;
  type?: TypeRappel;
}
export interface Garage {
  id: number;
  nom: string;
  specialite: string;
  localisation: string;
}
export interface Validation {
  id: number;
  desc: string;
}
export interface Entretien {
  id: number;
  garage?: Garage;
  chef_atelier: User;
  price?: number;
  notes?: string;
  created_at: Date;
  validation?: Validation;
}

export interface Warning {
  id: number;
  description: string;
  priorityLevel: number;
  selectedOptions? : string[];
  handleOptionChange? : (event: React.ChangeEvent<HTMLInputElement>)=>void;
  reminderSelected? : Warning;
  car?: Car
}
