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
    redirect("/login?error=" + encodeURIComponent("Invalid email"));
  }
  if (!passwordEntry || typeof passwordEntry !== "string") {
    redirect("/login?error=" + encodeURIComponent("Invalid password"));
  }

  const user = await User.findOne({ where: { email: emailEntry } });
  if (!user) {
    redirect("/login?error=" + encodeURIComponent("Invalid credentials"));
  }

  const isPasswordValid = await bcrypt.compare(passwordEntry, user.password);
  if (!isPasswordValid) {
    redirect("/login?error=" + encodeURIComponent("Invalid credentials"));
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
    redirect("/signup?error=" + encodeURIComponent("All fields are required"));
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    redirect("/signup?error=" + encodeURIComponent("User already exists"));
  }

  const { strength, valid } = checkPasswordStrength(password);
  if (!valid) {
    redirect(
      "/signup?error=" + encodeURIComponent(`Password strength is ${strength}`)
    );
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

    redirect("/dashboard");
  } catch (error) {
    console.log(error);
    redirect(
      "/signup?error=" + encodeURIComponent("An unexpected error occurred")
    );
  }
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
