import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const HeaderButton = () => {
  return (
    <a
      href="#form"
      className={cn(
        buttonVariants(),
        `block tracking-tighter bg-button text-white hover:bg-card 
         hover:text-card-foreground text-base rounded-none`
      )}
    >
      Записаться
    </a>
  );
};

export default HeaderButton;
