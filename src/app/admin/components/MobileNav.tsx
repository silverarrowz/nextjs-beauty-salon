import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createClient } from "@/utils/supabase/client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoSparkles } from "react-icons/io5";
import { MdEventNote, MdPeopleAlt } from "react-icons/md";

const MobileNav = () => {
  const router = useRouter();

  const supabase = createClient();
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out", error);
    } else {
      router.push("/login");
    }
  }
  const sections = [
    { label: "Записи", href: "/admin/bookings", icon: <MdEventNote /> },
    { label: "Услуги", href: "/admin/services", icon: <IoSparkles /> },
    { label: "Мастера", href: "/admin/masters", icon: <MdPeopleAlt /> },
  ];

  return (
    <div className="md:hidden flex items-center">
      <Sheet>
        <SheetTrigger>
          <HamburgerMenuIcon className="size-5" />
        </SheetTrigger>
        <SheetContent side={"left"} className="w-full sm:w-72">
          <nav>
            <ul className="gap-2 flex flex-col items-center sm:items-start pt-12 sm:p-0 mb-8">
              {sections.map((section) => (
                <li
                  key={section.label}
                  className="p-2 text-lg mr-4 xl:-ml-4 tracking-widest hover:text-pink-700
                   transition underline  underline-offset-2 decoration-pink-700
                    decoration-2 hover:no-underline"
                >
                  {" "}
                  <SheetClose asChild>
                    <Link href={section.href}>
                      <p className="flex items-center gap-2">
                        {section.icon}
                        {section.label}
                      </p>
                    </Link>
                  </SheetClose>
                </li>
              ))}

              <li
                className="p-2 text-lg mr-4 xl:-ml-4 tracking-widest hover:text-pink-700
                   transition underline  underline-offset-2 decoration-pink-700
                    decoration-2 hover:no-underline"
              >
                {" "}
                <Link href="/">На главную</Link>
              </li>

              <li>
                <button
                  onClick={signOut}
                  className="p-2 text-lg mr-4 xl:-ml-4 tracking-widest hover:text-pink-700
                   transition underline  underline-offset-2 decoration-pink-700
                    decoration-2 hover:no-underline"
                >
                  Выход
                </button>
              </li>
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
