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
import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define validation schema
const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpValues) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(BACKEND_URLS.SIGN_UP, data);
      const { user, token } = response.data;
      localStorage.setItem("jwt", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      router.push(PAGES.ONBOARDING);
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
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
                <Input
                  {...register("name")}
                  type="text"
                  placeholder="Full Name"
                  className="pl-8"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
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
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href={PAGES.SIGN_IN}
                className="text-blue-500 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
