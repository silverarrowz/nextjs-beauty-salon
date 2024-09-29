"use client";

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
                className="text-sm tracking-wider hover:underline hover:underline-offset-4 hover:bg-button/30 transition-colors"
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
