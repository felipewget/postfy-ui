import { useMutation, useQuery } from "@tanstack/react-query";
import axiosApi from "@/providers/axios/axios";
import { CreateAccountPayload } from "./account.types";

const createAccount = async (payload: CreateAccountPayload) => {
  return axiosApi.post("/accounts", payload);
};

const updateSettings = async (accountId: number, payload: any) => {
  return axiosApi.patch(`/accounts/${accountId}/settings`, payload);
};

const getAccountById = async (accountId: number) => {
  return axiosApi.get(`/accounts/${accountId}`);
};

export const useCreateAccount = (
  onSuccess?: (data: any) => void,
  onError?: (data: any) => void
) => {
  return useMutation({
    mutationKey: ["create-accounts"],
    mutationFn: async (payload: CreateAccountPayload) => {
      const { data } = await createAccount(payload);

      return data;
    },
    onSuccess,
    onError,
  });
};

export const useUpdateSettings = (
  params: { accountId: number },
  onSuccess?: (params: any) => void,
  onError?: (data?: any) => void
) => {
  return useMutation({
    mutationKey: ["account-id", JSON.stringify(params)],
    mutationFn: async (payload: any) => {
      const { data } = await updateSettings(params.accountId, payload);

      return data;
    },
    onSuccess,
    onError,
  });
};

export const useGetAccountById = (params: { accountId: number }) => {
  return useQuery({
    queryKey: ["get-account", params.accountId],
    queryFn: async () => {
      const { data } = await getAccountById(params.accountId);

      return data;
    },
  });
};
