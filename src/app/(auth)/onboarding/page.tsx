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
import { axiosInstance, getAuthHeaders, getAxiosError } from "@/lib/request";
import { BACKEND_URLS, PAGES } from "@/lib/urls";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define validation schema
const onboardingSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  domain: z.string().min(1, "Domain is required"),
});

type OnboardingValues = z.infer<typeof onboardingSchema>;

export default function Onboarding() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      businessName: "",
      domain: "",
    },
  });

  const onSubmit = async (data: OnboardingValues) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.put(
        BACKEND_URLS.UPDATE_PROFILE,
        data,
        {
          headers: getAuthHeaders(),
        }
      );
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      router.push(PAGES.DASHBOARD);
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
      <Card className="w-[600px]">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">
            Complete Your Profile
          </h2>
          <p className="text-center text-gray-500">
            Tell us about your business
          </p>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Building className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
                <Input
                  {...register("businessName")}
                  type="text"
                  placeholder="Business Name"
                  className="pl-8"
                />
              </div>
              {errors.businessName && (
                <p className="text-sm text-red-500">
                  {errors.businessName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Globe className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
                <Input
                  {...register("domain")}
                  type="text"
                  placeholder="Domain"
                  className="pl-8"
                />
              </div>
              {errors.domain && (
                <p className="text-sm text-red-500">{errors.domain.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Complete Setup"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
