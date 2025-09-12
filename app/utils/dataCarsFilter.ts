import { Car } from "../(main)/type";

interface Filters {
  carType: string;
  fuel: string;
  search: string;
}

export const dataCarsFilter = (cars: Car[], filters: Filters): Car[] => {
  return cars.filter((car) => {
    const matchesCarType = filters.carType
      ? car.carType.type === filters.carType
      : true;
    const matchesFuel = filters.fuel ? car.fuel.type === filters.fuel : true;
    const matchesSearch = filters.search
      ? car.immatriculation.toLowerCase().includes(filters.search.toLowerCase())
      : true;

    return matchesCarType && matchesFuel && matchesSearch;
  });
};
