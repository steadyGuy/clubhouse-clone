import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../redux/types';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;