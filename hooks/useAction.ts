import { AsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const useAsyncAction = <Arg, Returned>(actionCreator: AsyncThunk<Returned, Arg, {}>) => {
  const dispatch = useDispatch<any>();

  return useCallback(
    (arg: Arg) =>
      dispatch(actionCreator(arg)).then((result) => unwrapResult(result))
        .catch((err) => Promise.reject(err)),
    [dispatch, actionCreator],
  );
}

// const useAction = <Args extends any[], Action extends PayloadAction<any, any>>(
//   actionCreator: (...args: Args) => Action
// ): (...args: Args) => Promise<Action['payload']> => {
//   const dispatch = useDispatch<(action: any) => Promise<any>>(); // * Note Promise<any>

//   return useCallback(async (...args: Args) => {
//     return dispatch(actionCreator(...args))
//       .then(result => {
//         return unwrapResult(result) // @reduxjs/toolkit
//       })
//       .catch(err => {
//         return Promise.reject(err)
//       })
//   }, [dispatch])
// }