import { createClient } from "@/utils/supabase/server";
import { Service } from "../types";

const getServices = async (): Promise<Service[]> => {
  const supabase = createClient();

  const { data: services, error } = await supabase.from("services").select(`
      *,
      masters (*)
      `);

  if (error) {
    console.log(error);
  }

  if (!services) {
    return [];
  }

  return services;
};

export default getServices;
