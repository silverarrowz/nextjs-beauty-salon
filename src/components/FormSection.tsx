"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Master, Service } from "../../types";
import { createClient } from "@supabase/supabase-js";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

import { Cross2Icon } from "@radix-ui/react-icons";
import { LuFlower, LuFlower2 } from "react-icons/lu";
import AOS from "aos";
import "aos/dist/aos.css";

export type FormValues = {
  service: string;
  master: string;
  date: string;
  time: string;
  phone: number;
};

const formatDate = (dateString: string): string => {
  const dateToDisplay = new Date(dateString);

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(dateToDisplay);
};

const generateTimeSlots = (
  interval: number = 30,
  selectedServiceDuration: number = 120,
  bookings: any[],
  date: string
): string[] => {
  const allTimeSlots: string[] = [];

  const shiftStart = new Date(date);
  const shiftEnd = new Date(date);
  shiftStart.setHours(9, 0, 0, 0);
  shiftEnd.setHours(19, 0, 0, 0);

  // создаем массив со всеми возможными временами для записи:

  while (shiftStart <= shiftEnd) {
    const timeSlot = shiftStart.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    allTimeSlots.push(timeSlot);
    shiftStart.setMinutes(shiftStart.getMinutes() + interval);
  }

  const bookedPeriods: { start: Date; end: Date }[] = [];

  // заполняем массив с существующими бронированиями:

  bookings.forEach((booking) => {
    const start = new Date(booking.booking_date);
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + booking.services.duration_in_minutes);

    bookedPeriods.push({ start, end });
  });

  const availableTimeSlots = allTimeSlots.filter((slot) => {
    const currentDate = new Date();
    const nearestAvailableDate = new Date(
      currentDate.setMinutes(currentDate.getMinutes() + interval)
    );

    const slotStart = new Date(date);
    const [hours, minutes] = slot.split(":").map(Number);
    slotStart.setHours(hours, minutes, 0, 0);

    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + selectedServiceDuration);

    // рассчитываем все возможные времена для записи и исключаем
    // пересечения с уже существующими бронированиями:

    for (const { start, end } of bookedPeriods) {
      if (
        (slotStart >= start && slotStart < end) ||
        (slotEnd > start && slotEnd <= end) ||
        (slotStart <= start && slotEnd >= end)
      ) {
        return false;
      }
    }
    return slotEnd <= shiftEnd && slotStart > nearestAvailableDate;
  });
  return availableTimeSlots;
};

interface FormSectionProps {
  services: Service[];
}

