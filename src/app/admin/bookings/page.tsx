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
    const { data, error } = await supabase
      .from("bookings")
      .select(
        `id, booking_date, client, price, paid, masters(name), services(label)`
      )
      .gte("booking_date", `${startDate.toISOString()}`)
      .lt("booking_date", `${endDate.toISOString()}`)

      .order("id", { ascending: false });
    setBookings(data!);
    setIsLoading(false);
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
    <div className="p-4 sm:px-6 bg-zinc-50">
      <div className="flex flex-col lg:flex-row items-center lg:items-baseline gap-4 justify-between mb-4">
        <h2>
          Записи за период{" "}
          <button
            onClick={handlePeriodSelectClick}
            className="underline underline-offset-2"
          >
            {`с ${selectedPeriod[0].startDate.toLocaleDateString(
              "ru-RU"
            )} по ${selectedPeriod[0].endDate.toLocaleDateString("ru-RU")}`}
          </button>
        </h2>

        {periodSelectOpen && (
          <div className="flex gap-4">
            <button
              className="text-sm tracking-tighter uppercase hover:text-muted-foreground"
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
              className="text-sm tracking-tighter uppercase leading-none p-2 bg-amber-200 hover:bg-amber-300 rounded-sm hidden sm:block"
              onClick={handlePeriodSelectSave}
            >
              Показать записи за выбранный период
            </button>
            <button
              className="text-sm tracking-tighter uppercase leading-none p-2 bg-amber-200 hover:bg-amber-300 rounded-sm sm:hidden"
              onClick={handlePeriodSelectSave}
            >
              Показать записи
            </button>
          </div>
        )}
      </div>

      {periodSelectOpen && (
        <div className="hidden sm:block mb-4 rounded-sm overflow-hidden max-w-[520px] max-h-[580px]">
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
        <div className="sm:hidden text-sm mb-4 flex flex-col items-center gap-2">
          <label className="">
            Начало
            <input
              type="date"
              name="startDate"
              value={selectedPeriod[0].startDate.toISOString().slice(0, 10)}
              onChange={handleDateInputChange}
              className="ml-2 p-1 border rounded-sm"
            />
          </label>

          <label className="">
            Конец
            <input
              type="date"
              name="endDate"
              value={selectedPeriod[0].endDate.toISOString().slice(0, 10)}
              onChange={handleDateInputChange}
              className="ml-2 p-1 border rounded-sm"
            />
          </label>
        </div>
      )}
      {editorOpen && (
        <div className="rounded-md shadow-sm mb-4 p-2">
          <form
            onSubmit={handleSubmit}
            className="tracking-tight text-sm flex flex-col sm:flex-row sm:justify-between items-center"
          >
            <div className="flex gap-4 mb-4 sm:mb-0">
              <p className="text-lg">ID: {editorValues?.id}</p>
              <label>
                Цена
                <input
                  className="ml-2 py-1 px-2 rounded-sm border max-w-24"
                  value={editorValues?.price}
                  onChange={handlePriceChange}
                  type="number"
                />
              </label>
              <label className="text-center inline-flex items-center">
                Оплачено
                <input
                  className="ml-2 p-2"
                  type="checkbox"
                  checked={editorValues?.paid}
                  onChange={handlePaidChange}
                />
              </label>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                className="uppercase bg-button/40 hover:bg-button transition-colors py-1 px-2 rounded-sm"
                type="submit"
              >
                Сохранить
              </button>
              <button
                onClick={() => {
                  setEditorOpen(false);
                  setEditorValues(null);
                }}
                className="uppercase"
              >
                Отменить
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-scroll max-h-[500px]">
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
                  <TableCell>
                    {new Date(booking.booking_date).toLocaleDateString(
                      "ru-RU",
                      {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                      }
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(booking.booking_date)
                      .toLocaleTimeString()
                      .slice(0, 5)}
                  </TableCell>
                  <TableCell>{booking.masters.name}</TableCell>
                  <TableCell className="max-w-32">
                    {booking.services.label}
                  </TableCell>
                  <TableCell>{booking.client}</TableCell>
                  <TableCell>{booking.price}</TableCell>
                  <TableCell>{booking.paid ? "Да" : "Нет"}</TableCell>
                  <TableCell>{booking.id}</TableCell>
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
  );
};

export default Page;
