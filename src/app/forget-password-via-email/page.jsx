"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { resetPasswordRequest } from "@/lib/auth";
import { showCustomSwal, showSuccess } from "@/components/ui/CustomSwal";

// Validation schema
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .regex(
        /(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .regex(/(?=.*\d)/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ForgetPasswordViaEmail() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  // Extract uid and token from URL
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  useEffect(() => {
    const uidParam = urlParams.get("uid");
    const tokenParam = urlParams.get("token");
    if (uidParam) setUid(uidParam);
    if (tokenParam) setToken(tokenParam);
    console.log("UID:", uidParam, "Token:", tokenParam);
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setErrorMessage("");
    try {
      const res = await resetPasswordRequest({
        password: data.password,
        confirm_password: data.confirmPassword,
        token: token,
        uid: uid,
      });
      if (res.code === "200" || res.code === "201") {
        await showSuccess(
          "Password Reset Successful",
          "Your password has been successfully updated."
        );
      } else {
        await showCustomSwal({
          icon: "error",
          title: "Reset Failed",
          text: res.message || "Failed to reset password",
        });
      }

      // Redirect to sign-in page
      router.push("/sign-in");
    } catch (error) {
      console.error("Error submitting form:", error);
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to reset password";
      setErrorMessage(msg);

      await showCustomSwal({
        icon: "error",
        title: "Reset Failed",
        text: msg,
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full px-5 h-screen flex flex-col items-center justify-center gap-3"
    >
      <h1 className="font-poppins font-semibold text-5xl text-[#000000] text-center">
        Set a New Password
      </h1>
      <p className="font-poppins text-2xl text-[#8F8C8C] text-center">
        Your new password must be different from previous used
      </p>
      <p className="font-poppins text-2xl text-[#8F8C8C]">passwords.</p>

      <div className="relative w-full max-w-sm mt-4 grid gap-3">
        <Input
          type={showPassword1 ? "text" : "password"}
          placeholder="New Password"
          className="pr-10 font-poppins"
          {...register("password")}
        />
        <Button
          type="button"
          variant="ghost"
          className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => setShowPassword1(!showPassword1)}
        >
          {showPassword1 ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
        {errors.password && (
          <p className="text-red-500 text-sm font-poppins text-left">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="relative w-full max-w-sm mt-4 grid gap-3">
        <Input
          type={showPassword2 ? "text" : "password"}
          placeholder="Confirm Password"
          className="pr-10 font-poppins"
          {...register("confirmPassword")}
        />
        <Button
          type="button"
          variant="ghost"
          className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => setShowPassword2(!showPassword2)}
        >
          {showPassword2 ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm font-poppins text-left">
            {errors.confirmPassword.message}
          </p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-sm font-poppins text-left">
            {errorMessage}
          </p>
        )}
      </div>

      <div className="w-full max-w-sm mt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full font-poppins cursor-pointer hover:scale-105 hover:shadow-lg"
        >
          {isSubmitting ? "Updating..." : "Confirm"}
        </Button>
      </div>
    </form>
  );
}
