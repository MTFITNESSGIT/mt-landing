"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { ComponentType } from "react";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({
  message = "Verificando sesión...",
}: LoadingScreenProps) => (
  <div className="h-full flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
      <p className="text-white">{message}</p>
    </div>
  </div>
);

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  options?: {
    redirectTo?: string;
    allowedEmails?: string[];
  }
) {
  const {
    redirectTo = "/auth/signin",
    allowedEmails = [process.env.NEXT_PUBLIC_GOOGLE_EMAIL],
  } = options || {};

  return function AuthenticatedComponent(props: P) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return;

      if (!session) {
        router.push(redirectTo);
        return;
      }

      // Check if user email is allowed
      if (session.user?.email && !allowedEmails.includes(session.user.email)) {
        router.push("/auth/error");
        return;
      }
    }, [session, status, router]);

    // Show loading while checking session
    if (status === "loading") {
      return <LoadingScreen />;
    }

    // Show loading if no session (while redirecting)
    if (!session) {
      return <LoadingScreen message="Redirigiendo..." />;
    }

    // Check email authorization
    if (session.user?.email && !allowedEmails.includes(session.user.email)) {
      return <LoadingScreen message="Verificando permisos..." />;
    }

    return <WrappedComponent {...props} />;
  };
}
