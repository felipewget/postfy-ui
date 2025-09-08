import dashboardClientApi from "@/providers/axios/dashboard-axios";
import { useQuery } from "@tanstack/react-query";

const getQuoteReport = async () => {
  return dashboardClientApi.get(`/reports/quotes`);
};

export const useQuoteReport = () => {
   return useQuery({
    queryKey: ['quote-report'],
    queryFn: async () => {
      const { data } = await getQuoteReport();
     
      return data;
    },
  });
}