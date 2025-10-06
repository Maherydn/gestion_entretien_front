
import ReminderMaintenance from "./_components/reminder/ReminderMaintenance";
import Maintenance from "./_components/maintenance/Maintenance";
import Header from "../../_components/Header";
import { dataCarsFilter } from "@/app/utils/dataCarsFilter";
import FloatingButton from "../.././_components/FloatingButton";
import Detail from "./_components/details/Detail";


interface DetailsProps {
    params: Promise<{
      details: any;
      car_id: any;
      id: string;
    }>;
    searchParams: Promise<Record<string,string | string[]>>;
  }
  
const Details: React.FC<DetailsProps> = async (props) => {
  // const params = await props.params;
  const searchParams = await props.searchParams;
  //const imageUrl = "/images/fond_login.webp";

  // console.log(params);
  // console.log (searchParams);
  const selectedCarIndex = (await props.params).car_id;
  
  // console.log(selectedCar);

  // const [show, setShow] = useState("hidden")
  
  // const showMenu = () => {
  //     setShow( show === "hidden"? "visible" : "hidden")
  //   }
  
  
  return (
    <div className="w-full h-[calc(100vh-96px)] flex gap-2 pt-10">
      <Header title="Détails" subTitle={searchParams.im.toLocaleString()}/>
      <ReminderMaintenance/>
      <Maintenance />
      <Detail id={selectedCarIndex}/>
      <div className="fixed bottom-5 max-lg:right-5 right-80 p-4">
        <FloatingButton />
      </div>
    </div>
  );
};

export default Details;
