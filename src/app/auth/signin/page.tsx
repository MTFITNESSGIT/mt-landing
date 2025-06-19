"use client";

import { signIn, getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session?.user?.email === process.env.NEXT_PUBLIC_GOOGLE_EMAIL) {
        router.push("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Acceso Restringido
          </CardTitle>
          <CardDescription>
            Solo usuarios autorizados pueden acceder al dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full"
            size="lg"
          >
            Iniciar Sesión con Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
