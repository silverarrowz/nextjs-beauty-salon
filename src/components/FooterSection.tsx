import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { FaInstagram } from "react-icons/fa6";
import { FaVk } from "react-icons/fa";
import Link from "next/link";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="min-h-56 bg-button py-6 -mx-4 flex flex-col text-center justify-center items-center gap-4">
      <nav className="flex gap-3 items-center justify-center tracking-widest">
        <a
          href="#services"
          className="text-accent hover:underline underline-offset-2"
        >
          Услуги
        </a>
        <a
          href="#works"
          className="text-accent hover:underline underline-offset-2"
        >
          Наши работы
        </a>
        <a
          href="#contact"
          className="text-accent hover:underline underline-offset-2"
        >
          Контакты
        </a>
      </nav>
      <a
        href="#form"
        className={cn(
          buttonVariants(),
          "text-base tracking-wider rounded-none hover:bg-pink-700"
        )}
      >
        Записаться онлайн
      </a>

      <p className="text-accent tracking-widest">
        9:00-20:00 | gombreichsalon@yandex.ru | +7 (939) 796-48-99
      </p>
      <p className="text-accent -mt-2">ул. Красных Мадьяр, 29, Иркутск</p>
      <div className="flex gap-2">
        <Link href={"https://www.instagram.com/gombraih"} target="_blank">
          <FaInstagram size={24} />
        </Link>
        <Link href={"https://vk.com/gombraih_studia"} target="_blank">
          <FaVk size={24} />
        </Link>
      </div>
      <hr className="h-px w-3/5 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-black to-transparent opacity-25 dark:via-neutral-400" />

      <p className="max-w-96 text-sm">
        Не является публичной офертой. Окончательная стоимость услуг
        определяется после консультации со специалистом.
      </p>
      <p className="text-center">
        &copy; {currentYear} Гомбрайх. Все права защищены.
      </p>
    </footer>
  );
};

export default FooterSection;
