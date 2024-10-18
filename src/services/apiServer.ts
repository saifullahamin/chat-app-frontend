import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const apiFetch = async (
  url: string,
  options: RequestInit = {},
  revalidate?: number
) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const defaultOptions: RequestInit = {
    ...options,
    headers: {
      ...options.headers,
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    },
  };

  let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
    ...defaultOptions,
    next: revalidate ? { revalidate } : {},
  });

  if (response.status === 401 && refreshToken) {
    const refreshed = await refreshTokenFunction(refreshToken);
    if (refreshed) {
      const newAccessToken = cookieStore.get('accessToken')?.value;

      if (newAccessToken) {
        const responseWithCookie = NextResponse.next();
        responseWithCookie.cookies.set('accessToken', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 15 * 60, // 15 minutes
        });
      }
      response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
        ...defaultOptions,
        headers: {
          ...defaultOptions.headers,
          Cookie: `accessToken=${newAccessToken}; refreshToken=${refreshToken}`,
        },
        next: revalidate ? { revalidate } : {},
      });
    } else {
      throw new Error('Unauthorized');
    }
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

const refreshTokenFunction = async (refreshToken: string): Promise<boolean> => {
  const refreshResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
    {
      method: 'POST',
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    }
  );

  return refreshResponse.ok;
};

export default apiFetch;
