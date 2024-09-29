import HeaderButton from "./HeaderButton";
import HeaderNav from "./HeaderNav";

const Header = () => {
  return (
    <header className="grainy-light z-50 py-6 flex justify-between items-center max-w-screen-lg px-4 mx-auto fixed top-0 left-0 right-0 bg-background">
      <h2 className="text-lg tracking-wider">Гомбрайх</h2>
      <div className="flex items-center gap-4">
        <HeaderNav />
        <HeaderButton />
      </div>
    </header>
  );
};

export default Header;
