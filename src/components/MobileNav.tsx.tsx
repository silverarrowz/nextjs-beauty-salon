import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";

const MobileNav = () => {
  return (
    <div className="sm:hidden flex items-center">
      <Sheet>
        <SheetTrigger>
          <HamburgerMenuIcon className="size-6 text-black/70" />
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="w-full sm:w-72 flex flex-col items-center"
        >
          <h3 className="mb-8 text-black/60 tracking-tighter text-xl">
            Гомбрайх
          </h3>
          <ul className="flex flex-col items-center gap-2 text-lg">
            <SheetClose asChild>
              <li className="active:text-pink-700 hover:text-pink-700 tracking-wider">
                <a href="#workshop">Наши работы</a>
              </li>
            </SheetClose>

            <SheetClose asChild>
              <li className="active:text-pink-700 hover:text-pink-700 tracking-wider">
                <a href="#services">Услуги</a>
              </li>
            </SheetClose>

            <SheetClose asChild>
              <li className="active:text-pink-700 hover:text-pink-700 tracking-wider">
                <a href="#contact">Контакты</a>
              </li>
            </SheetClose>
          </ul>
          <hr className="h-px w-3/5 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-black to-transparent opacity-25 my-4" />

          <Link
            className="text-muted-foreground active:text-pink-700 hover:text-pink-700 tracking-wider"
            href="/login"
          >
            Вход для админов
          </Link>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
