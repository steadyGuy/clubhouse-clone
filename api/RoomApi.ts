import { AxiosInstance } from "axios";

export interface Room {
  title: string;
  listenersCount: number;
  speakers: any;
  id: number;
}

export type RoomType = 'open' | 'social' | 'closed';

export const RoomApi = (instance: AxiosInstance) => {
  return {
    getAllRooms: async (): Promise<Room[]> => {
      const { data } = await instance.get('/rooms');
      return data;
    },
    getRoom: async (id: number): Promise<Room> => {
      const { data } = await instance.get(`/rooms/${id}`);
      return data;
    },
    createRoom: async (form: { title: string, type: RoomType }): Promise<Room> => {
      const { data } = await instance.post(`/rooms/create`, form);
      return data;
    },
    deleteRoom: async (id: number): Promise<void> => {
      await instance.delete(`/rooms/${id}`);
    },
  };
};
