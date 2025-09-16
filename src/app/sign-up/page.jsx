"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox"

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="w-full h-screen flex">
            <div className="w-full lg:w-1/2 h-screen flex flex-col items-center justify-center">
                <form action="">
                    <h1 className="text-[#000000] font-poppins font-medium text-2xl">
                        Get Started Now</h1>

                    <div className="grid w-full max-w-sm items-center gap-3 mt-6">
                        <Label htmlFor="name" className="text-[#000000] font-poppins">Name</Label>
                        <Input type="text" id="name" placeholder="Enter your name" />
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-3 mt-4">
                        <Label htmlFor="email" className="text-[#000000] font-poppins">Email address</Label>
                        <Input type="email" id="email" placeholder="Enter your email" />
                    </div>

                    <div className="relative w-full max-w-sm mt-4 grid gap-3">
                        <Label htmlFor="email" className="text-[#000000] font-poppins">Password</Label>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pr-10 font-poppins" // leave space for the button
                        />
                        <Button variant="ghost" className="absolute right-1 top-1/2 -translate-1/8
                        cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </Button>
                    </div>

                    <div className="relative w-full max-w-sm mt-4 grid gap-3">
                        <Label htmlFor="email" className="text-[#000000] font-poppins">Confirm
                            Password</Label>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Again enter your password"
                            className="pr-10 font-poppins" // leave space for the button
                        />
                        <Button variant="ghost" className="absolute right-1 top-1/2 -translate-1/8 
                        cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </Button>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                        <Checkbox id="terms-and-policy" />
                        <Label htmlFor="terms">I agree to the<Link href="" className="text-[#0F3DDE]">
                            terms & policy</Link></Label>
                    </div>

                    <div className="w-full max-w-sm mt-6">
                        <Link href="/dashboard">
                            <Button className="w-full cursor-pointer hover:scale-105 
                            hover:shadow-lg">Sign Up</Button>
                        </Link>
                    </div>

                    <div className="w-full max-w-sm flex gap-2 mt-10">
                        <div className="w-1/2 h-[1px] bg-gray-300" />
                        <p className="text-[#000000] font-poppins -translate-y-1/2 text-sm">OR</p>
                        <div className="w-1/2 h-[1px] bg-gray-300" />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-sm mt-4">
                        <Button className="flex gap-3 cursor-pointer bg-[#D9D9D9] hover:bg-[#D9D9D9]">
                            <Image src="/Google_Icon.svg" alt="apple_icon" height={10} width={15}
                                className="" />
                            <Label htmlFor="google-sign-in" className="text-[#000000] font-poppins 
                            font-sm cursor-pointer">Sign in with Google</Label>
                        </Button>

                        <Button className="flex gap-3 cursor-pointer bg-[#D9D9D9] hover:bg-[#D9D9D9]">
                            <Image src="/Apple_Icon.svg" alt="apple_icon" height={10} width={15}
                                className="" />
                            <Label htmlFor="apple-sign-in" className="text-[#000000] font-poppins 
                            font-sm cursor-pointer">Sign in with Apple</Label>
                        </Button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm pt-6">
                        <p className="text-[#000000] font-poppins">Already have an account?</p>
                        <Link href="/sign-in" className="text-blue-700 font-poppins font-sm">
                            Sign In</Link>
                    </div>
                </form>
            </div>

            <div className="lg:w-1/2 h-screen bg-[url(/sign-up-side-photo.jpg)] bg-cover 
            rounded-tl-[30px] rounded-bl-[30px] hidden lg:block"/>
        </div>
    );
}
