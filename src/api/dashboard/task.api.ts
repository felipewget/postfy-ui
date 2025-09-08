import dashboardClientApi from "@/providers/axios/dashboard-axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const getTimeAllTeamReport = async () => {
  return dashboardClientApi.get<{
    day: number;
    done_count: number;
    done_minutes: number;
    in_progress_count: number;
    in_progress_minutes: number;
    todo_count: number;
    todo_minutes: number;
  }[]>(`/reports/times`);
};

const getTimeUsersTeamReport = async () => {
  return dashboardClientApi.get(`/reports/times/users`);
};

const getTaskReport = async () => {
  return dashboardClientApi.get(`/reports/tasks`);
};

const getTaskReportByUser = async () => {
  return dashboardClientApi.get(`/reports/tasks/users`);
};

export const useTaskReport = () => {
  return useQuery({
    queryKey: ["task-report"],
    queryFn: async () => {
      const { data } = await getTaskReport();

      return data;
    },
  });
};

export const useTaskReportByUser = () => {
  return useInfiniteQuery({
    queryKey: ["task-report-by-user"],
    queryFn: async ({ pageParam }) => {
      const { data } = await getTaskReportByUser();

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

export const useTimeAllTeamReport = () => {
  return useInfiniteQuery({
    queryKey: ["time-all-team-report"],
    queryFn: async ({ pageParam }) => {
      const { data } = await getTimeAllTeamReport();

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


export const useTimeUsersTeamReport = () => {
  return useInfiniteQuery({
    queryKey: ["time-users-team-report"],
    queryFn: async ({ pageParam }) => {
      const { data } = await getTimeUsersTeamReport();

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
