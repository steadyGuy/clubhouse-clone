import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';
import router from 'next/router';
import { Room, RoomApi, RoomType } from '../../api/RoomApi'
import axios from '../../core/axios';
import { RootState } from '../store';

interface RoomsState {
  items: Room[]
}

const initialState: RoomsState = {
  items: [],
}

export const fetchCreateRoom = createAsyncThunk(
  'rooms/fetchCreateRoomStatus',
  async (form: { title: string, type: RoomType }) => {
    try {
      return await RoomApi(axios).createRoom(form);
    } catch (error) {
      throw new Error('Ошибка при создании комнаты');
    }
  }
);

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchCreateRoom.fulfilled.type, (state, action: PayloadAction<Room>) => {
        state.items.push(action.payload);
      }).addCase(fetchCreateRoom.rejected.type, (_, action) => {
        console.log(action);
      }).addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
        state.items = action.payload.rooms.items;
      })
});

// Action creators are generated for each case reducer function
export const { setRooms } = roomsSlice.actions;

export const roomsReducer = roomsSlice.reducer;

// {
//   // Add reducers for additional action types here, and handle loading state as needed
//   [fetchCreateRoom.fulfilled.type]: (state, action: PayloadAction<Room>) => {
//     state.items.push(action.payload);
//   },
//     [fetchCreateRoom.rejected.type]: (_, action) => {
//       console.log(action);
//     },
//   },