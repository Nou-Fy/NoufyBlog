import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "Noufy Blog",
  description: "Blog élevage poules Madagascar",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const hasSession = cookieStore.has("session"); // Vérification côté serveur (sécurisé)

  return (
    <html lang="fr">
      <body
        className="bg-background text-foreground min-h-screen flex flex-col">
        <ThemeProvider>
          <AuthProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer isLoggedInServer={hasSession} />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
