import { createClient } from "@/utils/supabase/server";
import { login } from "./actions";
import { redirect } from "next/navigation";
import Container from "@/components/Container";
import Link from "next/link";
import Footer from "./components/Footer";
import TestCredentials from "./components/TestCredentials";

export default async function LoginPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen pt-24 flex flex-col justify-between gap-24">
      <Container className="w-full max-w-96 flex flex-col justify-center items-center gap-2 h-full ">
        <h1 className="mb-6 text-2xl">Вход</h1>
        <form className="w-full flex flex-col gap-2 p-6 items-center bg-button-light shadow-md rounded-sm">
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
            className="mt-4 p-2 bg-gray-200 shadow-sm text-black/80 hover:bg-black hover:text-white w-full"
            formAction={login}
          >
            Войти
          </button>
        </form>
        <Link
          className="text-pink-950/70 hover:text-pink-950/60 mb-16"
          href="/"
        >
          На главную
        </Link>
        <TestCredentials />
      </Container>
      <Container>
        <Footer />
      </Container>
    </div>
  );
}
