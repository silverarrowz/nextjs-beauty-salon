"use client";

import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BiUser } from "react-icons/bi";
import MobileNav from "./MobileNav";
import { createClient } from "@/utils/supabase/client";
import { FaHome } from "react-icons/fa";
import { TbDoorExit } from "react-icons/tb";

interface HeaderProps {
  user: User;
}

const Header = ({ user }: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isAdminMainPage = pathname === "/admin";

  const supabase = createClient();
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out", error);
    } else {
      router.push("/login");
    }
  }

  return (
    <header
      className="bg-button-light z-30 py-6 flex justify-between gap-4 items-center max-w-screen-xl
     px-4 mx-auto md:pl-40 md:pr-12 fixed top-0 left-0 right-0 bg-background"
    >
      <div className="flex justify-between sm:w-[35%] w-full">
        <MobileNav />
        <div className="flex items-center gap-4">
          <TbDoorExit onClick={signOut} size={20} />
          <Link href={"/"}>
            <FaHome size={20} />
          </Link>

          <Link href={"/admin"}>
            <h1
              className={cn(
                "tracking-widest underline underline-offset-2 decoration-2 decoration-pink-700 hover:text-pink-700 hover:no-underline transition-all lg:ml-4 ",
                {
                  "bg-white no-underline px-1 hover:text-black":
                    isAdminMainPage,
                }
              )}
            >
              Панель управления
            </h1>
          </Link>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-3 justify-between text-sm">
        <p className="flex gap-1 items-center">
          <BiUser />
          {user.email}
        </p>
        <button className="hover:text-pink-700 transition" onClick={signOut}>
          Выход
        </button>
        <Link href="/" className="hover:text-pink-700 transition">
          На главную
        </Link>
      </div>
    </header>
  );
};

export default Header;
