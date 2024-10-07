"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import IntroCarousel from "./IntroCarousel";

const IntroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
    });
  }, []);

  return (
    <div className="mb-12 mt-32 max-w-[860px] xl:max-w-screen-lg 2xl:max-w-screen-xl mx-auto transition-all">
      <IntroCarousel />
      <div className="max-w-screen-lg mx-4 xl:mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-light pt-8 pb-12 leading-tight sm:leading-relaxed md:leading-loose">
          Гомбрайх —{" "}
          <span className="bg-card italic tracking-wider">
            пространство красоты
          </span>
        </h1>
        <p className="mb-2">
          Салон красоты Гомбрайх – это пространство, где команда из более{" "}
          <span className="bg-card tracking-wider">40 человек</span> дарит вам
          комфорт и уверенность в себе. С нами Ваша красота в надежных руках
          профессионалов!
        </p>

        <a
          href="#"
          className="bg-button hover:bg-button/30 hover:italic transition tracking-wider"
        >
          Выбрать услугу &rarr;
        </a>
      </div>
    </div>
  );
};

export default IntroSection;
