const apiFetch = async (url: string, options: RequestInit = {}) => {
  const defaultOptions: RequestInit = {
    ...options,
    credentials: 'include',
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
    defaultOptions
  );

  if (response.status === 401) {
    const refreshed = await refreshToken();
    if (refreshed) {
      return fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
        defaultOptions
      );
    } else {
      throw new Error('Unauthorized');
    }
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

const refreshToken = async (): Promise<boolean> => {
  const refreshResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
    {
      method: 'POST',
      credentials: 'include',
    }
  );

  return refreshResponse.ok;
};

export default apiFetch;
