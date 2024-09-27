"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Master, Service } from "../../types";
import { createClient } from "@supabase/supabase-js";

export type FormValues = {
  service: string;
  master: string;
  date: string;
  time: string;
  phone: number;
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
    return slotEnd <= shiftEnd;
  });
  return availableTimeSlots;
};

interface FormSectionProps {
  services: Service[];
}

const FormSection = ({ services }: FormSectionProps) => {
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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);

    const { data: booking, error } = await supabase
      .from("bookings")
      .insert([
        {
          booking_date: new Date(`${data.date}T${data.time}:00`).toISOString(),
          master_id: parseInt(data.master),
          service_id: parseInt(data.service),
        },
      ])
      .select();

    if (error) {
      console.log(error);
    }

    if (booking) {
      setbookingCreated(true);
    }

    setSelectedMaster(null);
    setSelectedService(null);
    reset();
  };

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedServiceInfo, setSelectedServiceInfo] =
    useState<Service | null>(null);
  const [filteredMasters, setFilteredMasters] = useState<Master[]>([]);
  const [selectedMaster, setSelectedMaster] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

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
    // unregister("date");
  };

  const handleDateSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);

    const { data: selectedDateBookings, error } = await supabase
      .from("bookings")
      .select(`id, service_id, booking_date, services("duration_in_minutes")`)
      .eq("master_id", selectedMaster)
      .gte("booking_date", `${selectedDate}T00:00:00+00:00`)
      .lt("booking_date", `${selectedDate}T23:59:59+00:00`);

    console.log(selectedDate, selectedDateBookings);

    const availableTimeSlots = generateTimeSlots(
      30,
      selectedServiceInfo?.duration_in_minutes!,
      selectedDateBookings!,
      selectedDate
    );

    setTimeSlots(availableTimeSlots);
    console.log(availableTimeSlots);
    console.log(selectedServiceInfo?.duration_in_minutes);
  };

  const handleTimeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  return (
    <div id="form" className="pt-12 pb-60 flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-96">
        <label className="tracking-wide">Выберите услугу</label>
        <select
          className="mb-4 p-2"
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
        {errors.service && (
          <span className="text-red-600 text-sm -mt-4 mb-4">
            Пожалуйста, выберите одну из услуг
          </span>
        )}

        {selectedService && (
          <div className="mb-4">
            <div className="">
              <label className="tracking-wide mr-2">Выберите мастера</label>
              <select
                className="p-2"
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

            {errors.master && (
              <span className="text-red-600 text-sm">
                Пожалуйста, выберите одного из мастеров
              </span>
            )}
          </div>
        )}

        {selectedMaster && (
          <div>
            <label className="tracking-wide mr-2">Выберите день</label>
            <input
              className="mb-4 p-2"
              type="date"
              {...register("date", { required: true })}
              value={selectedDate ? selectedDate : ""}
              onChange={handleDateSelect}
            />
          </div>
        )}

        {selectedDate && (
          <div>
            <label className="tracking-wide mr-2">Выберите время</label>
            <select
              value={selectedTime ? selectedTime : ""}
              className="mb-4 p-2"
              {...register("time", { required: true })}
              onChange={handleTimeSelect}
            >
              <option value="">свободные часы</option>
              {timeSlots.map((timeSlot) => (
                <option value={timeSlot} key={timeSlot}>
                  {timeSlot}
                </option>
              ))}
            </select>
          </div>
        )}

        <label>Номер Вашего телефона</label>
        <input
          className="mb-4 p-2"
          type="tel"
          {...register("phone", { required: true })}
        />
        {errors.phone && <span>phone error</span>}
        <input
          className="text-white bg-button/70 hover:bg-button transition-colors w-full p-4"
          type="submit"
        />
      </form>
      {/* {bookingCreated && (
        <div className="text-center text-white bg-success/50 transition-colors p-4">
          Запись успешно создана! Вы записаны на
          <span className="font-bold">{selectedService}</span> с{" "}
          {selectedMaster}
        </div>
      )} */}
    </div>
  );
};

export default FormSection;
