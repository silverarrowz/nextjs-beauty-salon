"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

import Autoplay from "embla-carousel-autoplay";

const WorksCarousel = () => {
  const worksPhotos = [
    {
      src: "/images/works/hair1.jpg",
      alt: "Hairstyle 1",
    },
    {
      src: "/images/works/makeup1.jpg",
      alt: "Makeup 1",
    },

    {
      src: "/images/works/hair2.jpg",
      alt: "Hairstyle 2",
    },
    {
      src: "/images/works/makeup2.jpg",
      alt: "Makeup 2",
    },
    {
      src: "/images/works/lashes1.jpg",
      alt: "Lashes 1",
    },
    {
      src: "/images/works/hair3.jpg",
      alt: "Hairstyle 3",
    },
    {
      src: "/images/works/hair4.jpg",
      alt: "Hairstyle 4",
    },
  ];

  return (
    <div className="mb-16">
      <div id="workshop" className="pt-6 pb-2 flex justify-center">
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="max-w-[80%] md:max-w-[90%] xl:max-w-full relative"
        >
          <CarouselContent>
            {worksPhotos.map((photo, index) => (
              <CarouselItem className="sm:basis-1/2 md:basis-1/3" key={index}>
                <div className="relative aspect-square overflow-hidden">
                  <img className="z-20" src={photo.src} alt={photo.alt} />
                  <div className="absolute top-0 left-0 bottom-0 right-0 z-30 bg-button/30 hover:bg-transparent transition" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <h3 className="text-center italic text-muted-foreground text-sm">
        Работы наших мастеров
      </h3>
    </div>
  );
};

export default WorksCarousel;
