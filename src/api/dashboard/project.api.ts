import dashboardClientApi from "@/providers/axios/dashboard-axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const getProjectById = async (id: number) => {
  return dashboardClientApi.get(`/projects/${id}`);
};

const reportProjectByClients = async (params: any) => {
  return dashboardClientApi.get<
    {
      client_id: number;
      client_name: string;
      project_count: number;
    }[]
  >(`/reports/clients/projects-by-client`, {
    params,
  });
};

const getGeneralStatusesReport = () => {
  return dashboardClientApi.get<{
    minutes: number;
    minutes_done: number;
    minutes_in_progress: number;
    minutes_todo: number;
    tasks: number;
    tasks_done: number;
    tasks_in_progress: number;
    tasks_todo: number;
  }>(`/reports/projects`);
};

const getCategoriesStatusesReport = () => {
  return dashboardClientApi.get<
    {
      category_id: 2;
      category_name: string;
      minutes: number;
      minutes_done: number;
      tasks_count: number;
    }[]
  >(`/reports/projects/categories`);
};

export const useReportProjectByClients = (params?: { search: string }) => {
  return useInfiniteQuery({
    queryKey: ["report-project-by-client", JSON.stringify(params)],
    queryFn: async ({ pageParam }) => {
      const { data } = await reportProjectByClients(params);

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

export const useGeneralStatusesReport = () => {
  return useQuery({
    queryKey: ["project-general-statuses"],
    queryFn: async () => {
      const { data } = await getGeneralStatusesReport();

      return data;
    },
  });
};

export const useGetCategoriesStatusesReport = (params?: { search: string }) => {
  return useInfiniteQuery({
    queryKey: ["category-status-report", JSON.stringify(params)],
    queryFn: async ({ pageParam }) => {
      const { data } = await getCategoriesStatusesReport();

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

export const useGetProjectById = (id: number) => {
  return useQuery({
    queryKey: ["project-by-id", id],
    queryFn: async () => {
      const { data } = await getProjectById(id);

      return data;
    },
  });
};
