import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axiosApi from "@/providers/axios/axios";
import {
  AddDocumentByContentPayload,
  AddDocumentByDocumentPayload,
  AddDocumentByLinkPayload,
} from "./knowledgement-document.types";
import { ListRecordPayload } from "./crud.types";

const listDocuments = async (
  accountId: number,
  sourceType: "knowledment" | "brain",
  params?: ListRecordPayload
) => {
  return axiosApi.get(
    `/knowledgment-document/account-${accountId}/${sourceType}`,
    { params }
  );
};

const addDocumentByLink = async (
  accountId: number,
  payload: AddDocumentByLinkPayload
) => {
  return axiosApi.post(
    `/knowledgment-document/account-${accountId}/link`,
    payload
  );
};

const addDocumentByFile = async (
  accountId: number,
  payload: AddDocumentByDocumentPayload
) => {
  return axiosApi.post(
    `/knowledgment-document/account-${accountId}/document`,
    payload,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

const addDocumentByContent = async (
  accountId: number,
  payload: AddDocumentByContentPayload
) => {
  return axiosApi.post(
    `/knowledgment-document/account-${accountId}/content`,
    payload
  );
};

export const useAddDocumentByLink = (
  params: {
    sourceType: "knowledment" | "brain";
    accountId: number;
  },
  onSuccess?: (data: any) => void,
  onError?: (data: any) => void
) => {
  return useMutation({
    mutationKey: ["add-document-link"],
    mutationFn: async (
      payload: Omit<AddDocumentByLinkPayload, "sourceType">
    ) => {
      const { data } = await addDocumentByLink(params.accountId, {
        sourceType: params.sourceType,
        ...payload,
      });

      return data;
    },
    onSuccess,
    onError,
  });
};

export const useAddDocumentByContent = (
  params: {
    sourceType: "knowledment" | "brain";
    accountId: number;
  },
  onSuccess?: (data: any) => void,
  onError?: (data: any) => void
) => {
  return useMutation({
    mutationKey: ["add-document-by-content"],
    mutationFn: async (
      payload: Omit<AddDocumentByContentPayload, "sourceType">
    ) => {
      const { data } = await addDocumentByContent(params.accountId, {
        sourceType: params.sourceType,
        ...payload,
      });

      return data;
    },
    onSuccess,
    onError,
  });
};

export const useAddDocumentByDocument = (
  params: {
    sourceType: "knowledment" | "brain";
    accountId: number;
  },
  onSuccess?: (data: any) => void,
  onError?: (data: any) => void
) => {
  return useMutation({
    mutationKey: ["add-document-by-document"],
    mutationFn: async (
      payload: Omit<AddDocumentByDocumentPayload, "sourceType">
    ) => {
      const { data } = await addDocumentByFile(params.accountId, {
        sourceType: params.sourceType,
        ...payload,
      });

      return data;
    },
    onSuccess,
    onError,
  });
};

export const useListDocuments = (params: {
  accountId: number;
  sourceType: "knowledment" | "brain",
  params?: ListRecordPayload;
}) => {
  return useInfiniteQuery({
    queryKey: ["list-documents", JSON.stringify(params)],
    queryFn: async ({ pageParam }) => {
      const { filters, ...payload } = params.params;

      const mergedPayload = {
        ...payload,
        ...(filters ?? {}),
        lastId: pageParam ?? undefined,
      };

      const { data } = await listDocuments(params.accountId, params.sourceType, mergedPayload);

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
