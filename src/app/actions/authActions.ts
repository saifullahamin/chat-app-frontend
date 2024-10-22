"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const emailEntry = formData.get("email")?.toString();
  const passwordEntry = formData.get("password")?.toString();
  const cookieStore = cookies();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailEntry, password: passwordEntry }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_ENV === "production",
      maxAge: 15 * 60,
      path: "/",
    });
    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    redirect("/dashboard");
  } else {
    const errorData = await response.json();
    throw new Error(
      errorData.error || "Authentication failed. Please try again."
    );
  }
}

export async function logoutAction() {
  const cookieStore = cookies();

  cookieStore.set("accessToken", "", {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_ENV === "production",
    maxAge: 0,
    path: "/",
  });
  cookieStore.set("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_ENV === "production",
    maxAge: 0,
    path: "/",
  });

  redirect("/");
}

export async function signupAction(formData: FormData) {
  const emailEntry = formData.get("email")?.toString();
  const passwordEntry = formData.get("password")?.toString();
  const displayName = formData.get("displayName")?.toString();
  const cookieStore = cookies();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailEntry,
        password: passwordEntry,
        displayName,
      }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_ENV === "production",
      maxAge: 15 * 60,
      path: "/",
    });
    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    redirect("/dashboard");
  } else {
    const errorData = await response.json();
    throw new Error(
      errorData.error || "Authentication failed. Please try again."
    );
  }
}
