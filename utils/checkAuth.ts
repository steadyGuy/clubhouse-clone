import { AnyAction, Store } from '@reduxjs/toolkit';
import { GetServerSidePropsContext } from 'next-redux-wrapper';

import { Api } from '../api'
import { User } from '../pages';
import { setUserData } from '../redux/slices/userSlice';
import { RootState } from '../redux/types';

export const checkAuth = async (ctx: GetServerSidePropsContext &
{ store: Store<RootState, AnyAction> }): Promise<User | null> => {
  try {
    const user = await Api(ctx).getMe();
    console.log('useruseruser', user)
    ctx.store.dispatch(setUserData(user));
    return user;
  } catch (error) {
    console.log(error)
    return null;
  }
}