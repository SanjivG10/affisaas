"use client";

import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { axiosInstance, getAxiosError } from "@/lib/request";
import { BACKEND_URLS, PAGES } from "@/lib/urls";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define validation schema
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInValues) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axiosInstance.post(BACKEND_URLS.SIGN_IN, data);
      const { user, token } = response.data;
      localStorage.setItem("jwt", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      const isOnboardingComplete = user.domain && user.businessName;
      if (isOnboardingComplete) {
        router.push(PAGES.DASHBOARD);
      } else {
        router.push(PAGES.ONBOARDING);
      }
    } catch (err: unknown) {
      toast({
        title: "Error",
        description: getAxiosError(err),
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Sign In</h2>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {error && (
              <div className="text-sm text-red-500 text-center">{error}</div>
            )}
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className="pl-8"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className="pl-8"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href={PAGES.SIGN_UP}
                className="text-blue-500 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
