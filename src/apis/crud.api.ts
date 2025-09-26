import dashboardClientApi from "@/providers/axios/axios";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import {
  CreateRecordPayload,
  ListRecordPayload,
  UpdateRecordPayload,
} from "./crud.types";

const listRecords = async (entity: string, params?: ListRecordPayload) => {
  return dashboardClientApi.get(`/${entity}`, { params });
};

const createRecord = async (entity: string, payload: CreateRecordPayload) => {
  return dashboardClientApi.post(`/${entity}`, payload);
};

const updateRecord = async (
  entity: string,
  recordId: number,
  payload: UpdateRecordPayload
) => {
  return dashboardClientApi.patch(`/${entity}/${recordId}`, payload);
};

const deleteRecord = async (entity: string, recordId: number) => {
  return dashboardClientApi.delete(`/${entity}/${recordId}`);
};

export const useList = (params: {
  entity: string;
  params?: ListRecordPayload;
}) => {
  return useInfiniteQuery({
    queryKey: ["crud-list-" + params.entity, JSON.stringify(params)],
    queryFn: async ({ pageParam }) => {
      const {filters, ...payload} = params.params;

      const mergedPayload = {
        ...payload,
        ...(filters ?? {}),
        lastId: pageParam ?? undefined,
      };

      const { data } = await listRecords(params.entity, mergedPayload);

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

export const useCreate = (
  params: { entity: string },
  onSuccess?: (params: any) => void,
  onError?: (data?: any) => void
) => {
  return useMutation({
    mutationKey: ["crud-create", JSON.stringify(params)],
    mutationFn: async (payload: CreateRecordPayload) => {
      const { data } = await createRecord(params.entity, payload);

      return data;
    },
    onSuccess,
    onError,
  });
};

export const useUpdate = (
  params: { entity: string; recordId: number; },
  onSuccess?: (params: any) => void,
  onError?: (data?: any) => void
) => {
  return useMutation({
    mutationKey: ["crud-update", JSON.stringify(params)],
    mutationFn: async ( payload: UpdateRecordPayload) => {
      const { data } = await updateRecord(
        params.entity,
        params.recordId,
        payload
      );

      return data;
    },
    onSuccess,
    onError,
  });
};

export const useDelete = (
  params: { entity: string; recordId: number },
  onSuccess?: (params: any) => void,
  onError?: (data?: any) => void
) => {
  return useMutation({
    mutationKey: ["crud-delete", JSON.stringify(params)],
    mutationFn: async () => {
      const { data } = await deleteRecord(params.entity, params.recordId);

      return data;
    },
    onSuccess,
    onError,
  });
};
