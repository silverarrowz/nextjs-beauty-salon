import Container from "@/components/Container";
import Link from "next/link";
import Footer from "../login/components/Footer";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Container className="text-center mt-16 mb-72 flex flex-col justify-between">
        <div className="">
          <h1 className="mb-4 text-xl">Ошибка</h1>
          <p className="mb-4 text-black/70">Неправильный логин или пароль</p>
          <div className="flex flex-col">
            <Link className="text-pink-800" href="/">
              Вернуться на главную страницу
            </Link>
            <Link className="text-pink-800" href="/login">
              Вернуться ко входу
            </Link>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
