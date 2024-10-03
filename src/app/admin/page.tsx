"use client";

import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Page() {
  const [monthlyGoal, setMonthlyGoal] = useState<string>("");
  const [editGoal, setEditGoal] = useState(false);
  const [newGoal, setNewGoal] = useState<string>("");
  const [income, setIncome] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(true);

  // TODO: добавить функцию просмотра данных за прошлые периоды

  const firstDayOfCurrentMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
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

  const loadGoalAndIncome = async () => {
    const fetchedGoal = await fetchMonthlyGoal(firstDayOfCurrentMonth);
    setMonthlyGoal(fetchedGoal.toString());
    fetchIncome(firstDayOfCurrentMonth, currentDate);
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
    <div className="p-2 sm:p-4">
      <h1 className="mb-4">Прибыль за период - {currentPeriod}</h1>
      <hr className="mb-6 h-px border-t-0 w-64 bg-transparent bg-gradient-to-r from-black to-transparent opacity-35" />

      <div className="flex gap-2 items-center mb-4">
        <p className="uppercase">Цель: {monthlyGoal} рублей</p>
        <button
          className={cn(
            buttonVariants({ size: "sm" }),
            "uppercase hover:bg-slate-700"
          )}
          onClick={() => setEditGoal(!editGoal)}
        >
          Изменить
        </button>
      </div>
      {editGoal && (
        <div className="mb-4 flex flex-col gap-2 sm:flex-row">
          <input
            type="number"
            value={newGoal}
            min={1000}
            onChange={(e) => setNewGoal(e.target.value)}
            className="border py-1 px-2 rounded-sm mr-2"
            placeholder="новая цель"
          />
          <button
            onClick={() => handleGoalUpdate(newGoal)}
            className={cn(
              buttonVariants({ size: "sm" }),
              "mr-2 bg-amber-200 text-black uppercase hover:bg-amber-300"
            )}
          >
            Сохранить
          </button>
          <button
            onClick={() => setEditGoal(false)}
            className={cn(
              buttonVariants({ size: "sm", variant: "ghost" }),
              "uppercase"
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
            <h2 className="my-6 text-base uppercase">
              Прибыль за месяц:{" "}
              <span className="text-2xl font-black">{income}</span> рублей
            </h2>
            {progress >= 100 && (
              <p className="text-green-500">Вы достигли цели!</p>
            )}
            <p className="text-muted-foreground">
              Ваша прибыль составляет {Math.round(progress)}% от цели на период.
            </p>
          </div>

          <Progress className="h-6 bg-slate-200" value={progress} />
        </div>
      )}
    </div>
  );
}
