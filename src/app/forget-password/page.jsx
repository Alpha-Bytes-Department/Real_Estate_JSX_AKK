import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IoIosArrowRoundBack } from "react-icons/io";

export default function ForgetPassword() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-8 text-center">
            <h1 className="font-semibold font-poppins text-[#000000] text-4xl">Forget Your
                Password?</h1>
            <p className="text-[#8F8C8C] text-xl font-poppins">No worries! Enter your email below and
                we’ll send you a link to reset it.</p>

            <div className="w-full max-w-sm mt-6">
                <Input type="email" id="email" placeholder="Enter your email" />
            </div>

            <div className="w-full max-w-sm mt-1">
                <Link href="/check-your-inbox-page">
                    <Button className="w-full font-poppins cursor-pointer hover:scale-105 
                    hover:shadow-lg">Send Reset Link</Button>
                </Link>
            </div>

            <div className="flex flex-col items-center justify-center">
                <p className="text-[#8F8C8C] font-poppins">A password reset link will be sent to your
                    email address if it’s</p>
                <p className="text-[#8F8C8C] font-poppins">associated with an account</p>
            </div>

            <div className="flex gap-1">
                <IoIosArrowRoundBack className="translate-y-1/4" />
                <Link href="/sign-in" className="text-[#1E1E1E] font-poppins">Back to Login</Link>
            </div>
        </div>
    );
}
