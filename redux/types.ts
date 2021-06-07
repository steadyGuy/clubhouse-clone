import { RoomsState } from './slices/roomsSlice';
import { UserState } from './slices/userSlice';

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = {
  user: UserState,
  rooms: RoomsState,
}