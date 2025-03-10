import Link from "next/link";
import { LuFlower } from "react-icons/lu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { GiOakLeaf } from "react-icons/gi";
import Image from "next/image";

const IntroCarousel = () => {
  return (
    <Carousel
      opts={{
        loop: true,
        containScroll: false,
        watchDrag: false,
        duration: 35,
      }}
      plugins={[
        Autoplay({
          delay: 7000,
          stopOnInteraction: false,
        }),
        Fade({
          active: true,
        }),
      ]}
      className="w-full relative"
    >
      <CarouselContent>
        <CarouselItem>
          <Link href={"#form"}>
            <div
              className="flex flex-col lg:flex-row gap-3 lg:gap-0 relative
             bg-white lg:rounded-ss-3xl select-none p-4 lg:p-0 min-h-[600px] lg:min-h-[520px]"
            >
              <div
                className="relative w-full h-[352px] sm:h-[496px] lg:h-[520px] lg:rounded-ss-3xl
               overflow-hidden z-10 flex-grow"
              >
                <Image
                  fill
                  className="object-cover object-left w-full h-full"
                  src={"/images/intro-carousel-1.jpg"}
                  alt="фото салона"
                />
                <div className="absolute top-0 bottom-0 right-0 left-0 bg-button/20" />
              </div>
              <div
                // data-aos="fade-left"
                className="flex flex-col justify-center items-center lg:items-start
                 pt-6 px-4 lg:px-6 lg:h-full"
              >
                <h2
                  className="text-lg uppercase lg:normal-case
                 lg:text-pink-700 lg:text-8xl mb-4 sm:mb-6 lg:mb-10
                  tracking-wide text-center"
                >
                  Акция
                </h2>
                <p
                  className="text-center text-2xl lg:text-base mb-8 lg:mb-0
                 text-pink-700 leading-snug lg:leading-tight max-w-full lg:max-w-72"
                >
                  Всю весну дарим скидку{" "}
                  <span className="text-3xl lg:text-3xl">20%</span> на все
                  услуги&nbsp;для&nbsp;волос
                </p>
              </div>

              <button
                className="flex gap-1 text-sm lg:gap-2 items-center justify-center lg:absolute
               top-1/2 right-52 w-full sm:w-auto sm:mx-auto lg:text-lg bg-button-light
                hover:translate-y-[-5%] lg:hover:translate-y-0 lg:hover:translate-x-4
                hover:outline-pink-800 outline-1 outline
                 outline-pink-800/40 transition-all duration-300 uppercase shadow-md p-2
                 sm:p-4 z-40 mb-6 lg:mb-0"
              >
                Получить скидку <LuFlower size={24} />
              </button>

              <p className="text-xs text-black/50 absolute bottom-2 right-4">
                Акция действует до 31.05.2025
              </p>
            </div>
          </Link>
        </CarouselItem>

        <CarouselItem>
          <Link href={"#form"}>
            <div
              className="flex flex-col lg:flex-row gap-3 lg:gap-6 relative
             bg-white lg:rounded-ss-3xl select-none p-4 lg:p-0 min-h-[600px] lg:min-h-[520px]"
            >
              <div
                className="relative w-full h-[352px] sm:h-[448px]
               lg:h-[520px] lg:w-1/2 lg:rounded-ss-3xl overflow-hidden z-10 flex-grow"
              >
                <Image
                  fill
                  src={"/images/intro-carousel-4.jpg"}
                  alt="фото салона"
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-0 bottom-0 right-0 left-0 bg-button/20" />
              </div>

              <div
                className="flex flex-col justify-center items-center
               lg:items-start pt-6 lg:pt-16 px-4 lg:px-6 h-full"
              >
                <p
                  className="text-center text-lg sm:text-xl lg:text-lg text-pink-950
                 leading-tight max-w-full lg:max-w-72 mb-4 lg:mb-0"
                >
                  Дарим всем новым клиентам скидку
                  <br />
                  <span className="text-5xl sm:text-6xl lg:text-8xl text-pink-950 leading-snug italic">
                    15%{" "}
                  </span>
                  <br />
                  на первое посещение
                </p>
              </div>

              <button
                className="w-full sm:w-fit text-center mx-auto lg:mx-0 lg:w-auto
                 text-base sm:text-lg bg-button-light hover:italic hover:translate-y-[-5%]
                 lg:hover:translate-y-0 lg:hover:translate-x-4 hover:text-white hover:bg-pink-950
                 transition uppercase shadow-md p-3 sm:p-4 xl:p-8 z-40 mb-6 lg:mb-0"
              >
                Записаться
                <br className="sm:hidden lg:block" /> онлайн
              </button>
            </div>
          </Link>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious
        className="hidden lg:block hover:bg-transparent hover:text-pink-800/80"
        variant={"ghost"}
      />
      <CarouselNext
        className="hidden lg:block hover:bg-transparent hover:text-pink-800/80"
        variant={"ghost"}
      />
    </Carousel>
  );
};

export default IntroCarousel;
