
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useJourneyTimeline = () => {
  return useQuery({
    queryKey: ["journey-timeline"],
    queryFn: async () => {
      console.log("Fetching journey timeline from Supabase...");
      const { data, error } = await supabase
        .from("journey_timeline")
        .select("*")
        .order("sort_order", { ascending: true });
      
      if (error) {
        console.error("Error fetching journey timeline:", error);
        throw error;
      }
      
      console.log("Journey timeline fetched:", data);
      return data;
    },
  });
};
