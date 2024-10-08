import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const HeaderButton = () => {
  return (
    <a
      href="#form"
      className={cn(
        buttonVariants(),
        `tracking-tighter bg-pink-950 text-white hover:bg-transparent 
         hover:text-pink-950 hover:border border-pink-950
          text-base rounded-none flex items-center`
      )}
    >
      Записаться
    </a>
  );
};

export default HeaderButton;
