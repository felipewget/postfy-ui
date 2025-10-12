import { useMutation } from "@tanstack/react-query";
import axiosApi from "@/providers/axios/axios";
import { CreateAccountPayload } from "./account.types";

const createAccount = async (payload: CreateAccountPayload) => {
    return axiosApi.post('/accounts', payload);
}

export const useCreateAccount = (
  onSuccess?: (data: any) => void,
  onError?: (data: any) => void
) => {
  return useMutation({
    mutationKey: ['create-accounts'],
    mutationFn: async (payload: CreateAccountPayload) => {
      const { data } = await createAccount(payload);

      return data;
    },
    onSuccess,
    onError,
  });
};