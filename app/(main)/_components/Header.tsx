import { BurgerIcon } from "../_assets/icon";

const Header = () => {
  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl h-20 bg-vert">
      <div className="flex w-full items-center justify-between h-full px-10">
        <div className="w-14 h-14 text-white">
          <BurgerIcon />
        </div>
        <p className="text-white text-4xl">Planning des entretiens</p>
      </div>
    </header>
  );
};

export default Header;
