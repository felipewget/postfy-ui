import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axiosApi from "@/providers/axios/axios";
import { CampaignPayload } from "./campaign.types";
import { ListRecordPayload } from "./crud.types";

const listCampaign = async (
  accountId: number,
  params?: ListRecordPayload
) => {
  return axiosApi.get(
    `/campaigns/account-${accountId}`,
    { params }
  );
};


const addCampaign = async (accountId: number, payload: CampaignPayload) => {
  return axiosApi.post(`/campaigns/account-${accountId}`, payload);
};

export const useAddCampaign = (
  params: {
    accountId: number;
  },
  onSuccess?: (data: any) => void,
  onError?: (data: any) => void
) => {
  return useMutation({
    mutationKey: ["add-campaign"],
    mutationFn: async (payload: CampaignPayload) => {
      const { data } = await addCampaign(params.accountId, payload);

      return data;
    },
    onSuccess,
    onError,
  });
};

export const useListCampaign = (params: {
  accountId: number;
  params?: ListRecordPayload;
}) => {
  return useInfiniteQuery({
    queryKey: ["list-campaings", JSON.stringify(params)],
    queryFn: async ({ pageParam }) => {
      const { filters, ...payload } = params.params;

      const mergedPayload = {
        ...payload,
        ...(filters ?? {}),
        lastId: pageParam ?? undefined,
      };

      const { data } = await listCampaign(params.accountId, mergedPayload);

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