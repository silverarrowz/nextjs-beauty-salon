"use client";

import { cn } from "@/lib/utils";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSparkles, IoSparklesSharp } from "react-icons/io5";
import { MdEventNote, MdPeopleAlt } from "react-icons/md";

const Sidebar = () => {
  const sections = [
    { label: "Записи", href: "/admin/bookings", icon: <MdEventNote /> },
    { label: "Услуги", href: "/admin/services", icon: <IoSparkles /> },
    { label: "Мастера", href: "/admin/masters", icon: <MdPeopleAlt /> },
  ];

  const pathname = usePathname();

  return (
    <aside className="w-[140px] hidden md:block fixed left-0 top-0 z-50 pt-6 pl-4 xl:ml-32 h-full bg-button">
      <Link href="/">
        <h2 className="text-xl hover:text-pink-700 tracking-tighter leading-none mb-12">
          Гомбрайх
        </h2>
      </Link>
      <nav>
        <ul className="gap-2 flex flex-col">
          {sections.map((section) => (
            <li
              key={section.label}
              className={cn("p-1 mr-4 hover:text-pink-700 transition", {
                "bg-white tracking-widest hover:text-black": pathname.includes(
                  section.href
                ),
              })}
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
    </aside>
  );
};

export default Sidebar;
