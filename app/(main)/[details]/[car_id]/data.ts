import { Maintenance, Reminder } from "./type";

export const reminders: Reminder[] = [
  { id: 1, title: "changement batterie", value: "1500 000km" },
  { id: 2, title: "vidange moteur", value: "20 000km" },
  { id: 3, title: "freins avant", value: "50 000km" },
  { id: 4, title: "filtre à air", value: "10 000km" },

];

export const maintenanceData: Maintenance[]= [
  {
    id: 1,
    type: "Moteur",
    values: [
      { id: 1, value: "Vidange" },
      { id: 2, value: "Courroie de distribution" },
      { id: 3, value: "Bougies" }
    ]
  },
  {
    id: 2,
    type: "Freins",
    values: [
      { id: 4, value: "Plaquettes" },
      { id: 5, value: "Disques" },
      { id: 6, value: "Liquide de frein" }
    ]
  },
  {
    id: 3,
    type: "Pneus",
    values: [
      { id: 7, value: "Avant" },
      { id: 8, value: "Arrière" },
      { id: 9, value: "Permutation" }
    ]
  },
  {
    id: 4,
    type: "Batterie",
    values: [
      { id: 10, value: "Changement" },
      { id: 11, value: "Recharge" }
    ]
  }
];
