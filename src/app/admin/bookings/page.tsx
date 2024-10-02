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

  // Записи будут за период (месяц), т.е. с первого дня месяца по сегодняшний
  // Можно добавить функцию выбора периода (предыдущий месяц, любой другой месяц, год и т.д.)

  const firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  const currentDate = new Date();

  // const currentPeriodDisplay = new Intl.DateTimeFormat("ru-RU", {
  //   month: "long",
  //   year: "numeric",
  // }).format(currentDate);

  const fetchBookings = async (startDate: Date, endDate: Date) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select(
        `id, booking_date, client, price, paid, masters(name), services(label)`
      )
      .gte("booking_date", `${startDate.toISOString()}`)
      .lt("booking_date", `${endDate.toISOString()}`)
      .limit(20)

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
    <div className="px-4">
      <div className="flex items-baseline justify-between mb-4">
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
          <div className="flex gap-2">
            <button
              className="text-sm hover:text-muted-foreground"
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
              className="text-sm leading-none border p-2 bg-white hover:bg-zinc-100 rounded-sm"
              onClick={handlePeriodSelectSave}
            >
              Показать записи за выбранный период
            </button>
          </div>
        )}
      </div>

      {periodSelectOpen && (
        <DateRangePicker
          className="max-w-[600px] mb-4"
          locale={ru}
          months={2}
          weekStartsOn={1}
          moveRangeOnFirstSelection={false}
          onChange={(item) => setSelectedPeriod([item.selection])}
          ranges={selectedPeriod}
          direction={"horizontal"}
          showPreview={true}
        />
      )}
      {editorOpen && (
        <div className="rounded-md shadow-sm mb-4 p-2">
          <form
            onSubmit={handleSubmit}
            className="flex gap-4 items-center tracking-tight text-sm"
          >
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
            <button
              className="bg-button/40 hover:bg-button transition-colors py-1 px-2 rounded-sm"
              type="submit"
            >
              Сохранить
            </button>
            <button
              onClick={() => {
                setEditorOpen(false);
                setEditorValues(null);
              }}
            >
              Отменить
            </button>
          </form>
        </div>
      )}
      <div className="overflow-scroll max-h-[500px]">
        <table className="w-full text-left">
          <thead>
            <tr>
              <TableCell className="font-normal uppercase text-sm"></TableCell>
              <TableCell className="font-normal uppercase text-sm">
                Дата
              </TableCell>
              <TableCell className="font-normal uppercase text-sm">
                Время
              </TableCell>
              <TableCell className="font-normal uppercase text-sm">
                Мастер
              </TableCell>
              <TableCell className="font-normal uppercase text-sm">
                Услуга
              </TableCell>
              <TableCell className="font-normal uppercase text-sm">
                Клиент
              </TableCell>
              <TableCell className="font-normal uppercase text-sm">
                Цена, руб.
              </TableCell>
              <TableCell className="font-normal uppercase text-sm">
                Оплачено
              </TableCell>
              <TableCell>ID</TableCell>
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
