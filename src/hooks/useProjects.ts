
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      console.log("Fetching projects from Supabase...");
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true });
      
      if (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }
      
      console.log("Projects fetched:", data);
      return data;
    },
  });
};
