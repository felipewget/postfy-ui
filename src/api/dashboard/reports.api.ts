import dashboardClientApi from "@/providers/axios/dashboard-axios";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

const getQuoteReport = async () => {
  return dashboardClientApi.get(`/reports/quotes`);
};

const listReportTimeByUsers = async () => {
    console.log('aaaaaaaaa')
  return dashboardClientApi.get(`/reports/time/users`);
};

const listReportTimeAll = async () => {
  return dashboardClientApi.get(`/reports/time/all`);
};

export const useListReportTimeByUsers = (params: { params?: any }) => {
  return useInfiniteQuery({
    queryKey: ["time-by-users"],
    queryFn: async ({ pageParam }) => {
      const { data } = await listReportTimeByUsers();

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

export const useListReportTimeByAll = (params: { params?: any }) => {
  return useInfiniteQuery({
    queryKey: ["time-by-users-all"],
    queryFn: async ({ pageParam }) => {
      const { data } = await listReportTimeAll();

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

export const useQuoteReport = () => {
   return useQuery({
    queryKey: ['quote-report'],
    queryFn: async () => {
      console.log('aaaaaaa')
      const { data } = await getQuoteReport();
     
      return data;
    },
  });
}