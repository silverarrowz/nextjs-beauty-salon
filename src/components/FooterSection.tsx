import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { FaInstagram } from "react-icons/fa6";
import { FaVk } from "react-icons/fa";
import Link from "next/link";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="min-h-56 bg-button-light py-8  lg:-mx-0 flex flex-col text-center justify-center items-center gap-4">
      <nav className="flex flex-col sm:flex-row gap-3 items-center justify-center tracking-widest">
        <a
          href="#services"
          className="hover:underline hover:bg-button-light decoration-1 underline-offset-4"
        >
          Услуги
        </a>
        <a
          href="#workshop"
          className="hover:underline hover:bg-button-light decoration-1 underline-offset-4"
        >
          Наши работы
        </a>
        <a
          href="#contact"
          className="hover:underline hover:bg-button-light decoration-1 underline-offset-4"
        >
          Контакты
        </a>
        <a
          href="/login"
          className="hover:underline hover:bg-button-light decoration-1 underline-offset-4"
        >
          Вход для админов
        </a>
      </nav>
      <a
        href="#form"
        className={cn(
          buttonVariants(),
          ` text-base tracking-wider rounded-none bg-zinc-50 hover:bg-transparent
         border border-pink-800 text-pink-800 box-border`
        )}
      >
        Записаться онлайн
      </a>

      <div className="tracking-widest flex flex-col sm:flex-row gap-1 sm:gap-2 items-center mb-4">
        <p className="text-pink-950/70">
          9:00-20:00 <span className="hidden sm:inline"> |</span>
        </p>
        <p className="text-pink-950/70">
          salon@gombreich.ru <span className="hidden sm:inline"> |</span>
        </p>
        <p className="text-pink-950/70">+7 (939) 796-48-99</p>
      </div>
      <p className="-mt-2 text-pink-950/70">ул. Красных Мадьяр, 29, Иркутск</p>
      <div className="flex gap-2">
        <Link href={"https://www.instagram.com/gombraih"} target="_blank">
          <FaInstagram
            size={24}
            className=" hover:text-pink-900 transition-colors"
          />
        </Link>
        <Link href={"https://vk.com/gombraih_studia"} target="_blank">
          <FaVk size={24} className=" hover:text-pink-900 transition-colors" />
        </Link>
      </div>
      <hr className="h-px w-3/5 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-pink-950 to-transparent opacity-25 dark:via-neutral-400" />

      <p className="max-w-72 sm:max-w-96 text-sm text-pink-950/70">
        Не является публичной офертой. Окончательная стоимость услуг
        определяется после консультации со специалистом.
      </p>
      <p className="text-center tracking-tighter text-pink-950/70">
        &copy; {currentYear} Гомбрайх. Все права защищены.
      </p>
    </footer>
  );
};

export default FooterSection;
