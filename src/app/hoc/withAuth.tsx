"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/app/context/AuthContext";
import { PAGES } from "@/lib/urls";
import Spinner from "@/components/ui/spinner";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuthComponent(props: P) {
    const router = useRouter();
    const { user, isAuthLoading } = useAuth();

    useEffect(() => {
      if (!isAuthLoading && !user) {
        router.push(PAGES.SIGN_IN);
      }
    }, [isAuthLoading, user, router]);

    if (isAuthLoading) {
      return <Spinner />;
    }

    // Only render the wrapped component if user is authenticated
    return user ? <WrappedComponent {...props} /> : null;
  };
}

export default withAuth;
