"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaCheck, FaRegCopy } from "react-icons/fa";

const TestCredentials = () => {
  const [copied, setCopied] = useState({ login: false, password: false });

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied({ ...copied, [field]: true });

      setTimeout(() => setCopied({ ...copied, [field]: false }), 2000);
    });
  };

  const login = "demo-admin@test.com";
  const password = "1234abcd";

  return (
    <div>
      <h2 className="text-pink-950/70 text-center mb-3 text-sm">
        Тестовые данные для входа:
      </h2>
      <div className="text-center bg-gray-50 p-6 rounded-sm">
        <label
          onClick={() => handleCopy(login, "login")}
          className="text-pink-950/70 mb-2 block"
        >
          E-mail
        </label>
        <div className="mb-4 flex items-center relative">
          <input
            className="p-2 shadow-sm mr-2"
            type="text"
            id="login"
            value={login}
            readOnly
          />

          <p
            className={cn(
              `text-pink-900 text-xs bg-white p-1 border
               absolute -right-8 -top-6 transition-all duration-200 opacity-0`,
              {
                "opacity-100": copied.login,
              }
            )}
          >
            Скопировано!
          </p>

          <button onClick={() => handleCopy(login, "login")}>
            {copied.login ? (
              <FaCheck className="text-pink-900" />
            ) : (
              <FaRegCopy className="text-pink-950/70" />
            )}
          </button>
        </div>
        <label
          onClick={() => handleCopy(password, "password")}
          className="text-pink-950/70 mb-2 block"
        >
          Пароль
        </label>
        <div className="flex items-center relative">
          <input
            className="p-2 shadow-sm mr-2"
            type="text"
            id="password"
            value={password}
            readOnly
          />
          <p
            className={cn(
              `text-pink-900 text-xs bg-white p-1 border
               absolute -right-8 -top-6 transition-all duration-200 opacity-0`,
              {
                "opacity-100": copied.password,
              }
            )}
          >
            Скопировано!
          </p>

          <button onClick={() => handleCopy(password, "password")}>
            {copied.password ? (
              <FaCheck className="text-pink-900" />
            ) : (
              <FaRegCopy className="text-pink-950/70" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestCredentials;
