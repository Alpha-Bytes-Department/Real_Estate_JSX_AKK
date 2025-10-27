"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { showCustomSwal, showSuccess } from "@/components/ui/CustomSwal";
import { forgotPasswordRequest } from "@/lib/auth";

// Validation schema
const forgetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function ForgetPassword() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setErrorMessage("");
    try {
      console.log("Sending password reset email to:", data.email);
      const res= await forgotPasswordRequest({ email: data.email });
      if(res.code=="200"){
        await showSuccess(
          "Check Your Email",
          "A password reset link has been sent to your email address."
        );

      }
      else{
        showCustomSwal(
            {
                icon: "error",
                title: "Error",
                text: res?.message || "Failed to send reset link",
                confirmButtonText: "OK",
            }
        )
      }

      reset();
      router.push("/check-your-inbox-page");
    } catch (error) {
      console.error("Error:", error);
      const msg = error?.message || "Failed to send reset link";
      setErrorMessage(msg);
      
      await showCustomSwal({
        icon: "error",
        title: "Error",
        text: msg,
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full px-5 h-screen flex flex-col items-center justify-center gap-8 text-center"
    >
      <h1 className="font-semibold font-poppins text-[#000000] text-4xl">
        Forget Your Password?
      </h1>
      <p className="text-[#8F8C8C] text-xl font-poppins">
        No worries! Enter your email below and we'll send you a link to reset it.
      </p>

      <div className="w-full max-w-sm mt-6">
        <Input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm font-poppins mt-2 text-left">
            {errors.email.message}
          </p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-sm font-poppins mt-2 text-left">
            {errorMessage}
          </p>
        )}
      </div>

      <div className="w-full max-w-sm mt-1">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full font-poppins cursor-pointer hover:scale-105 hover:shadow-lg"
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center">
        <p className="text-[#8F8C8C] font-poppins ">
          A password reset link will be sent to your email address if it's
        </p>
        <p className="text-[#8F8C8C] font-poppins">associated with an account</p>
      </div>

      <div className="flex gap-1">
        <IoIosArrowRoundBack className="translate-y-1/4" />
        <Link href="/sign-in" className="text-[#1E1E1E] font-poppins">
          Back to Login
        </Link>
      </div>
    </form>
  );
}
