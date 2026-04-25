import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useRouter } from 'next/navigation'
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isAuthLoading } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    React.useEffect(() => {
        if (!isAuthLoading && !isAuthenticated) {
            router.push('/signin');
        }
    }, [isAuthLoading, isAuthenticated, router]);

  return (
    <div>
        {isAuthLoading ? (
            <p>Loading...</p>
        ) : (
            <>{isAuthenticated ? <>{children}</> : null}</>
        )}
    </div>
  )
}

export { ProtectedRoute }
