import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { attachAuthInterceptor, detachAuthInterceptor } from '../api/client';

function useApiAuth() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      return undefined;
    }

    const interceptorId = attachAuthInterceptor(getAccessTokenSilently);
    return () => detachAuthInterceptor(interceptorId);
  }, [isAuthenticated, getAccessTokenSilently]);
}

export default useApiAuth;
