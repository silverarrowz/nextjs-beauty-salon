import { createClient } from "@/utils/supabase/server";
import { login } from "./actions";
import { redirect } from "next/navigation";
import Container from "@/components/Container";
import Link from "next/link";
import Footer from "./components/Footer";

export default async function LoginPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/admin");
  }

  return (
    <div className="h-full">
      <Container className="max-w-96 flex flex-col justify-center items-center gap-2 h-full">
        <form className="w-full flex flex-col gap-2 p-6 items-center bg-button-light shadow-md rounded-sm">
          <label htmlFor="email">E-mail:</label>
          <input
            className="p-2 bg-zinc-100 text-black/80 w-full"
            id="email"
            name="email"
            type="email"
            required
          />
          <label htmlFor="password">Пароль:</label>
          <input
            className="p-2 bg-zinc-100 text-black/80 w-full"
            id="password"
            name="password"
            type="password"
            required
          />
          <button
            className="mt-4 p-2 bg-zinc-200 shadow-sm text-black/80 hover:bg-black hover:text-white w-full"
            formAction={login}
          >
            Войти
          </button>
        </form>
        <Link className="text-black/60 hover:text-black/50" href="/">
          На главную
        </Link>
      </Container>
      <Container>
        <Footer />
      </Container>
    </div>
  );
}