const FormSection = ({ services }: FormSectionProps) => {
  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);
  const handleSubmitConfirmation = () => {
    setShowSubmitConfirmation(true);
    setbookingCreated(false);
    setConfirmationInfo({
      master: selectedMasterName!,
      service: selectedServiceInfo!.label,
      date: selectedDate!,
      time: selectedTime!,
      price: price!,
      phone: phone!,
    });
  };

  const handleSubmitConfirmationConfirm = () => {
    handleSubmit(onSubmit)();
  };

  const handleSubmitConfirmationClose = () => {
    setShowSubmitConfirmation(false);
    setbookingCreated(false);
    setConfirmationInfo(null);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    setIsLoadingConfirmation(true);

    const { data: booking, error } = await supabase
      .from("bookings")
      .insert([
        {
          booking_date: new Date(`${data.date}T${data.time}:00`).toISOString(),
          master_id: parseInt(data.master),
          service_id: parseInt(data.service),
          client: data.phone,
          price: parseInt(price!),
        },
      ])
      .select();

    if (error) {
      console.log(error);
    }

    if (booking) {
      setbookingCreated(true);
    }
    setIsLoadingConfirmation(false);
    setSelectedMaster("");
    setSelectedService("");
    setSelectedDate("");
    setSelectedTime("");
    setTimeSlots([]);
    reset();
  };

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedServiceInfo, setSelectedServiceInfo] =
    useState<Service | null>(null);
  const [filteredMasters, setFilteredMasters] = useState<Master[]>([]);
  const [selectedMaster, setSelectedMaster] = useState<string | null>(null);
  const [selectedMasterName, setSelectedMasterName] = useState<string | null>(
    null
  );
  const [price, setPrice] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [phone, setPhone] = useState<string | null>(null);

  const [isLoadingConfirmation, setIsLoadingConfirmation] = useState(false);

  interface ConfirmationInfo {
    service: string;
    master: string;
    date: string;
    time: string;
    price: string;
    phone: string;
  }

  const [confirmationInfo, setConfirmationInfo] =
    useState<ConfirmationInfo | null>(null);
  const [bookingCreated, setbookingCreated] = useState(false);

  useEffect(() => {
    setSelectedMaster("");
    setSelectedDate("");
    setSelectedTime("");
    setTimeSlots([]);
    unregister(["date", "master", "time"]);
  }, [selectedService]);

  useEffect(() => {
    setSelectedDate("");
    setSelectedTime("");
    setTimeSlots([]);
    unregister(["date", "time"]);
  }, [selectedMaster]);

  useEffect(() => {
    setSelectedTime("");
    unregister("time");
  }, [selectedDate]);

  // выбор услуги
  const handleServiceSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedService(selectedValue);
    // unregister("date");
    // unregister("master");
    setSelectedServiceInfo(
      services.find((service) => service.id === parseInt(selectedValue))!
    );

    const serviceMasters =
      services.find((service) => service.id === parseInt(selectedValue))
        ?.masters ?? [];
    setFilteredMasters(serviceMasters);
  };

  // выбор мастера
  const handleMasterSelect = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedMaster(e.target.value);
    setSelectedMasterName(
      filteredMasters.find((master) => master.id === parseInt(e.target.value))
        ?.name!
    );

    const { data, error } = await supabase
      .from("services_masters")
      .select("price")
      .eq("master_id", e.target.value)
      .eq("service_id", selectedService);

    const price = data![0].price;
    setPrice(price);
  };

  const handleDateSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);

    setIsLoadingSlots(true);

    const { data: selectedDateBookings, error } = await supabase
      .from("bookings")
      .select(`id, service_id, booking_date, services("duration_in_minutes")`)
      .eq("master_id", selectedMaster)
      .gte("booking_date", `${selectedDate}T00:00:00+00:00`)
      .lt("booking_date", `${selectedDate}T23:59:59+00:00`);

    const availableTimeSlots = generateTimeSlots(
      30,
      selectedServiceInfo?.duration_in_minutes!,
      selectedDateBookings!,
      selectedDate
    );

    setTimeSlots(availableTimeSlots);
    setIsLoadingSlots(false);
  };

  const handleTimeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length === 1) {
      input = `+${input}`;
    } else if (input.length > 1 && input.length <= 4) {
      input = `+${input.slice(0, 1)} (${input.slice(1)}`;
    } else if (input.length > 4 && input.length <= 7) {
      input = `+${input.slice(0, 1)} (${input.slice(1, 4)}) ${input.slice(4)}`;
    } else if (input.length > 7) {
      input = `+${input.slice(0, 1)} (${input.slice(1, 4)}) ${input.slice(
        4,
        7
      )}-${input.slice(7, 11)}`;
    }
    setPhone(input);
  };

  return (
    <div
      id="form"
      className="pt-12 pb-12 flex flex-col items-center justify-center"
    >
      <LuFlower2 className="text-center mx-auto mb-8" size={36} />

      <h2
        data-aos="fade-up"
        className="text-xl sm:text-2xl font-thin tracking-widest text-center mb-6"
      >
        Запишитесь прямо сейчас{" "}
        <span className="bg-button">на любое удобное&nbsp;время!</span>
      </h2>
      <hr className="mb-6 h-px border-t-0 w-64 bg-transparent bg-gradient-to-r from-transparent via-black to-transparent opacity-25 dark:via-neutral-400" />

      <form
        onSubmit={handleSubmit(handleSubmitConfirmation)}
        className="flex flex-col w-full sm:w-96 border border-pink-900/60 bg-gray-200 shadow-sm p-4 sm:p-6"
      >
        <label className="tracking-wide text-pink-950/60 mb-1">
          Выберите услугу
        </label>
        <select
          className="mb-4 p-2 text-pink-900 rounded-none min-h-10 bg-white shadow-sm"
          {...register("service", { required: true })}
          onChange={handleServiceSelect}
        >
          <option value="">выберите услугу</option>
          {services.map((service) => (
            <option value={service.id} key={service.id}>
              {service.label}
            </option>
          ))}
        </select>
        {errors.service && selectedService === "" && (
          <span className="text-red-800 text-sm -mt-4 mb-4">
            Пожалуйста, выберите одну из услуг
          </span>
        )}

        {selectedService && (
          <div className="mb-4">
            <div className="">
              <label className="tracking-wide text-pink-950/60 mb-1">
                Выберите мастера
              </label>
              <select
                className="p-2 text-pink-900 rounded-none min-h-10 bg-white shadow-sm block w-full"
                {...register("master", { required: true })}
                onChange={handleMasterSelect}
                value={selectedMaster ? selectedMaster : ""}
              >
                <option value="">выберите мастера</option>
                {filteredMasters.map((master) => (
                  <option value={master.id} key={master.id}>
                    {master.name}
                  </option>
                ))}
              </select>
            </div>

            {errors.master && selectedMaster === "" && (
              <span className="text-red-800 text-sm">
                Пожалуйста, выберите одного из мастеров
              </span>
            )}
          </div>
        )}

        {selectedMaster && !!price && (
          <div className="mb-4 text-pink-950/60 text-sm italic">
            Стоимость услуги ~ {price} руб.
          </div>
        )}

        {selectedMaster && (
          <div>
            <label className="tracking-wide mr-2 text-pink-950/60">
              Выберите день
            </label>
            <input
              className="mb-4 p-2 text-pink-900 rounded-none min-h-10 bg-white shadow-sm"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              max={
                new Date(new Date().setMonth(new Date().getMonth() + 1))
                  .toISOString()
                  .split("T")[0]
              }
              {...register("date", { required: true })}
              value={selectedDate ? selectedDate : ""}
              onChange={handleDateSelect}
            />
            {errors.date && selectedDate === "" && (
              <span className="text-red-800 text-sm block -mt-4 mb-4">
                Пожалуйста, выберите один из дней
              </span>
            )}
          </div>
        )}

        {selectedDate && (
          <div>
            <label className="tracking-wide mr-2 text-pink-950/60">
              Выберите время
            </label>
            <select
              disabled={isLoadingSlots}
              value={selectedTime ? selectedTime : ""}
              className="mb-4 p-2 rounded-none min-h-10 text-pink-900 bg-white shadow-sm"
              {...register("time", { required: true })}
              onChange={handleTimeSelect}
            >
              <option value="">
                {isLoadingSlots ? "ищем свободное время..." : "время"}
              </option>
              {timeSlots.map((timeSlot) => (
                <option value={timeSlot} key={timeSlot}>
                  {timeSlot}
                </option>
              ))}
            </select>
            {errors.time && selectedTime === "" && (
              <span className="text-red-800 text-sm block -mt-4 mb-4">
                Пожалуйста, выберите время для записи
              </span>
            )}
          </div>
        )}
        {selectedDate && timeSlots.length === 0 && !isLoadingSlots && (
          <p className="mb-4 text-sm text-pink-950/60">
            Нет свободного времени. Выберите другой день.
          </p>
        )}

        <label className="tracking-wide text-pink-950/60 mb-1">
          Номер Вашего телефона
        </label>
        <input
          className="mb-4 p-2 text-pink-900 rounded-none min-h-10 bg-white shadow-sm"
          type="tel"
          {...register("phone", { required: true })}
          value={phone ? phone : ""}
          onChange={handlePhoneChange}
        />
        {errors.phone && (
          <span className="text-red-800 text-sm block -mt-4 mb-4">
            Пожалуйста, укажите номер Вашего телефона
          </span>
        )}
        <input
          className="cursor-pointer shadow-sm text-pink-950 hover:text-zinc-50 bg-button-light hover:bg-button hover:outline outline-1 outline-pink-900/60 transition-colors w-full p-4  rounded-none min-h-10"
          type="submit"
          value={"Записаться"}
        />
      </form>

      {/* Поп-ап для подтверждения записи */}

      <Dialog open={showSubmitConfirmation}>
        <DialogContent className="max-w-[320px] sm:max-w-lg">
          <DialogClose
            onClick={handleSubmitConfirmationClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogHeader>
            <LuFlower className="text-center mx-auto mb-2" size={30} />
            <DialogTitle className="tracking-wider">
              {bookingCreated
                ? "Благодарим Вас за запись!"
                : " Пожалуйста, подтвердите запись"}
            </DialogTitle>
            <hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-black to-transparent opacity-25 dark:via-neutral-400" />
            <DialogDescription>
              <p className="text-base">
                {confirmationInfo?.service}, мастер {confirmationInfo?.master}
              </p>
              <p className="mt-1 mb-2 text-lg text-black bg-button/30">
                {!!confirmationInfo?.date && formatDate(confirmationInfo.date)}{" "}
                в {confirmationInfo?.time}
              </p>
              <p>
                Длительность:
                {selectedServiceInfo?.duration_in_minutes! > 60
                  ? ` ${selectedServiceInfo?.duration_in_minutes! / 60} ч`
                  : ` ${selectedServiceInfo?.duration_in_minutes} минут`}
              </p>
              <p>Стоимость: ~ {price} руб.</p>
              <p>Ваш номер телефона: {confirmationInfo?.phone}</p>
              {bookingCreated && (
                <p className="mt-2 text-base text-foreground bg-button">
                  Мы свяжемся с Вами в ближайшее время для подтверждения брони!
                </p>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {bookingCreated ? (
              <Button
                onClick={handleSubmitConfirmationClose}
                className="bg-white  rounded-sm min-h-10 text-black hover:bg-white/55"
              >
                Закрыть
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleSubmitConfirmationClose}
                  className="bg-white rounded-sm min-h-10 text-black hover:bg-white/55"
                  disabled={isLoadingConfirmation}
                >
                  Отмена
                </Button>
                <Button
                  onClick={handleSubmitConfirmationConfirm}
                  className="bg-button rounded-sm min-h-10 hover:bg-purple-700 mb-2"
                >
                  {isLoadingConfirmation ? "Загрузка..." : "Записаться"}
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormSection;
