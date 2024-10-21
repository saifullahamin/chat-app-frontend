"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@/models/userModel";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const emailEntry = formData.get("email")?.toString();
  const passwordEntry = formData.get("password")?.toString();
  const cookieStore = cookies();

  if (!emailEntry || typeof emailEntry !== "string") {
    cookieStore.set("loginError", "Invalid email", {
      path: "/",
      maxAge: 10,
    });
    return;
  }
  if (!passwordEntry || typeof passwordEntry !== "string") {
    cookieStore.set("loginError", "Invalid password", {
      path: "/",
      maxAge: 10,
    });
    return;
  }

  const user = await User.findOne({ where: { email: emailEntry } });
  if (!user) {
    cookieStore.set("loginError", "Invalid credentials", {
      path: "/",
      maxAge: 10,
    });
    return;
  }

  const isPasswordValid = await bcrypt.compare(passwordEntry, user.password);
  if (!isPasswordValid) {
    cookieStore.set("loginError", "Invalid credentials", {
      path: "/",
      maxAge: 10,
    });
    return;
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_ENV === "production",
    maxAge: 15 * 60,
    path: "/",
  });
  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_ENV === "production",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  redirect("/dashboard");
}

export async function signupAction(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const displayName = formData.get("displayName")?.toString();

  const cookieStore = cookies();

  if (!email || !password || !displayName) {
    cookieStore.set("signupError", "All fields are required", {
      path: "/",
      maxAge: 10,
    });
    return;
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    cookieStore.set("signupError", "User already exists", {
      path: "/",
      maxAge: 10,
    });
    return;
  }

  const { strength, valid } = checkPasswordStrength(password);
  if (!valid) {
    cookieStore.set("signupError", `Password strength is ${strength}`, {
      path: "/",
      maxAge: 10,
    });
    return;
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      displayName,
      email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_ENV === "production",
      maxAge: 15 * 60,
      path: "/",
    });
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
  } catch (error) {
    console.log(error);
    cookieStore.set("signupError", "An unexpected error occurred", {
      path: "/",
      maxAge: 10,
    });
    return;
  }

  redirect("/dashboard");
}

function checkPasswordStrength(password: string) {
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const mediumPassword = /^(?=.*[a-z])(?=.*\d).{6,}$/;

  if (strongPassword.test(password)) {
    return { strength: "strong", valid: true };
  } else if (mediumPassword.test(password)) {
    return { strength: "medium", valid: true };
  } else {
    return { strength: "weak", valid: false };
  }
}
