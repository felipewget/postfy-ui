import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { ListRecordPayload } from "./crud.types";
import axiosApi from "@/providers/axios/axios";
import { AddDocumentByLinkPayload } from "./knowledgement-document.types";

const addMedia = async (accountId: number, payload: any) => {
  return axiosApi.post(`/media-bank/account-${accountId}`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

const listMedias = async (
  accountId: number,
  params?: ListRecordPayload
) => {
  return axiosApi.get(
    `/media-bank/account-${accountId}`,
    { params }
  );
};

export const useAddMedia = (
  accountId: number,
  onSuccess?: (data: any) => void,
  onError?: (data: any) => void
) => {
  return useMutation({
    mutationKey: ["add-document-link"],
    mutationFn: async (
      payload: any //Omit<AddDocumentByLinkPayload, "sourceType">
    ) => {
      const { data } = await addMedia(accountId, payload);

      return data;
    },
    onSuccess,
    onError,
  });
};

export const useListMediaBank = (params: {
  accountId: number;
  params?: ListRecordPayload;
}) => {
  return useInfiniteQuery({
    queryKey: ["list-media-banks", JSON.stringify(params)],
    queryFn: async ({ pageParam }) => {
      const { filters, ...payload } = params.params;

      const mergedPayload = {
        ...payload,
        ...(filters ?? {}),
        lastId: pageParam ?? undefined,
      };

      const { data } = await listMedias(params.accountId, mergedPayload);

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