"use client";

import Link from "next/link";
import { login } from "../actions";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    await login(formData);

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  return (
    <>
      <h1 className="mb-6 text-2xl">Вход</h1>
      <form
        className="w-full flex outline outline-1 outline-pink-950/20
       flex-col gap-2 p-6 items-center bg-button-light shadow-md rounded-sm"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">E-mail:</label>
        <input
          className="p-2 bg-gray-100 text-black/80 w-full"
          id="email"
          name="email"
          type="email"
          required
        />
        <label htmlFor="password">Пароль:</label>
        <input
          className="p-2 bg-gray-100 text-black/80 w-full"
          id="password"
          name="password"
          type="password"
          required
        />
        <button
          className="mt-4 p-2 bg-gray-200 shadow-sm text-black/80 hover:bg-black
           hover:text-white w-full
           disabled:bg-gray-200 disabled:text-black/30 disabled:hover:text-black/30"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Загрузка..." : "Войти"}
        </button>
      </form>
      <Link className="text-pink-950/70 hover:text-pink-950/60 mb-16" href="/">
        На главную
      </Link>
    </>
  );
};

export default LoginForm;
