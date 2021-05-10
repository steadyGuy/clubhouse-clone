import { GetServerSidePropsContext } from 'next';;
import { Api } from '../api'

export const checkAuth = async (ctx: GetServerSidePropsContext): Promise<boolean> => {
  try {
    return await Api(ctx).getMe();
  } catch (error) {
    console.log(error)
    return false;
  }
}