import "server-only";
import { comparePassword, hashPassword } from "@/lib/password";
import { createSessionToken } from "@/features/auth/session";
import { createUser, findUserByEmail } from "@/features/auth/repo";
import type { LoginInput, RegisterInput } from "@/features/auth/validators";

export async function login(input: LoginInput) {
  const user = await findUserByEmail(input.email);
  if (!user) throw new Error("Utilisateur introuvable");

  const isPasswordValid = await comparePassword(input.password, user.password);
  if (!isPasswordValid) throw new Error("Mot de passe incorrect");

  const token = await createSessionToken({ id: user.id, role: user.role });
  return { user, token };
}

export async function register(input: RegisterInput) {
  const existingUser = await findUserByEmail(input.email);
  if (existingUser) throw new Error("Email déjà utilisé");

  const hashedPassword = await hashPassword(input.password);
  const user = await createUser({
    nom: input.nom,
    prenom: input.prenom,
    email: input.email,
    password: hashedPassword,
  });

  const token = await createSessionToken({ id: user.id, role: user.role });
  return { user, token };
}

