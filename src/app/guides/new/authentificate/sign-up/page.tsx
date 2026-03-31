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

export default function SignUpPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/register", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();

    if (result.success) {
      login(); // met à jour AuthContext
      router.push("/articles");
    } else {
      alert(result.error); // ou composant d'erreur
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-emerald-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Créer un compte</CardTitle>
          <CardDescription>Rejoignez notre communauté</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" name="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" name="lastName" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" name="password" type="password" required />
            </div>

            <Button
              type="submit"
              className="w-full mt-2 bg-emerald-600 hover:font-bold hover:text-emerald-600 hover:bg-white hover:text-2xl">
              Créer le compte
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center items-center gap-1">
          Vous avez déjà un compte ?{" "}
          <Link
            href="/authentificate/sign-in"
            className="text-emerald-600 font-medium hover:underline hover:font-bold">
            Se connecter
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
