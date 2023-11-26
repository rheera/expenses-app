import type { StatusError } from "~/types/interfaces";
import { prisma } from "./database.server";
import pkg from "bcryptjs";

const { hash } = pkg;

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
  await prisma.user.create({ data: { email, password: passwordHash } });
}
