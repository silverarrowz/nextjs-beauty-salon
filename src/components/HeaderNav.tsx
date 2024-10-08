"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const HeaderNav = () => {
  const pathname = usePathname();

  const NavLinks = [
    {
      label: "Услуги",
      href: "#services",
      active: pathname.includes("services"),
    },
    // {
    //   label: "Мастера",
    //   href: "#team",
    //   active: pathname.includes("team"),
    // },
    {
      label: "Наши работы",
      href: "#workshop",
      active: pathname.includes("workshop"),
    },
    // {
    //   label: "Наш салон",
    //   href: "#about",
    //   active: pathname.includes("about"),
    // },
    {
      label: "Контакты",
      href: "#contact",
      active: pathname.includes("contact"),
    },
  ];

  return (
    <div>
      <nav>
        <ul className="hidden sm:flex gap-6">
          {NavLinks.map((link) => (
            <li key={link.href}>
              <a
                className={cn(
                  "text-sm tracking-wider hover:text-pink-800 transition-colors",
                  {
                    "bg-button": link.active,
                  }
                )}
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default HeaderNav;
