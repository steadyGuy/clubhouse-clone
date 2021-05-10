import { AxiosInstance } from "axios";
import { GetServerSidePropsContext } from "next";

export const UserApi = (instance: AxiosInstance) => {
  return {
    getMe: async (): Promise<any> => {
      const { data } = await instance.get('/auth/me');
      return data;
    },
  };
};
