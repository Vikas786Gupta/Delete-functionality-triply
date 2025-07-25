import { useCallback, useEffect, useMemo, useState } from 'react';
import { API_BASE_URL } from './constant';
import { getAuthToken } from './utils';
import { useRecoilValue } from 'recoil';
import { authToken } from './pages/Store';

const API_HOST = API_BASE_URL.local;

export const useNetwork = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const authKey = useRecoilValue(authToken);

  const config = useMemo(() => ({}), []);
  const postConfig = useMemo(() => ({}), []);

  if (authKey) {
    config.headers = {
      Auth_Key: `${authKey}`,
    };
  }
  postConfig.headers = {
    'Content-Type': 'application/json',
    ...(config.headers ?? {}),
  };

  const get = useCallback(
    async (url, configHeader) => {
      console.log('ConfigHeader -->', configHeader);
      setLoading(true);
      try {
        const response = await fetch(API_HOST + url, configHeader ?? config);
        const apiPayload = await response.json();
        if (apiPayload.message === 'Unauthorized user.') {
          // logout();
        }
        setStatus(response?.ok);
        setIsLoaded(true);
        setData(apiPayload);
        return apiPayload;
      } catch (err) {
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [config]
  );

  const post = useCallback(
    async (url, requestJSON) => {
      setLoading(true);
      console.log('postConfig.headers ==>', postConfig.headers);
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: postConfig.headers, // Fixed issue
          body: JSON.stringify(requestJSON),
        });

        if (response.status === 500) {
          setError(response.type);
        }

        setStatus(response?.ok);
        const apiData = await response.json();

        console.log('POST Response --> ', apiData);
        setIsLoaded(true);
        setData(apiData);
        return apiData;
      } catch (err) {
        console.log('Error --> ', err);
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [postConfig]
  );

  return {
    get,
    post,
    data,
    status,
    error,
    loading,
    setLoading,
    isLoaded,
    setIsLoaded,
  };
};
