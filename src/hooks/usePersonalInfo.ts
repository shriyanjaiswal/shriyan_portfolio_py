
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePersonalInfo = () => {
  return useQuery({
    queryKey: ["personal-info"],
    queryFn: async () => {
      console.log("Fetching personal info from Supabase...");
      const { data, error } = await supabase
        .from("personal_info")
        .select("*")
        .single();
      
      if (error) {
        console.error("Error fetching personal info:", error);
        throw error;
      }
      
      console.log("Personal info fetched:", data);
      return data;
    },
  });
};
