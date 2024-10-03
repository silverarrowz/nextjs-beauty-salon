import { FaInstagram } from "react-icons/fa6";
import { FaVk } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="min-h-56 bg-button pb-6 pt-4 lg:-mx-0 flex flex-col text-center justify-center items-center gap-4">
      <div className="text-accent tracking-widest flex flex-col sm:flex-row gap-1 sm:gap-2 items-center mb-4">
        <p>
          9:00-20:00 <span className="hidden sm:inline"> |</span>
        </p>
        <p>
          gombreichsalon@yandex.ru <span className="hidden sm:inline"> |</span>
        </p>
        <p>+7 (939) 796-48-99</p>
      </div>
      <p className="text-accent -mt-2">ул. Красных Мадьяр, 29, Иркутск</p>
      <div className="flex gap-2">
        <Link href={"https://www.instagram.com/gombraih"} target="_blank">
          <FaInstagram
            size={24}
            className="text-black hover:text-white transition-colors"
          />
        </Link>
        <Link href={"https://vk.com/gombraih_studia"} target="_blank">
          <FaVk
            size={24}
            className="text-black hover:text-white transition-colors"
          />
        </Link>
      </div>
      <hr className="h-px w-3/5 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-black to-transparent opacity-25 dark:via-neutral-400" />

      <p className="text-center tracking-tighter">
        &copy; {currentYear} Гомбрайх. Все права защищены.
      </p>
    </footer>
  );
};

export default Footer;
