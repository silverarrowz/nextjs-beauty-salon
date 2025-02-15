import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Container from "@/components/Container";
import Footer from "./components/Footer";
import TestCredentials from "./components/TestCredentials";
import LoginForm from "./components/LoginForm";

export default async function LoginPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen pt-24 flex flex-col justify-between gap-24">
      <Container
        className="w-full max-w-96 flex flex-col 
      justify-center items-center gap-2 h-full "
      >
        <LoginForm />
      </Container>
      <Footer />
    </div>
  );
}
