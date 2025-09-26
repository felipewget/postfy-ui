import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axiosApi from "@/providers/axios/axios";
import {
  AddDocumentByContentPayload,
  AddDocumentByDocumentPayload,
  AddDocumentByLinkPayload,
} from "./knowledgement-document.types";
import { ListRecordPayload } from "./crud.types";
import { CreateTicketPayload } from "./ticket.types";

const getTickets = async (accountId: number, params?: ListRecordPayload) => {
  return axiosApi.get(`/tickets/account-${accountId}`, { params });
};

const addTicket = async (accountId: number, payload: CreateTicketPayload) => {
  return axiosApi.post(`/tickets/account-${accountId}`, payload);
};

export const useAddTicket = (
  params: {
    accountId: number;
  },
  onSuccess?: (data: any) => void,
  onError?: (data: any) => void
) => {
  return useMutation({
    mutationKey: ["add-ticket"],
    mutationFn: async (payload: CreateTicketPayload) => {
      const { data } = await addTicket(params.accountId, payload);

      return data;
    },
    onSuccess,
    onError,
  });
};

export const useGetTickets = (params: {
  accountId: number;
  params?: ListRecordPayload;
}) => {
  return useInfiniteQuery({
    queryKey: ["list-ticket", JSON.stringify(params)],
    queryFn: async ({ pageParam }) => {
      const { filters, ...payload } = params.params;

      const mergedPayload = {
        ...payload,
        ...(filters ?? {}),
        lastId: pageParam ?? undefined,
      };

      const { data } = await getTickets(params.accountId, mergedPayload);

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
