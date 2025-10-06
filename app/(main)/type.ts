export interface CarType {
  id: number;
  type: string;
}

export interface Fuel {
  id: number;
  type: string;
  conso: number;
}

export interface Car {
  id: number;
  immatriculation: string;
  kilometrage: number;
  visiteTechnique: string;
  assurance: string;
  etat: string;
  imageUrl?: string;
  sit: number;
  carType: CarType;
  fuel: Fuel;
}
