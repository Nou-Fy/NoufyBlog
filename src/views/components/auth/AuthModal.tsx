"use client";

import React, { useState } from "react";
import { Mail, Lock, User, ShieldCheck, X } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginUser } from "@/app/api/actions/login";
import { registerUser } from "@/app/api/actions/register";
import { useAuth } from "@/app/context/AuthContext";

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
        // Login
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

        const response = await fetch("/api/login", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          login();
          onClose();
        } else {
          setErrorMessage(result.error);
        }
      } else {
        // Register
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            password: data.password,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          login();
          onClose();
        } else {
          setErrorMessage(result.error || "Erreur lors de l'inscription");
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-stone-100 rounded-full transition-colors">
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 mb-4 text-emerald-600">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-900">
            {isSignIn ? "Bon retour !" : "Rejoindre Noufy"}
          </h2>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Champ caché pour que Zod reçoive le booléen isSignIn */}
          <input type="hidden" {...register("isSignIn")} />

          {!isSignIn && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
                  Nom
                </label>
                <input
                  {...register("nom")}
                  placeholder="Rakoto"
                  className={`w-full px-4 py-3 bg-stone-50 border rounded-2xl text-sm text-slate-900 outline-none transition-all ${
                    errors.nom
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-stone-100"
                  }`}
                />
                {errors.nom && (
                  <p className="text-red-500 text-[10px] font-bold">
                    {errors.nom.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
                  Prénom
                </label>
                <input
                  {...register("prenom")}
                  placeholder="Jean"
                  className={`w-full px-4 py-3 bg-stone-50 border rounded-2xl text-sm text-slate-900 outline-none transition-all ${
                    errors.prenom
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-stone-100"
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
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
              <input
                {...register("email")}
                placeholder="nom@exemple.mg"
                className={`w-full pl-11 pr-4 py-3 bg-stone-50 border rounded-2xl text-sm text-slate-900 outline-none transition-all ${
                  errors.email
                    ? "border-red-500 ring-1 ring-red-500"
                    : "border-stone-100"
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
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className={`w-full pl-11 pr-4 py-3 bg-stone-50 border rounded-2xl text-sm text-slate-900 outline-none transition-all ${
                  errors.password
                    ? "border-red-500 ring-1 ring-red-500"
                    : "border-stone-100"
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
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-emerald-600 disabled:bg-slate-400 transition-all shadow-lg mt-4">
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
          <p className="text-sm text-slate-500">
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
    </div>
  );
}
