'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthentication } from '@/store/auth.store';
import { RootState } from '@/store/store';


export default function AuthInitializer({children}: {children: React.ReactNode}) {
  const dispatch = useDispatch();
  const { isAuthLoading } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    const reload = async()=>{
      const response = await dispatch(checkAuthentication());
      const payload = response.payload;
      console.log(payload);
    }
    reload();
  }, [dispatch]);

  if (isAuthLoading) {
    return <p></p>;
  }
  return <>{children}</>;
}
