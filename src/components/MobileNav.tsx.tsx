import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const MobileNav = () => {
  return (
    <div className="sm:hidden flex items-center">
      <Sheet>
        <SheetTrigger>
          <HamburgerMenuIcon className="size-6" />
        </SheetTrigger>
        <SheetContent side={"left"} className="w-[60%] sm:w-72">
          <h3 className="mb-4 tracking-tighter text-xl">Гомбрайх</h3>
          <ul>
            <li className="active:text-pink-700 hover:text-pink-700 tracking-wider">
              <a href="#workshop">Наши работы</a>
            </li>
            <li className="active:text-pink-700 hover:text-pink-700 tracking-wider">
              <a href="#services">Услуги</a>
            </li>
            <li className="active:text-pink-700 hover:text-pink-700 tracking-wider">
              <a href="#contact">Контакты</a>
            </li>
          </ul>
          <hr className="my-2 h-px w-2/5 border-t-0 bg-gradient-to-r from-black to-transparent opacity-35" />
          <a
            className="text-muted-foreground active:text-pink-700 hover:text-pink-700 tracking-wider"
            href="/login"
          >
            Вход для админов
          </a>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
