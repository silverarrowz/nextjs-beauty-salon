"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { forwardRef, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { DateRangePicker } from "react-date-range";
import { ru } from "date-fns/locale";

const Page = () => {
  const supabase = createClient();

  const firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  const currentDate = new Date();

  const fetchBookings = async (startDate: Date, endDate: Date) => {
    setIsLoading(true);
    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setHours(23, 59, 59, 999);
    const { data, error } = await supabase
      .from("bookings")
      .select(
        `id, booking_date, client, price, paid, masters(name), services(label)`
      )
      .gte("booking_date", `${startDate.toISOString()}`)
      .lte("booking_date", `${adjustedEndDate.toISOString()}`)

      .order("id", { ascending: false });
    setBookings(data!);
    setIsLoading(false);
    console.log(startDate, endDate, data);
  };

  useEffect(() => {
    fetchBookings(firstDayOfMonth, currentDate);
  }, []);

  type EditorValues = {
    id: number;
    price: number;
    paid: boolean;
  };

  const [editorOpen, setEditorOpen] = useState(false);
  const [editorValues, setEditorValues] = useState<EditorValues | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [periodSelectOpen, setPeriodSelectOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPeriod([
      {
        ...selectedPeriod[0],
        [e.target.name]: new Date(e.target.value),
      },
    ]);
  };

  const handlePeriodSelectClick = () => {
    setPeriodSelectOpen(!periodSelectOpen);
  };

  const [selectedPeriod, setSelectedPeriod] = useState([
    {
      startDate: firstDayOfMonth,
      endDate: currentDate,
      key: "selection",
    },
  ]);

  useEffect(() => {
    console.log(selectedPeriod);
  }, [selectedPeriod]);

  const handlePeriodSelectSave = async () => {
    setPeriodSelectOpen(false);
    fetchBookings(selectedPeriod[0].startDate, selectedPeriod[0].endDate);
  };

  const handleBookingEdit = (id: number, price: number, paid: boolean) => {
    setEditorOpen(true);
    setEditorValues({ id, price, paid });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(e.target.value);
    setEditorValues({ ...editorValues!, price: newPrice });
  };

  const handlePaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditorValues({ ...editorValues!, paid: e.target.checked });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("bookings")
      .update({
        price: editorValues?.price,
        paid: editorValues?.paid,
      })
      .eq("id", editorValues?.id)
      .select();
    if (error) {
      console.log(error);
    }
    fetchBookings(selectedPeriod[0].startDate, selectedPeriod[0].endDate);
    setEditorOpen(false);
    setEditorValues(null);
  };

  interface TableCellProps
    extends React.TableHTMLAttributes<HTMLTableCellElement> {
    colSpan?: number;
  }

  const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
    ({ className, children, colSpan, ...props }, ref) => {
      return (
        <td
          className={cn("p-1 border text-sm tracking-tight", className)}
          ref={ref}
          {...props}
        >
          {children}
        </td>
      );
    }
  );

  TableCell.displayName = "TableCell";

  return (
    <div>
      <div className="flex flex-col lg:flex-row items-center lg:items-baseline gap-4 justify-between mb-4">
        <h2 className="pl-7">
          Записи за период с{" "}
          <button
            onClick={handlePeriodSelectClick}
            className="underline underline-offset-2 decoration-pink-700 hover:text-pink-700 hover:no-underline"
          >
            {`${selectedPeriod[0].startDate.toLocaleDateString(
              "ru-RU"
            )} по ${selectedPeriod[0].endDate.toLocaleDateString("ru-RU")}`}
          </button>
        </h2>

        {periodSelectOpen && (
          <div className="flex gap-5">
            <button
              className="text-sm tracking-tighter uppercase hover:text-black/70"
              onClick={() => {
                setPeriodSelectOpen(false);
                setSelectedPeriod([
                  {
                    startDate: firstDayOfMonth,
                    endDate: currentDate,
                    key: "selection",
                  },
                ]);
              }}
            >
              Отменить
            </button>
            <button
              className="text-sm tracking-tighter uppercase leading-none p-2 bg-pink-200 hover:bg-pink-400 hidden sm:block"
              onClick={handlePeriodSelectSave}
            >
              Показать записи за выбранный период
            </button>
            <button
              className="text-sm tracking-tighter uppercase leading-none p-2 bg-pink-200 hover:bg-pink-400 sm:hidden"
              onClick={handlePeriodSelectSave}
            >
              Показать записи
            </button>
          </div>
        )}
      </div>
      <div className="p-4 sm:p-2 lg:p-8">
        {periodSelectOpen && (
          <div className="hidden md:block mt-4 mb-12 max-w-[540px] md:max-w-[580px] max-h-[620px] bg-zinc-50 p-4">
            <DateRangePicker
              className="w-full"
              locale={ru}
              months={2}
              weekStartsOn={1}
              moveRangeOnFirstSelection={false}
              onChange={(item) => setSelectedPeriod([item.selection])}
              ranges={selectedPeriod}
              showPreview={true}
            />
          </div>
        )}
        {periodSelectOpen && (
          <div className="md:hidden text-sm mb-8 flex flex-col mx-auto max-w-[200px] gap-2">
            <label className="flex justify-between items-center">
              Начало
              <input
                type="date"
                name="startDate"
                value={selectedPeriod[0].startDate.toISOString().slice(0, 10)}
                onChange={handleDateInputChange}
                className="p-1 border"
              />
            </label>

            <label className="flex justify-between items-center">
              Конец
              <input
                type="date"
                name="endDate"
                value={selectedPeriod[0].endDate.toISOString().slice(0, 10)}
                onChange={handleDateInputChange}
                className="p-1 border"
              />
            </label>
          </div>
        )}
        {editorOpen && (
          <div className="mb-4 p-2">
            <form
              onSubmit={handleSubmit}
              className="tracking-tight text-sm flex flex-col sm:flex-row sm:justify-between items-center"
            >
              <div className="flex gap-4 mb-4 sm:mb-0">
                <p className="text-lg">ID: {editorValues?.id}</p>
                <label>
                  Цена
                  <input
                    className="ml-2 py-1 px-2 border max-w-24"
                    value={editorValues?.price}
                    onChange={handlePriceChange}
                    type="number"
                  />
                </label>
                <div className="items-center flex gap-2">
                  Оплачено
                  <label className="text-center inline-flex items-center cursor-pointer relative">
                    <input
                      className="peer h-6 w-6 rounded cursor-pointer transition-all appearance-none border border-zinc-900 checked:bg-white checked:border-white"
                      type="checkbox"
                      checked={editorValues?.paid}
                      onChange={handlePaidChange}
                    />
                    <span className="absolute text-pink-700 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="1"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  className="uppercase bg-pink-300 hover:bg-pink-400 transition-colors py-1 px-2"
                  type="submit"
                >
                  Сохранить
                </button>
                <button
                  onClick={() => {
                    setEditorOpen(false);
                    setEditorValues(null);
                  }}
                  className="uppercase hover:text-black/70"
                >
                  Отменить
                </button>
              </div>
            </form>
          </div>
        )}

        <div
          data-aos="zoom-in-up"
          className="overflow-scroll max-h-[500px] bg-zinc-50 p-4 lg:p-8 transition"
        >
          <table className="w-full text-left">
            <thead>
              <tr className="text-center">
                <TableCell className="font-extrabold uppercase text-sm"></TableCell>
                <TableCell className="font-extrabold uppercase text-sm">
                  Дата
                </TableCell>
                <TableCell className="font-extrabold uppercase text-sm">
                  Время
                </TableCell>
                <TableCell className="font-extrabold uppercase text-sm">
                  Мастер
                </TableCell>
                <TableCell className="font-extrabold uppercase text-sm">
                  Услуга
                </TableCell>
                <TableCell className="font-extrabold uppercase text-sm">
                  Клиент
                </TableCell>
                <TableCell className="font-extrabold uppercase text-sm">
                  Цена, руб.
                </TableCell>
                <TableCell className="font-extrabold uppercase text-sm">
                  Оплачено
                </TableCell>
                <TableCell className="font-extrabold uppercase text-sm">
                  ID
                </TableCell>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-4 text-sm">
                    Загрузка...
                  </td>
                </tr>
              ) : bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className={
                      editorValues?.id === booking.id ? "bg-zinc-200" : ""
                    }
                  >
                    <TableCell className="bg-zinc-200">
                      <button
                        onClick={() =>
                          handleBookingEdit(
                            booking.id,
                            booking.price,
                            booking.paid
                          )
                        }
                      >
                        <CiEdit size={18} />
                      </button>
                    </TableCell>
                    <TableCell className={booking.paid ? "" : "bg-red-100"}>
                      {new Date(booking.booking_date).toLocaleDateString(
                        "ru-RU",
                        {
                          year: "2-digit",
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )}
                    </TableCell>
                    <TableCell className={booking.paid ? "" : "bg-red-100"}>
                      {new Date(booking.booking_date)
                        .toLocaleTimeString()
                        .slice(0, 5)}
                    </TableCell>
                    <TableCell className={booking.paid ? "" : "bg-red-100"}>
                      {booking.masters.name}
                    </TableCell>
                    <TableCell
                      className={cn("max-w-32", {
                        "bg-red-100": !booking.paid,
                      })}
                    >
                      {booking.services.label}
                    </TableCell>
                    <TableCell className={booking.paid ? "" : "bg-red-100"}>
                      {booking.client}
                    </TableCell>
                    <TableCell className={booking.paid ? "" : "bg-red-100"}>
                      {booking.price}
                    </TableCell>
                    <TableCell className={booking.paid ? "" : "bg-red-100"}>
                      {booking.paid ? "Да" : "Нет"}
                    </TableCell>
                    <TableCell className={booking.paid ? "" : "bg-red-100"}>
                      {booking.id}
                    </TableCell>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="text-sm text-muted-foreground py-2 px-4"
                    colSpan={5}
                  >
                    Нет данных за выбранный период
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
