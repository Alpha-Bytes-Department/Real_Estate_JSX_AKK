"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { signupRequest, saveAuth } from "@/lib/auth";
import { showCustomSwal, showSuccess } from "@/components/ui/CustomSwal";

// Zod validation schema
const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    email: z.string().email("Please enter a valid email address"),
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
    agreeToTerms: z
      .boolean()
      .refine((val) => val === true, "You must agree to the terms and policy"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,reset
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onChange", // Add this for immediate validation
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  // Watch the agreeToTerms field
  const watchAgreeToTerms = watch("agreeToTerms");

  const onSubmit = async (data) => {
    setErrorMessage("");
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirm_password: data.confirmPassword,
      };
      // console.log("Form submitted:", payload);
      const res = await signupRequest(payload);

      if (res.code == 200 || res.code == 201) {
        console.log("User clicked confirm - redirect to sign in");
        showCustomSwal({
          icon: "success",
          title: "Success!",
          text: res?.message || "Sign up successful. Please Verify your email.",
        });
      } else {
        showCustomSwal({
          icon: "error",
          title: "Oops!",
          text: res?.message || "Something went wrong. Please try again.",
        });
      }
      reset()
    } catch (error) {
      console.error("Submission error:", error);
      const msg =
        error?.response?.data?.email || error?.response?.data?.name || "Sign up failed";
      setErrorMessage(msg);
    }
  };

  return (
    <div className="w-full h-screen flex px-4 lg:px-0">
      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          <h1 className="text-[#000000] font-poppins font-medium text-2xl">
            Get Started Now
          </h1>

          <div className="grid w-full items-center gap-3 mt-6">
            <Label htmlFor="name" className="text-[#000000] font-poppins">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="font-poppins"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm font-poppins">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="grid w-full items-center gap-3 mt-4">
            <Label htmlFor="email" className="text-[#000000] font-poppins">
              Email address
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="font-poppins"
              {...register("email")}
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
                type={showPassword1 ? "text" : "password"}
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
                onClick={() => setShowPassword1(!showPassword1)}
              >
                {showPassword1 ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm font-poppins">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="w-full mt-4 grid gap-3">
            <Label
              htmlFor="confirmPassword"
              className="text-[#000000] font-poppins"
            >
              Confirm Password
            </Label>
            <div className="relative w-full">
              <Input
                type={showPassword2 ? "text" : "password"}
                id="confirmPassword"
                placeholder="Again enter your password"
                className="pr-10 font-poppins" // leave space for the button
                {...register("confirmPassword")}
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute right-1 top-1/2 
                            -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword2(!showPassword2)}
              >
                {showPassword2 ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm font-poppins">
                {errors.confirmPassword.message}
              </p>
            )}

            {errorMessage && (
              <p className="text-red-500 text-sm font-poppins mt-2">
                {errorMessage}
              </p>
            )}
          </div>

          <div className="flex items-start gap-3 mt-4">
            <Checkbox
              id="terms-and-policy"
              checked={watchAgreeToTerms}
              onCheckedChange={(checked) => setValue("agreeToTerms", checked)}
            />
            <Label
              htmlFor="terms-and-policy"
              className="text-[#000000] font-poppins"
            >
              I agree to the{" "}
              <p
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
                className="text-[#0F3DDE] cursor-pointer"
              >
                terms & policy
              </p>
            </Label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-sm font-poppins mt-1">
              {errors.agreeToTerms.message}
            </p>
          )}

          <div className="w-full mt-6">
            <Button
              type="submit"
              className="w-full font-poppins cursor-pointer 
                        hover:scale-105 hover:shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
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
              Already have an account?
            </p>
            <Link
              href="/sign-in"
              className="text-blue-700 font-poppins font-sm"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>

      <div
        className="lg:w-1/2 h-screen bg-[url(/sign-up-side-photo.jpg)] bg-cover 
            rounded-tl-[30px] rounded-bl-[30px] hidden lg:block"
      />

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-2xl text-center mb-3">
            Zonify – Terms & Policy
          </h3>
          <p className="text-center text-sm text-gray-400 mb-4">
            Effective Date: October 25, 2025 | Last Updated: October 25, 2025
          </p>
          <div className="divider border-gray-700"></div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[70vh] pr-3  text-sm leading-relaxed text-black">
            <p>
              Welcome to <strong>Zonify</strong>, a real estate booking and
              zoning platform that helps users explore property listings, zoning
              details, and connect with verified property owners or agents. By
              using our website or mobile services, you agree to the following
              Terms and Policies.
            </p>

            <section>
              <h4 className="font-semibold text-lg mb-1">
                1. Property Listings
              </h4>
              <p>
                Zonify displays properties provided by owners, agents, or
                developers. While we make every effort to ensure the accuracy of
                property details (location, pricing, zoning information, and
                photos), Zonify does not guarantee that all information is
                complete, current, or error-free. We recommend users verify
                details directly with property representatives before making
                decisions.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-1">
                2. Booking & Site Visits
              </h4>
              <p>
                Users can request property visits, consultations, or bookings
                through our platform. Visit confirmation and scheduling are
                managed directly between users and the respective property
                agents or owners. Zonify acts only as a connecting platform and
                is not responsible for visit cancellations, disputes, or
                financial transactions.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-1">
                3. User Accounts & Data
              </h4>
              <p>
                To use certain features (like saving listings or scheduling
                visits), users may be required to create an account. You are
                responsible for maintaining the confidentiality of your account
                credentials and agree to provide accurate information. Zonify
                will not be liable for unauthorized access to your account due
                to negligence or credential sharing.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-1">4. Privacy Policy</h4>
              <p>
                We value your privacy. Zonify collects only the information
                necessary to facilitate property listings, booking, and
                communication. Your data will never be sold to third parties. It
                may, however, be shared with verified partners only for
                service-related purposes (such as scheduling a visit).
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-1">
                5. Zoning & Legal Information
              </h4>
              <p>
                Zonify provides zoning information sourced from public or
                verified datasets. We do not provide legal or financial advice.
                Users should independently confirm zoning regulations or land
                use restrictions with the relevant authorities before purchasing
                or developing any property.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-1">
                6. User Responsibilities
              </h4>
              <ul className="list-disc ml-6 space-y-1">
                <li>Do not upload false or misleading property information.</li>
                <li>Respect all local property laws and regulations.</li>
                <li>
                  Use Zonify’s platform only for lawful real estate browsing and
                  booking purposes.
                </li>
                <li>
                  Report suspicious or fraudulent listings to our support team
                  immediately.
                </li>
              </ul>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-1">
                7. Payments & Transactions
              </h4>
              <p>
                All monetary transactions (deposits, bookings, or purchases)
                occur directly between users and property representatives.
                Zonify does not handle, store, or guarantee any financial
                transaction. We strongly encourage users to confirm payment
                legitimacy before transferring any funds.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-1">
                8. Limitation of Liability
              </h4>
              <p>
                Zonify provides a platform for property discovery and zoning
                insights “as is.” We are not responsible for any direct,
                indirect, or consequential loss arising from use of the platform
                or reliance on property information displayed here.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-1">9. Policy Updates</h4>
              <p>
                Zonify may update these terms periodically to improve
                transparency and compliance. Any major updates will be reflected
                on this page with the “Last Updated” date. Continued use of
                Zonify after changes implies acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-1">10. Contact Us</h4>
              <p>
                If you have questions, complaints, or suggestions about our
                Terms & Policy, please contact us at:
              </p>
              <p className="mt-1 font-medium text-gray-600">
                📧 support@zonify.com
              </p>
            </section>
          </div>
        </div>
      </dialog>
    </div>
  );
}
