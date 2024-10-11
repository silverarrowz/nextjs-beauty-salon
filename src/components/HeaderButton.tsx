import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const HeaderButton = () => {
  return (
    <a
      href="#form"
      className={cn(
        buttonVariants(),
        `tracking-tighter bg-button-light text-pink-800 hover:bg-transparent 
         outline outline-1 outline-pink-800
          text-base rounded-none flex items-center`
      )}
    >
      Записаться
    </a>
  );
};

export default HeaderButton;
