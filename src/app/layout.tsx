import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import HeaderNew from "@/views/components/HeaderNew";
import FooterNew from "@/views/components/FooterNew";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

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
        className={`${inter.className} bg-stone-50 text-slate-900 min-h-screen flex flex-col`}>
        <AuthProvider>
          <HeaderNew />
          <main className="flex-1">{children}</main>
          <FooterNew isLoggedInServer={hasSession} />
        </AuthProvider>
      </body>
    </html>
  );
}
