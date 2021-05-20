import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { roomsReducer } from './slices/roomsSlice';

const rootReducer = combineReducers({
  rooms: roomsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (): Store<RootState> => {
  return configureStore({
    reducer: rootReducer,
  });
}

export const wrapper = createWrapper(makeStore, { debug: true });