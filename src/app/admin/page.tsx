"use client";

import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Page() {
  const [monthlyGoal, setMonthlyGoal] = useState<string>("");
  const [editGoal, setEditGoal] = useState(false);
  const [newGoal, setNewGoal] = useState<string>("");
  const [income, setIncome] = useState<number>(0);

  const [progress, setProgress] = useState<number>(0);

  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(true);

  type MastersIncome = {
    master: string;
    income: number;
  }[];

  const [mastersSumIncome, setMastersSumIncome] =
    useState<MastersIncome | null>([]);

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  // TODO: добавить функцию просмотра данных за прошлые периоды

  const firstDayOfCurrentMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  const lastDayOfCurrentMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  const currentDate = new Date();

  const currentPeriod = new Intl.DateTimeFormat("ru-RU", {
    month: "long",
    year: "numeric",
  }).format(new Date());

  const fetchMonthlyGoal = async (startDate: Date): Promise<number> => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("goals")
      .select("goal")
      .eq("period_start", startDate.toISOString().split("T")[0]);

    setIsLoading(false);
    if (error) {
      console.log(error);
      return 120000;
    }
    if (data?.length === 0) {
      return 120000;
    }
    return data![0].goal;
  };

  const fetchIncome = async (startDate: Date, endDate: Date) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select(`price`)
      .eq("paid", true)
      .gte("booking_date", `${startDate.toISOString()}`)
      .lt("booking_date", `${endDate.toISOString()}`);

    let periodIncome = 0;
    if (data?.length! > 0) {
      data?.forEach((booking) => (periodIncome += booking.price));
    }

    setIncome(periodIncome);
    setIsLoading(false);
  };

  const fetchMastersIncome = async (startDate: Date, endDate: Date) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select(`price, masters(name)`)
      .eq("paid", true)
      .gte("booking_date", `${startDate.toISOString()}`)
      .lt("booking_date", `${endDate.toISOString()}`);
    setIsLoading(false);

    // TODO: вывести сумму дохода для каждого мастера за текущий период

    let mastersIncome: { master: string; income: number }[] = [];
    if (data?.length! > 0) {
      data?.forEach((booking) => {
        const masterIncome = mastersIncome.find(
          (m) => m.master === booking.masters.name
        );
        if (masterIncome) {
          masterIncome.income += booking.price;
        } else {
          mastersIncome.push({
            master: booking.masters.name,
            income: booking.price,
          });
        }
      });
    }

    return mastersIncome;
  };

  const loadGoalAndIncome = async () => {
    const fetchedGoal = await fetchMonthlyGoal(firstDayOfCurrentMonth);
    setMonthlyGoal(fetchedGoal.toString());
    fetchIncome(firstDayOfCurrentMonth, lastDayOfCurrentMonth);
    const mastersIncome = await fetchMastersIncome(
      firstDayOfCurrentMonth,
      lastDayOfCurrentMonth
    );
    const mastersIncomeDescending = mastersIncome.sort(
      (a, b) => b.income - a.income
    );
    setMastersSumIncome(mastersIncomeDescending);
  };

  useEffect(() => {
    loadGoalAndIncome();
  }, []);

  const handleGoalUpdate = async (newGoal: string) => {
    const { data, error } = await supabase.from("goals").upsert({
      period_start: firstDayOfCurrentMonth.toISOString().split("T")[0],
      goal: Number(newGoal),
    });

    setMonthlyGoal(newGoal);
    setEditGoal(false);
  };

  // const progress = (income / Number(monthlyGoal)) * 100;

  useEffect(() => {
    if (!isLoading) {
      const calculatedProgress = (income / Number(monthlyGoal)) * 100;

      let currentProgress = 0;
      const step = 1;
      const interval = 10;

      const animateProgress = setInterval(() => {
        currentProgress += step;
        if (currentProgress >= calculatedProgress) {
          setProgress(calculatedProgress);
          clearInterval(animateProgress);
        } else {
          setProgress(currentProgress);
        }
      }, interval);
    }
  }, [income, monthlyGoal, isLoading]);

  return (
    <div className="p-2 sm:p-4 flex flex-col lg:flex-row gap-10">
      <div className="bg-zinc-50 p-8 flex-grow min-w-[352px]">
        <h1 className="mb-4">Прибыль за период - {currentPeriod}</h1>
        <hr className="mb-6 h-px border-t-0 w-64 bg-transparent bg-gradient-to-r from-black to-transparent opacity-35" />

        <div className="flex gap-2 items-center mb-8">
          <p className="uppercase text-sm">
            Цель: <span className="font-bold">{Number(monthlyGoal)} ₽</span>
          </p>
          <button
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-sm text-muted-foreground"
            )}
            onClick={() => setEditGoal(!editGoal)}
          >
            Изменить
          </button>
        </div>
        {editGoal && (
          <div className="mb-8 flex flex-col gap-2 xl:flex-row w-full">
            <input
              type="number"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              className="border py-2 px-3 xl:flex-grow"
              placeholder="новая цель"
            />
            <button
              onClick={() => handleGoalUpdate(newGoal)}
              className={cn(
                buttonVariants(),
                "py-2 px-3 h-10 rounded-none bg-amber-200 text-black text-base hover:bg-amber-300"
              )}
              disabled={!newGoal || newGoal === "" || Number(newGoal) < 1000}
            >
              Сохранить
            </button>
            <button
              onClick={() => setEditGoal(false)}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "rounded-none text-base py-2 px-3 h-10 text-muted-foreground"
              )}
            >
              Отменить
            </button>
          </div>
        )}

        {isLoading && <p>Загрузка...</p>}
        {!isLoading && (
          <div>
            <div className="mb-2 text-sm">
              <div className="mb-8 flex items-baseline justify-between">
                <h2 className="uppercase text-sm">Прибыль за месяц: </h2>
                <p className="text-2xl md:text-4xl lg:text-6xl transition font-black">
                  {" "}
                  {income}&nbsp;₽
                </p>
              </div>

              {progress >= 100 && (
                <p className="text-green-500">Вы достигли цели!</p>
              )}
              <p className="text-muted-foreground">
                Ваша прибыль составляет {Math.round(progress)}% от цели на
                период.
              </p>
            </div>

            <Progress className="h-6 bg-slate-200" value={progress} />
          </div>
        )}
      </div>

      {mastersSumIncome!.length > 0 && (
        <div className="items-center flex flex-col">
          <h2 className="mb-6 flex items-center gap-2.5">
            <FaCrown className="text-amber-100" size={28} />{" "}
            <span className="uppercase text-base lg:text-2xl transition-all">
              Топ&nbsp;мастеров&nbsp;месяца
            </span>
          </h2>
          <div className="px-6 py-8 bg-zinc-50 flex flex-col items-center">
            <table className="bg-white">
              <thead>
                <tr className="uppercase">
                  <th className="border-slate-400 p-3 text-sm text-left"></th>
                  <th className="border-slate-400 p-3 text-sm text-left">
                    Мастер
                  </th>
                  <th className="border-slate-400 p-3 text-sm text-left">
                    Доход (руб.)
                  </th>
                </tr>
              </thead>
              <tbody>
                {mastersSumIncome!.map((master, index) => (
                  <tr
                    key={index}
                    className="hover:bg-button-light first:bg-amber-200 transition-colors even:bg-amber-50"
                  >
                    <td className="border-slate-400 px-3 py-2 text-sm text-left">
                      {index + 1}
                    </td>
                    <td className="border-slate-400 px-3 py-2 text-sm text-left">
                      {master.master}
                    </td>
                    <td className="border-slate-400 px-3 py-2 text-base text-right">
                      {master.income}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
