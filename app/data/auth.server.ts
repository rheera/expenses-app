import type { StatusError } from "~/types/interfaces";
import { prisma } from "./database.server";
import pkg from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const { hash, compare } = pkg;

const SESSION_SECRET = process.env.SESSION_SECRET!;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true,
  },
});

async function createUserSession(userId: string, redirectPath: string) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function getUserFromSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const userId = session.get("userId");

  if (!userId) {
    return null;
  }

  return userId;
}

export async function signup({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // existing user check
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) {
    const error: StatusError = new Error(
      "A user with the provided email address exists already."
    );
    error.status = 422;
    throw error;
  }

  // new user
  const passwordHash = await hash(password, 12);
  const user = await prisma.user.create({
    data: { email, password: passwordHash },
  });
  return createUserSession(user.id, "/expenses");
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (!existingUser) {
    const error: StatusError = new Error(
      "Could not log you in, user doesn't exist"
    );
    error.status = 401;
    throw error;
  }

  const isPasswordCorrect = await compare(password, existingUser.password);

  if (!isPasswordCorrect) {
    const error: StatusError = new Error(
      "Could not log you in, please check provided credentials"
    );
    error.status = 401;
    throw error;
  }

  return createUserSession(existingUser.id, "/expenses");
}

export async function destroyUserSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function requireUserSession(request: Request) {
  const userId = await getUserFromSession(request);

  if (!userId) {
    throw redirect("/auth?mode=login");
  }

  return userId;
}
