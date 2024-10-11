import HeaderButton from "./HeaderButton";
import HeaderNav from "./HeaderNav";
import MobileNav from "./MobileNav.tsx";

const Header = () => {
  return (
    <header
      className="bg-background-bright z-50 py-6 md:py-8 lg:py-10 flex justify-between items-center
     max-w-screen-xl xl:max-w-full px-4 2xl:px-10 mx-auto fixed top-0 left-0 right-0"
    >
      <div className="flex gap-2">
        <MobileNav />
        <h2 className="text-xl text-pink-950 tracking-tighter">Гомбрайх</h2>
      </div>

      <div className="flex items-center gap-4">
        <HeaderNav />
        <HeaderButton />
      </div>
    </header>
  );
};

export default Header;
