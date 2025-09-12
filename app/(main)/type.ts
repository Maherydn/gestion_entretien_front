export interface CarType {
  id: number;
  type: string;
}

export interface Fuel {
  id: number;
  type: string;
}

export interface Car {
  id: number;
  immatriculation: string;
  kilometrage: number;
  visiteTechnique: string;
  assurance: string;
  etat: string;
  imageUrl?: string;
  carType: CarType;
  fuel: Fuel;
}
