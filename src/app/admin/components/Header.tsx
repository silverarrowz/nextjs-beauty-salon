"use client";

import { cn } from "@/lib/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiUser } from "react-icons/bi";
import MobileNav from "./MobileNav";

interface HeaderProps {
  user: User;
}

const Header = ({ user }: HeaderProps) => {
  const pathname = usePathname();

  const isAdminMainPage = pathname === "/admin";

  return (
    <header className="bg-button z-30 py-6 flex justify-between gap-4 items-center max-w-screen-xl px-4 mx-auto md:pl-40 md:pr-12 fixed top-0 left-0 right-0 bg-background">
      <div className="flex justify-between sm:w-[35%] w-full">
        <MobileNav />
        <Link href={"/admin"}>
          <h1
            className={cn(
              "tracking-widest underline underline-offset-2 decoration-2 decoration-pink-700 hover:text-pink-700 hover:no-underline transition-all lg:ml-4 ",
              {
                "bg-white no-underline px-1 hover:text-black": isAdminMainPage,
              }
            )}
          >
            Панель управления
          </h1>
        </Link>
      </div>

      <div className="hidden sm:flex items-center gap-3 justify-between text-sm">
        <p className="flex gap-1 items-center">
          <BiUser />
          {user.email}
        </p>
        <Link href={"/signout"} className="hover:text-pink-700 transition">
          Выход
        </Link>
        <Link href="/" className="hover:text-pink-700 transition">
          На главную
        </Link>
      </div>
    </header>
  );
};

export default Header;
