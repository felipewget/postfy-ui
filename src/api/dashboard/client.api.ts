import dashboardClientApi from "@/providers/axios/dashboard-axios";
import { useInfiniteQuery } from "@tanstack/react-query";

export const getHourProfitByClient = async (params: any) => {
  return dashboardClientApi.get<{ params: any }>(
    `/reports/clients/hour-and-profit`,
    {
      params,
    }
  );
};

export const useGetHourProfitByClient = (params?: {
    search: string;
}) => {
  return useInfiniteQuery({
    queryKey: ["report-hour-profit-by-client", JSON.stringify(params)],
    queryFn: async ({ pageParam }) => {
      
      const { data } = await getHourProfitByClient(params);

      return data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) return undefined;

      const lastItem = lastPage[lastPage.length - 1];
      return lastItem.id;
    },
    initialPageParam: undefined,
  });
};