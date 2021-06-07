import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';
import router from 'next/router';
import { Room, RoomApi, RoomType } from '../../api/RoomApi'
import axios from '../../core/axios';
import { User } from '../../pages';
import { RootState } from '../types';

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(HYDRATE as any, (state, action: PayloadAction<RootState>) => {
        state.user = action.payload.user.user;
      })
});

// Action creators are generated for each case reducer function
export const { setUserData } = userSlice.actions;

export const userReducer = userSlice.reducer;

// {
//   // Add reducers for additional action types here, and handle loading state as needed
//   [fetchCreateRoom.fulfilled.type]: (state, action: PayloadAction<Room>) => {
//     state.items.push(action.payload);
//   },
//     [fetchCreateRoom.rejected.type]: (_, action) => {
//       console.log(action);
//     },
//   },