"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const sections = [
    { label: "Записи", href: "/admin/bookings" },
    { label: "Услуги", href: "/admin/services" },
    { label: "Мастера", href: "/admin/masters" },
  ];

  const pathname = usePathname();

  return (
    <aside className="w-[140px] hidden md:block fixed left-0 top-0 z-50 pt-6 pl-4 xl:pl-32 h-full bg-button">
      <Link href="/">
        <h2 className="text-xl tracking-tighter leading-none mb-12">
          Гомбрайх
        </h2>
      </Link>
      <nav>
        <ul className="gap-2 flex flex-col">
          {sections.map((section) => (
            <li key={section.label}>
              <Link
                className={cn("p-1", {
                  "bg-white tracking-widest": pathname.includes(section.href),
                })}
                href={section.href}
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
