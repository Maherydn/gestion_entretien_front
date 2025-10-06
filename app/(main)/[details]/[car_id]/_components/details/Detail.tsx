import { cars } from "../../../../../(main)/data";
import { FuelIcon } from "../../../../_assets/icon";


interface SelectedCardProps {
    id: number;
}
interface SelectedCard{
  icon : string;
  title : string;
  value : string;
}
const rowDetailCar = (icon:string,title:string|null|undefined,value:string|null|undefined) => {
  return(
    
    // 
    // <div className="flex flex-row items-center gap-2">
    
    <div className="flex w-full items-center p-2 gap-2">
      <h3 className="h-full w-1/2"> 
        <img src={icon} alt="icon fuel" className="w-full h-full object-cover flex" />
      </h3>

      <div className="h-full w-1/2 text-sm font-semibold">
        {title}
        <p>
          {value}
        </p>
      </div>
    </div>
  );
}
const Detail = ({
    id,
  }: SelectedCardProps) => {
    const selectedCar = cars[id-1];
  return (
    <div className="flex-1 bg-jaune flex flex-col items-center gap-2 shadow-jaune shadow-lg max-lg:hidden">
        <div className="w-full h-1/5 flex items-center justify-center">
          {selectedCar.imageUrl ? (
            <img src={`${selectedCar.imageUrl}`} alt={`${selectedCar.immatriculation}`} className="w-full h-full object-cover object-no-repeat object-center" />
          ) : (
            <span className="text-gray-500">Pas d’image</span>
          )}
        </div>
        <button className="w-full  font-semibold bg-white cursor-pointer ">
          Tout afficher
        </button>
        {/* <div className="w-full flex items-start md:justify-start flex-wrap gap-6 px-1 justify-center overflow-y-auto flex-1"> */}
        <div className="flex flex-col w-full overflow-y-auto p-2 gap-2 flex-1">
          <div className="flex flex-row items-center">
            {rowDetailCar("/fuel.svg",selectedCar.fuel.type,selectedCar.fuel.conso.toLocaleString()+"L/100")}
            {rowDetailCar("/odo.svg",null,selectedCar.kilometrage.toLocaleString()+" KM")}
          </div >
          <div className="flex flex-row items-center">
            {rowDetailCar("/sit.svg",null,selectedCar.sit.toLocaleString()+" places")}
            {rowDetailCar("/type.svg",null,selectedCar.carType.type.toLocaleString())}
          </div >
          <div className="flex flex-row items-center">
            {rowDetailCar("/fuel.svg",selectedCar.fuel.type,selectedCar.fuel.conso.toLocaleString()+"L/100")}
            {rowDetailCar("/type.svg",null,selectedCar.carType.type.toLocaleString())}
          </div >
          <div className="flex flex-row items-center">
            {rowDetailCar("/odo.svg",null,selectedCar.kilometrage.toLocaleString()+" KM")}
            {rowDetailCar("/sit.svg",null,selectedCar.sit.toLocaleString()+" places")}
            
          </div >
          <div className="flex w-full h-1/8 items-center p-2 gap-2 ">
            <h3 className="w-full font-bold">
              Assurance
            </h3>
            <div className="w-1/2 text-left text-sm font-semibold">
                {selectedCar.assurance} 
            </div>
          </div>
          <div className="flex w-full h-1/8 items-center p-2 gap-2 ">
            <h3  className="w-full font-bold">
              Visite technique
            </h3>
            
            <div className="w-1/2 text-left text-sm font-semibold">
                {selectedCar.visiteTechnique} 
              <p>

              </p>
            </div>
          </div>
          
        </div>
        
        <div className="flex flex-col w-full p-2 gap-2">
          <button className="w-full bg-vert py-1  font-semibold cursor-pointer ">
            Modifier
          </button>
          <button className="w-full bg-rouge py-1  font-semibold cursor-pointer ">
            Supprimer
          </button>
        </div>
    </div>
  );
};

export default Detail;