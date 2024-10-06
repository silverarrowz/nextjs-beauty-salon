const ContactsSection = () => {
  return (
    <div
      id="contact"
      className="flex flex-col items-center justify-center mb-12 "
    >
      <h3 className="mb-4 text-xl">Адрес и контакты</h3>
      <hr className="mb-4 h-px w-3/5 border-t-0 bg-transparent bg-gradient-to-r max-w-48 from-transparent via-black to-transparent opacity-40" />

      <div className="mb-4 text-sm flex flex-col items-center sm:flex-row sm:gap-3 text-black/60">
        <p>gombreichsalon@yandex.ru</p>
        <p className="hidden sm:block">|</p>
        <p>+7 (939) 796-48-99</p>
      </div>
      <p className="tracking-wider text-sm">
        Ежедневно с <span className="font-bold">9:00</span> до{" "}
        <span className="font-bold">20:00</span>
      </p>
      <p className="text-sm">ул. Красных Мадьяр, 29, Иркутск</p>
      <iframe
        className="mt-4 w-full lg:w-[82%] h-[400px] relative"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2441.350539691519!2d104.29710407617681!3d52.27333775446301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5da83b5cb240b9c5%3A0x73788e0d0899cff9!2z0YPQuy4g0JrRgNCw0YHQvdGL0YUg0JzQsNC00YzRj9GALCAyOSwg0JjRgNC60YPRgtGB0LosINCY0YDQutGD0YLRgdC60LDRjyDQvtCx0LsuLCA2NjQwMjI!5e0!3m2!1sru!2sru!4v1727583348588!5m2!1sru!2sru"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default ContactsSection;
