
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCertifications = () => {
  return useQuery({
    queryKey: ["certifications"],
    queryFn: async () => {
      console.log("Fetching certifications from Supabase...");
      const { data, error } = await supabase
        .from("certifications")
        .select("*")
        .order("sort_order", { ascending: true });
      
      if (error) {
        console.error("Error fetching certifications:", error);
        throw error;
      }
      
      console.log("Certifications fetched:", data);
      return data;
    },
  });
};
