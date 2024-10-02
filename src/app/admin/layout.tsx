import Container from "@/components/Container";
import Header from "./components/Header";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "./components/Sidebar";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <div className="bg-button h-auto min-h-screen">
      <Container className="bg-button">
        <Header user={data.user} />
        <div className="mb-12 mt-20 flex">
          <Sidebar />
          <div className="grainy-light w-full h-full p-4 md:ml-32 rounded-lg">
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Layout;
