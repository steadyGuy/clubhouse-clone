import { GetServerSidePropsContext } from "next";
import nookies from 'nookies';
import axios from "axios";
import { UserApi } from "./UserApi";
import { RoomApi } from "./RoomApi";

// type ApiReturnType = 

export const Api = (ctx: any) => {
  const cookies = nookies.get(ctx);
  const { token } = cookies;
  const instance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
      Authorization: 'Bearer ' + token,
    }
  });

  return {
    ...UserApi(instance),
    ...RoomApi(instance)
  }
}
