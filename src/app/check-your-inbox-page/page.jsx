import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function CheckYourInboxPage() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-6 text-center">
            <div className="w-15 h-15 rounded-full bg-[#DCFCE7] relative">
                <Image src="/check.svg" alt="check-mark" fill />
            </div>
            <h1 className="text-[#000000] font-semibold font-poppins text-4xl">Check your inbox!</h1>

            <div className="flex flex-col items-center justify-center">
                <p className="text-[#1C1C1C] font-poppins text-xl">We’ve sent password reset link to
                    your email address.</p>
                <p className="text-[#1C1C1C] font-poppins text-xl">Please follow the instructions to
                    reset your password.</p>
            </div>

            <p className="text-[#8F8C8C] font-poppins">Don’t receive the email? Check your spam
                folder.</p>

            <div className="w-full max-w-sm mt-1">
                <Link href="">
                    <Button className="w-full font-poppins cursor-pointer hover:scale-105 
                    hover:shadow-lg">Send Reset Link</Button>
                </Link>
            </div>

            <Link href="" className="text-[#FF3D00] font-poppins">Resend email (wait 30s)</Link>
        </div>
    );
}
