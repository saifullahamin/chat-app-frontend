import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface CacheOptions {
  revalidate?: number;
  tags?: string[];
  cache?: "no-store" | "force-cache" | "no-cache";
}

const apiFetch = async (
  url: string,
  options: RequestInit = {},
  cacheOptions: CacheOptions = {}
) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const defaultOptions: RequestInit = {
    ...options,
    headers: {
      ...options.headers,
      Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
    },
  };

  if (!cacheOptions.revalidate && cacheOptions.cache) {
    cacheOptions.cache = cacheOptions.cache;
  }
  const nextOptions = {
    revalidate: cacheOptions.revalidate,
    tags: cacheOptions.tags,
    cache: !cacheOptions.revalidate ? cacheOptions.cache : "no-cache",
  };

  let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...defaultOptions,
    next: nextOptions,
  });

  if (response.status === 401 && refreshToken) {
    const refreshed = await refreshTokenFunction(refreshToken);
    if (refreshed) {
      const newAccessToken = cookieStore.get("accessToken")?.value;

      if (newAccessToken) {
        const responseWithCookie = NextResponse.next();
        responseWithCookie.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NEXT_PUBLIC_ENV === "production",
          maxAge: 15 * 60, // 15 minutes
        });
      }
      response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        ...defaultOptions,
        headers: {
          ...defaultOptions.headers,
          Cookie: `accessToken=${newAccessToken}; refreshToken=${refreshToken}`,
        },
        next: nextOptions,
      });
    } else {
      throw new Error("Unauthorized");
    }
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

const refreshTokenFunction = async (refreshToken: string): Promise<boolean> => {
  const refreshResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
    {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    }
  );

  return refreshResponse.ok;
};

export default apiFetch;
