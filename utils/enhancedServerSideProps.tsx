import { AnyAction, Store } from '@reduxjs/toolkit';
import { GetServerSidePropsContext } from 'next-redux-wrapper';
import { wrapper } from '../redux/store';
import { RootState } from '../redux/types';
import { checkAuth } from './checkAuth';


export const enhancedServerSideProps = (callback: (ctx: GetServerSidePropsContext &
{ store: Store<RootState, AnyAction> }) => any) => wrapper.getServerSideProps(async (ctx) => {
  const user = await checkAuth(ctx);

  if (!user) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return callback(ctx);
});
