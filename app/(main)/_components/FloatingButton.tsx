import { BurgerIcon } from "../_assets/icon";
interface FloatingButtonProps{
  title?: string;
  subTitle?: string;
}
const FloatingButton = (
  {
    title,subTitle
  }:FloatingButtonProps
) => {
  return (
    <div>
        <button className="bg-vert hover:bg-jaune pb-2 px-3 text-white hover:text-black text-3xl font-bold rounded-full shadow-lg shadow-noir cursor-pointer">
          +
        </button>
    </div>
  );
};

export default FloatingButton;