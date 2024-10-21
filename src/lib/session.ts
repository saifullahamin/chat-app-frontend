import type { SessionOptions } from "iron-session";

export interface SessionData {
  error?: string;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "my-app-session",
  cookieOptions: {
    secure: process.env.NEXT_PUBLIC_ENV === "production",
  },
};
