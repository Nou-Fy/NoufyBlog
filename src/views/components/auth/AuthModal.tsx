"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Mail, Lock, User, ShieldCheck, X } from "lucide-react";
import { useForm, SubmitHandler } from "@/views/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginUser } from "@/app/api/actions/login";
import { registerUser } from "@/app/api/actions/register";
import { useAuth } from "@/context/AuthContext";
import { DESIGN_SYSTEM } from "@/lib/constants/design-system";

// 1. Définition du schéma de base directement ici pour garantir la cohérence
const authSchema = z
  .object({
    // Mode est interne pour aider Zod à choisir la validation
    isSignIn: z.boolean(),
    nom: z.string().optional(),
    prenom: z.string().optional(),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Mot de passe trop court (min 6)"),
  })
  .superRefine((data, ctx) => {
    // SI on n'est PAS en train de se connecter, alors NOM et PRENOM sont obligatoires
    if (!data.isSignIn) {
      if (!data.nom || data.nom.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nom trop court",
          path: ["nom"],
        });
      }
      if (!data.prenom || data.prenom.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Prénom trop court",
          path: ["prenom"],
        });
      }
    }
  });

type AuthFormData = z.infer<typeof authSchema>;

export default function AuthModal({
  type,
  onClose,
}: {
  type: "sign-in" | "sign-up";
  onClose: () => void;
}) {
  const [isSignIn, setIsSignIn] = useState(type === "sign-in");
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue, // Pour mettre à jour isSignIn dans le schéma
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      isSignIn: type === "sign-in",
      nom: "",
      prenom: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<AuthFormData> = async (data) => {
    setErrorMessage(null);

    try {
      if (isSignIn) {
        // Login using server action
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

        const result = await loginUser(formData);

        if (result.success && result.user) {
          login(result.user);
          onClose();
        } else {
          setErrorMessage(result.error ?? "Une erreur est survenue");
        }
      } else {
        // Register using server action
        const formData = new FormData();
        formData.append("firstName", data.prenom!);
        formData.append("lastName", data.nom!);
        formData.append("email", data.email);
        formData.append("password", data.password);

        const result = await registerUser(null, formData);

        if (result?.error) {
          setErrorMessage(result.error);
        } else if (result?.user) {
          // Registration successful, user is auto-logged in
          login(result.user);
          onClose();
        }
      }
    } catch (error) {
      console.error("Erreur:", error);
      setErrorMessage("Une erreur est survenue");
    }
  };

  const toggleMode = (mode: boolean) => {
    setIsSignIn(mode);
    setValue("isSignIn", mode); // Crucial pour que Zod sache quel mode valider
    reset({ isSignIn: mode, nom: "", prenom: "", email: "", password: "" });
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div
        className={`relative w-full max-w-md mx-4 my-auto ${DESIGN_SYSTEM.colors.neutral.bg} ${DESIGN_SYSTEM.radius.xl} shadow-2xl p-8 md:p-10 animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto`}>
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-card/80 rounded-full transition-colors">
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 mb-4 text-emerald-600">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-black text-foreground">
            {isSignIn ? "Bon retour !" : "Rejoindre Noufy"}
          </h2>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Champ caché pour que Zod reçoive le booléen isSignIn */}
          <input type="hidden" {...register("isSignIn")} />

          {!isSignIn && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">
                  Nom
                </label>
                <input
                  {...register("nom")}
                  placeholder="Rakoto"
                  className={`w-full px-4 py-3 bg-background border rounded-2xl text-sm text-foreground outline-none transition-all ${
                    errors.nom
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-border"
                  }`}
                />
                {errors.nom && (
                  <p className="text-red-500 text-[10px] font-bold">
                    {errors.nom.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">
                  Prénom
                </label>
                <input
                  {...register("prenom")}
                  placeholder="Jean"
                  className={`w-full px-4 py-3 bg-background border rounded-2xl text-sm text-foreground outline-none transition-all ${
                    errors.prenom
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-border"
                  }`}
                />
                {errors.prenom && (
                  <p className="text-red-500 text-[10px] font-bold">
                    {errors.prenom.message}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-muted-foreground" />
              <input
                {...register("email")}
                placeholder="nom@exemple.mg"
                className={`w-full pl-11 pr-4 py-3 bg-background border rounded-2xl text-sm text-foreground outline-none transition-all ${
                  errors.email
                    ? "border-red-500 ring-1 ring-red-500"
                    : "border-border"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-[10px] font-bold">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-muted-foreground" />
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className={`w-full pl-11 pr-4 py-3 bg-background border rounded-2xl text-sm text-foreground outline-none transition-all ${
                  errors.password
                    ? "border-red-500 ring-1 ring-red-500"
                    : "border-border"
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-[10px] font-bold">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full py-4 bg-card/90 text-white rounded-2xl font-bold hover:bg-emerald-600 disabled:bg-card/40 transition-all shadow-lg mt-4">
            {isSubmitting
              ? "Chargement..."
              : isSignIn
                ? "Se connecter"
                : "Créer mon compte"}
          </button>
        </form>

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-2xl">
            <p className="text-red-600 text-sm font-medium text-center">
              {errorMessage}
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {isSignIn ? (
              <>
                Pas encore de compte ?{" "}
                <button
                  onClick={() => toggleMode(false)}
                  className="font-bold text-emerald-600 hover:underline">
                  S'inscrire
                </button>
              </>
            ) : (
              <>
                Déjà membre ?{" "}
                <button
                  onClick={() => toggleMode(true)}
                  className="font-bold text-emerald-600 hover:underline">
                  Se connecter
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
