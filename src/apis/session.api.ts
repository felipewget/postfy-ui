import { useMutation } from "@tanstack/react-query";
import axiosApi from "@/providers/axios/axios";
import { CreateSessionPayload } from "./session.api.types";

const createSession = async (payload: CreateSessionPayload) => {
    return axiosApi.post('/sessions', payload);
}

export const useCreateSession = (
  onSuccess?: (data: any) => void,
  onError?: (data: any) => void
) => {
  return useMutation({
    mutationKey: ['create-session'],
    mutationFn: async (payload: CreateSessionPayload) => {
      const { data } = await createSession(payload);

      return data;
    },
    onSuccess,
    onError,
  });
};