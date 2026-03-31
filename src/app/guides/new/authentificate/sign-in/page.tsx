"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/views/components/ui/card";
import { Input } from "@/views/components/ui/input";
import { Label } from "@/views/components/ui/label";
import { Button } from "@/views/components/ui/button";
import Link from "next/link";

export default function SignInPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/login", { method: "POST", body: formData });
    const result = await res.json();

    if (result.success) {
      login(); // met à jour AuthContext
      router.push("/articles");
    } else {
      alert(result.error); // tu peux remplacer par un composant d’erreur
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-emerald-50 p-10">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>Accédez à votre compte</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="email@gmail.com"
                id="email"
                name="email"
                type="email"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                placeholder="*************"
                id="password"
                name="password"
                type="password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-2 bg-emerald-600 hover:font-bold hover:text-emerald-600 hover:bg-white hover:text-2xl">
              Se connecter
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center items-center gap-1">
          <p>Pas encore de compte ?</p>
          <Link
            href="/authentificate/sign-up"
            className="text-emerald-600 font-medium hover:underline hover:font-bold">
            Créer un compte
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
