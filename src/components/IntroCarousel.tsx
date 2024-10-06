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

const IntroCarousel = () => {
  return (
    <Carousel
      opts={{
        loop: true,
        containScroll: false,
        // watchDrag: false,
        duration: 35,
      }}
      plugins={[
        Autoplay({
          delay: 7000,
          // stopOnInteraction: false,
        }),
        Fade({
          active: true,
        }),
      ]}
      className="w-full relative"
    >
      <CarouselContent>
        <CarouselItem>
          {/* <div className="flex gap-3 lg:gap-6 relative bg-white lg:rounded-ss-3xl select-none">
            <div className="relative lg:max-h-[520px] w-full lg:rounded-ss-3xl overflow-hidden z-10">
              <img src={"/images/intro-carousel-1.jpg"} alt="фото салона" />
              <div className="absolute top-0 bottom-0 right-0 left-0 bg-button/20" />
            </div>
            <div
              data-aos="fade-left"
              className="flex flex-col pt-6 px-6 h-full"
            >
              <h2 className="text-xl lg:text-8xl mb-10 tracking-wide">Акция</h2>
              <p className="text-center text-base text-black/70 leading-tight max-w-72">
                Всю осень дарим скидку <span className="text-xl">20%</span> на
                все услуги для волос
              </p>
            </div>
            <Link href={"#form"}>
              <button className="flex lg:gap-2 items-center absolute top-1/2 right-52 text-lg bg-gradient-to-l from-button to-pink-500 hover:translate-x-4 hover:text-white transition uppercase shadow-md p-2 lg:p-4 z-40">
                Получить скидку <LuFlower size={24} />
              </button>
            </Link>
            <p className="text-xs text-black/50 absolute bottom-2 right-4">
              Акция действует до 31.11.2024
            </p>
          </div> */}
          <Link href={"#form"}>
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 relative bg-white xl:rounded-ss-3xl select-none p-4 lg:p-0">
              <div className="relative w-full h-80 lg:h-[520px] xl:rounded-ss-3xl overflow-hidden z-10">
                <img
                  className="object-cover w-full h-full"
                  src={"/images/intro-carousel-1.jpg"}
                  alt="фото салона"
                />
                <div className="absolute top-0 bottom-0 right-0 left-0 bg-button/20" />
              </div>
              <div
                data-aos="fade-left"
                className="flex flex-col justify-center items-center lg:items-start pt-6 px-4 lg:px-6 lg:h-full"
              >
                <h2 className="text-lg uppercase lg:normal-case text-pink-900 lg:text-pink-950 lg:text-8xl mb-4 sm:mb-6 lg:mb-10 tracking-wide text-center">
                  Акция
                </h2>
                <p className="text-center text-2xl lg:text-base mb-8 lg:mb-0 text-black/70 leading-snug lg:leading-tight max-w-full lg:max-w-72">
                  Всю осень дарим скидку{" "}
                  <span className="text-3xl lg:text-3xl">20%</span> на все
                  услуги&nbsp;для&nbsp;волос
                </p>
              </div>

              <button
                className="flex gap-1 text-sm lg:gap-2 items-center justify-center lg:absolute
               top-1/2 right-52 w-full sm:w-auto sm:mx-auto lg:text-lg bg-gradient-to-l from-button to-pink-500
                hover:translate-y-[-5%] lg:hover:translate-y-0 lg:hover:translate-x-4
                hover:text-white transition-all duration-300 uppercase shadow-md p-2 sm:p-4 z-40 mb-6 lg:mb-0"
              >
                Получить скидку <LuFlower size={24} />
              </button>

              <p className="text-xs text-black/50 absolute bottom-2 right-4">
                Акция действует до 31.11.2024
              </p>
            </div>
          </Link>
        </CarouselItem>
        <CarouselItem>
          <div className="flex gap-6 relative bg-pink-600 rounded-ss-3xl select-none">
            <div className="relative max-h-[520px] w-full rounded-ss-3xl overflow-hidden z-10">
              <img src={"/images/intro-carousel-2.jpg"} alt="фото салона" />
              <div className="absolute top-0 bottom-0 right-0 left-0 bg-button/20" />
            </div>
            <div
              data-aos="fade-left"
              className="flex flex-col pt-6 px-6 h-full w-48"
            >
              <h2 className="absolute top-12 right-8 text-4xl mb-10 tracking-wider">
                Осенний завоз декоративной косметики!
              </h2>
            </div>
            <Link href={"#form"}>
              <button className="flex gap-2 items-center absolute top-1/2 right-52 text-lg bg-white hover:translate-x-4 hover:bg-purple-100 transition uppercase shadow-md p-4 z-40">
                Записаться онлайн <GiOakLeaf size={24} />
              </button>
            </Link>
            <p className=" text-center text-base text-black/70 leading-tight max-w-72 absolute bottom-24 right-16">
              Скидка <span className="text-2xl font-bold">15%</span> на макияж в
              модных оттенках сезона
            </p>
            <p className="text-xs text-black/50 absolute bottom-2 right-4">
              Акция действует до 31.10.2024
            </p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex gap-6 relative bg-white rounded-ss-3xl select-none">
            <div className="relative max-h-[520px] w-full rounded-ss-3xl overflow-hidden z-10">
              <img src={"/images/intro-carousel-4.jpg"} alt="фото салона" />
              <div className="absolute top-0 bottom-0 right-0 left-0 bg-button/20" />
            </div>
            <div
              // data-aos="fade-left"
              className="flex flex-col pt-16 px-6 h-full"
            >
              <p className="text-center text-lg text-black/50 leading-tight max-w-72">
                Дарим всем новым клиентам скидку
                <br />
                <span className="text-8xl text-black leading-snug italic">
                  15%{" "}
                </span>
                <br />
                на первое посещение
              </p>
            </div>
            <Link href={"#form"}>
              <button className="flex gap-2 items-center absolute bottom-40 right-52 text-lg bg-button-light hover:italic hover:translate-x-4 hover:text-white hover:bg-black transition uppercase shadow-md p-4 z-40">
                Записаться онлайн
              </button>
            </Link>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="hidden lg:block" variant={"ghost"} />
      <CarouselNext className="hidden lg:block" variant={"ghost"} />
      <p className="text-xs uppercase text-black/40 mt-2 ml-4">
        Фото &copy; Freepik
      </p>
    </Carousel>
  );
};

export default IntroCarousel;
