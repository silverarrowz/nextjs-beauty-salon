const IntroSection = () => {
  return (
    <div className="mb-12 mt-24">
      <div className="relative text-center mx-auto max-h-[540px] max-w-[50rem] w-full overflow-hidden z-10">
        <img src={"/images/header-image.jpg"} alt="фото салона" />
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-button/20" />
      </div>

      <h1 className="text-5xl md:text-7xl font-light pt-8 pb-12 leading-tight md:leading-relaxed">
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
        className="bg-button hover:bg-button/30 transition tracking-wider"
      >
        Выбрать услугу &rarr;
      </a>
    </div>
  );
};

export default IntroSection;
