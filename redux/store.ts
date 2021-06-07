import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { roomsReducer } from './slices/roomsSlice';
import { userReducer } from './slices/userSlice';
import { RootState } from './types';

// const rootReducer = combineReducers({
//   rooms: roomsReducer,
// });

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    user: userReducer,
  },
});

export const makeStore = (): Store<RootState> => {
  return store;
}

export const wrapper = createWrapper(makeStore, { debug: true });

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch