"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginRequest, saveAuth } from "@/lib/auth";
// import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { showCustomSwal } from "@/components/ui/CustomSwal";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectTo, setRedirectTo] = useState("/dashboard");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [loginLoading, setLoginLoading] = useState(false);

  // Get redirect parameter on component mount
  useEffect(() => {
    const redirect = searchParams.get("redirect");
    if (redirect) {
      setRedirectTo(redirect);
    }
  }, [searchParams]);

  // If redirected by middleware with loginRequired flag, show a swal informing user
  useEffect(() => {
    const loginRequired = searchParams.get("loginRequired");
    if (loginRequired) {
      (async () => {
        await showCustomSwal({
          icon: "warning",
          title: "Login required",
          text: "You need to sign in to access that page.",
          confirmButtonText: "OK",
        });
        // Remove loginRequired param from URL while keeping redirect param
        const params = new URLSearchParams(
          Array.from(searchParams.entries()).filter(
            ([k]) => k !== "loginRequired"
          )
        );
        const newUrl = params.toString()
          ? `/sign-in?${params.toString()}`
          : "/sign-in";
        router.replace(newUrl);
      })();
    }
  }, [searchParams, router]);

  const onSubmit = async (data) => {
    setErrorMessage("");
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };
      setLoginLoading(true);
      const res = await loginRequest(payload);
      const access = res.access || res.token || res.access_token;
      const refresh = res.refresh || res.refresh_token;
      const user = res.user || null;
      console.log("Login successful", {
        access: access,
        refresh: refresh,
        user: user,
      });
      saveAuth({ access, refresh, user });
      if (access) {
        // Redirect to intended page or dashboard
        router.push(redirectTo);
      } else {
        setErrorMessage(res?.message || "Login failed");
      }
    } catch (err) {
      console.error("Submission error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.non_field_errors[0] ||
        "Login failed";
      setErrorMessage(msg);
    } finally {
      setLoginLoading(false);
      //  router.push("/dashboard");  //default navigation after login only for development process
    }
  };

  return (
    <div className="w-full h-screen flex px-4 lg:px-0">
      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          <h1 className="text-[#000000] font-poppins font-medium text-2xl">
            Welcome back!
          </h1>

          <div className="grid w-full items-center gap-3 mt-4">
            <Label htmlFor="email" className="text-[#000000] font-poppins">
              Email address
            </Label>
            <Input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="font-poppins"
            />
            {errors.email && (
              <p className="text-red-500 text-sm font-poppins">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="w-full mt-4 grid gap-3">
            <Label htmlFor="password" className="text-[#000000] font-poppins">
              Password
            </Label>
            <div className="relative w-full">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="pr-10 font-poppins" // leave space for the eye button
                {...register("password")}
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute right-1 top-1/2 
                            -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm font-poppins">
                {errorMessage}
              </p>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Link
              href="/forget-password"
              className="text-blue-700 text-sm font-poppins"
            >
              forgot password?
            </Link>
          </div>

          <div className="w-full mt-5">
            <Button
              type="submit"
              className="w-full font-poppins cursor-pointer 
                        hover:scale-105 hover:shadow-lg"
              disabled={loginLoading}
            >
              {loginLoading ? "Logging In..." : "Log In"}
            </Button>
          </div>

          <div className="w-full max-w-sm flex gap-2 mt-10">
            <div className="w-1/2 h-[1px] bg-gray-300" />
            <p className="text-[#000000] font-poppins -translate-y-1/2 text-sm">
              OR
            </p>
            <div className="w-1/2 h-[1px] bg-gray-300" />
          </div>

          <div className="w-full mt-4">
            <Button
              className="w-full flex gap-3 cursor-pointer bg-[#D9D9D9] 
                        hover:bg-[#D9D9D9]"
            >
              <Image
                src="/Google_Icon.svg"
                alt="google_icon"
                height={10}
                width={15}
                className=""
              />
              <Label
                htmlFor="google-sign-in"
                className="text-[#000000] font-poppins 
                            font-sm cursor-pointer"
              >
                Sign in with Google
              </Label>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm pt-6">
            <p className="text-[#000000] font-poppins">
              Don’t have an account?
            </p>
            <Link
              href="/sign-up"
              className="text-blue-700 font-poppins font-sm"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>

      <div
        className="lg:w-1/2 h-screen bg-[url(/sign-up-side-photo.jpg)] bg-cover 
            rounded-tl-[30px] rounded-bl-[30px] hidden lg:block"
      />
    </div>
  );
}
