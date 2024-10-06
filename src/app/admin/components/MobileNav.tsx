import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { IoSparkles } from "react-icons/io5";
import { MdEventNote, MdPeopleAlt } from "react-icons/md";

const MobileNav = () => {
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
        <SheetContent side={"left"} className="w-[60%] sm:w-72">
          <nav>
            <ul className="gap-2 flex flex-col">
              {sections.map((section) => (
                <li
                  key={section.label}
                  className="p-1 mr-4 xl:-ml-4 tracking-widest hover:text-pink-700 transition underline  underline-offset-2 decoration-pink-700 decoration-2 hover:no-underline"
                >
                  <Link href={section.href}>
                    <p className="flex items-center gap-2">
                      {section.icon}
                      {section.label}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
