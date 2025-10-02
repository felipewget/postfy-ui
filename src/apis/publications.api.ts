import { useMutation } from "@tanstack/react-query";
import axiosApi from "@/providers/axios/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ListRecordPayload } from "./crud.types";

const listApprovedPublication = async (
  accountId: number,
  params?: ListRecordPayload
) => {
  return axiosApi.get(
    `/posts/account-${accountId}/approved`,
    { params }
  );
};

export const useListApprovedPublications = (params: {
  accountId: number;
  params?: ListRecordPayload;
}) => {
  return useInfiniteQuery({
    queryKey: ["list-approved-publications", JSON.stringify(params)],
    queryFn: async ({ pageParam }) => {
      const { filters, ...payload } = params.params;

      const mergedPayload = {
        ...payload,
        ...(filters ?? {}),
        lastId: pageParam ?? undefined,
      };

      const { data } = await listApprovedPublication(params.accountId, mergedPayload);

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