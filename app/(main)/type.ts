export interface CarType {
  id: number;
  type: string;
}

export interface Fuel {
  id: number;
  type: string;
  conso: number;
}
export interface GenreVehicule{
  id: number;
  label: string;
}
export interface Assurance{
  id: number;
  date: Date;
  file: string;
  price: number;
  durabilty: number;
  agence: string;
}
export interface VisiteTechnique{
  id: number;
  date: Date;
  file: string;
  price: number;
  durabilty: number;
  agence: string;
}
export interface Nif{
  id: number;
  date: Date;
  file: string;
  price: number;
  durabilty: number;
  agence: string;
  stat: {num: number, file: string}
}
export interface Car {
  id: number;
  immatriculation: string;
  annee_mise_circulation: Date;
  num_chassis?: string;
  sit: number;
  kilometrage: number;
  marque: string;
  created_at: Date;
  statut: string;
  imageUrl?: string;
  carte_grise: string;
  visite_technique: VisiteTechnique;
  assurance: Assurance;
  nif: Nif;
  carType?: CarType;
  fuel: Fuel;
  genre: GenreVehicule;
  id_user: number;
}

export interface UserStatus {
  id: number,
  label: string,
  desc: string
}
export interface UserTeam {
  id: number,
  label: string,
  desc: string,
}
export interface UserFonction {
  id: number,
  label: string,
  desc: string
}
export interface User {
  id: number,
  nom: string,
  prenom: string,
  date_naissance: Date,
  cin: {num:string, photo: string},
  email: string,
  contact: string,
  fonction: UserFonction,
  status: UserStatus,
  avatar: string,
  cv: string,
  created_at : Date,
  adress: string,
  mdp: string,
  specialite?: string[],
  permis?: {num: string, photo: string}
  modify_at?: Date
}

export interface StatutRappel {
  id : number,
  desc : string
}
export interface GenreRappel{ 
  id: number,
  desc: string
}
export interface TypeRappel { 
  id: number,
  label: string,
  desc: string,
  genre: string,
}
export interface Rappel {
  id: number,
  note: string,
  designation: string,
  kilometrage: number,
  son_panne?: string,
  photo_panne?: string, 
  created_at:Date,
  id_user: number,
  id_vehicule: number,
  id_entretien?: number,
  statut?: StatutRappel,
  type?: TypeRappel, 
}
export interface Garage { 
  id: number,
  nom: string,
  specialite: string,
  localisation: string,
}
export interface Validation { 
  id: number,
  desc: string,
}
export interface Entretien { 
  id : number,
  garage? : Garage,
  chef_atelier: User,
  price? : number,
  notes? : string,
  created_at: Date, 
  validation?: Validation
}