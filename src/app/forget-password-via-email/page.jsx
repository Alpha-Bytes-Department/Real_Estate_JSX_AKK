"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from 'lucide-react';

export default function ForgetPasswordViaEmail() {
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-3">
            <h1 className="font-poppins font-semibold text-5xl text-[#000000] text-center">Set a New
                Password</h1>
            <p className="font-poppins text-2xl text-[#8F8C8C] text-center">Your new password must be
                different from previous used</p>
            <p className="font-poppins text-2xl text-[#8F8C8C]">passwords.</p>

            <div className="relative w-full max-w-sm mt-4 grid gap-3">
                <Input
                    type={showPassword1 ? "text" : "password"}
                    placeholder="New Password"
                    className="pr-10 font-poppins" // leave space for the eye button
                />
                <Button variant="ghost" className="absolute right-0 top-1/2 -translate-1/2 cursor-pointer"
                    onClick={() => setShowPassword1(!showPassword1)}>
                    {showPassword1 ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </Button>
            </div>

            <div className="relative w-full max-w-sm mt-4 grid gap-3">
                <Input
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="pr-10 font-poppins" // leave space for the eye button
                />
                <Button variant="ghost" className="absolute right-0 top-1/2 -translate-1/2 cursor-pointer"
                    onClick={() => setShowPassword2(!showPassword2)}>
                    {showPassword2 ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </Button>
            </div>

            <div className="w-full max-w-sm mt-4">
                <Button className="w-full font-poppins cursor-pointer  
                hover:scale-105 hover:shadow-lg">Confirm</Button>
            </div>
        </div>
    );
}
