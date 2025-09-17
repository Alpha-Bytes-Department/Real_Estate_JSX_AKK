"use client"
import Image from "next/image";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

export default function AccountSettings() {
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
    return (
        <div className="w-full h-screen flex gap-12 bg-[#F9FAFB]">
            <div className="w-1/4 h-screen hidden lg:flex flex-col justify-between">
                <div className="flex flex-col gap-4 pt-[152px]">
                    <h1 className="text-[#000000] font-poppins font-semibold text-3xl text-center">
                        Account Settings</h1>
                    <button>
                        <div className="w-full h-[40px] flex items-center justify-between bg-[#D9D9D9] 
                                        mt-3 rounded-sm cursor-pointer">
                            <p className="text-[#000000] font-poppins pl-3">Profile Settings</p>
                            <Image src="user-logo.svg" alt="user-logo" width={20} height={20}
                                className="" />
                        </div>
                    </button>

                    <button>
                        <div className="w-full h-[40px] flex items-center justify-between 
                                            bg-[#D9D9D9] rounded-sm cursor-pointer">
                            <p className="text-[#000000] font-poppins pl-3">Saved Properties</p>
                            <Image src="bookmark.svg" alt="bookmark-logo" width={20} height={20}
                                className="" />
                        </div>
                    </button>

                    <button>
                        <div className="w-full h-[40px] flex items-center justify-between 
                                            bg-[#D9D9D9] rounded-sm cursor-pointer">
                            <p className="text-[#000000] font-poppins pl-3">Listings</p>
                            <Image src="list.svg" alt="list-logo" width={20} height={20}
                                className="" />
                        </div>
                    </button>
                </div>

                <div className="flex flex-col gap-4 pb-[152px]">
                    <button>
                        <div className="w-full h-[40px] bg-[#D9D9D9] rounded-sm cursor-pointer">
                            <p className="text-[#000000] font-poppins pt-2 pl-3">Privacy Policy</p>
                        </div>
                    </button>

                    <button>
                        <div className="w-full h-[40px] bg-[#D9D9D9] rounded-sm cursor-pointer">
                            <p className="text-[#000000] font-poppins pt-2 pl-3">Terms of Services</p>
                        </div>
                    </button>
                </div>
            </div>


            <div className="w-full lg:w-3/4 h-screen">
                <div className="w-full h-1/3 bg-[#FFFFFF] p-7">
                    <form action="">
                        <h1 className="text-[#000000] font-poppins font-semibold text-2xl">
                            Personal Information</h1>
                        <div className="w-full h-[1.5px] bg-[#000000] mt-3" />

                        <div className="flex flex-col lg:flex-row gap-1 lg:gap-12">
                            <div className="grid w-full max-w-sm items-center gap-3 mt-6">
                                <Label htmlFor="name" className="text-[#000000] font-poppins">
                                    Name</Label>
                                <Input type="text" id="name" placeholder="Enter your name" />
                            </div>

                            <div className="grid w-full max-w-sm items-center gap-3 mt-4">
                                <Label htmlFor="email" className="text-[#000000] font-poppins">
                                    Email address</Label>
                                <Input type="email" id="email" placeholder="Enter your email" />
                            </div>
                        </div>

                        <div className="w-full max-w-[820px] flex justify-end mt-3 lg:mt-12">
                            <Button className="w-full max-w-[200px] font-poppins cursor-pointer  
                            hover:scale-105 hover:shadow-lg">Update Profile</Button>
                        </div>
                    </form>
                </div>

                <div className="w-full h-2/3 bg-[#FFFFFF] p-7 mt-24">
                    <form action="">
                        <h1 className="text-[#000000] font-poppins font-semibold text-2xl">
                            Security</h1>
                        <div className="w-full h-[1.5px] bg-[#000000] mt-3" />

                        <div className="flex flex-col">
                            <div className="relative w-full max-w-sm mt-4 grid gap-3">
                                <Label htmlFor="email" className="text-[#000000] font-poppins">Current
                                    Password</Label>
                                <Input
                                    type={showPassword1 ? "text" : "password"}
                                    placeholder="Enter your current password"
                                    className="pr-10 font-poppins" // leave space for the button
                                />
                                <Button variant="ghost" className="absolute right-1 top-1/2 -translate-1/8 
                        cursor-pointer" onClick={() => setShowPassword1(!showPassword1)}>
                                    {showPassword1 ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-1 lg:gap-12">
                                <div className="relative w-full max-w-sm mt-4 grid gap-3">
                                    <Label htmlFor="email" className="text-[#000000] font-poppins">
                                        New Password</Label>
                                    <Input
                                        type={showPassword2 ? "text" : "password"}
                                        placeholder="Enter your new password"
                                        className="pr-10 font-poppins" // leave space for the eye button
                                    />
                                    <Button variant="ghost" className="absolute right-1 top-1/2 
                                    -translate-1/8 cursor-pointer"
                                        onClick={() => setShowPassword2(!showPassword2)}>
                                        {showPassword2 ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>

                                <div className="relative w-full max-w-sm mt-4 grid gap-3">
                                    <Label htmlFor="email" className="text-[#000000] font-poppins">
                                        Confirm New Password</Label>
                                    <Input
                                        type={showPassword3 ? "text" : "password"}
                                        placeholder="Confirm your new password"
                                        className="pr-10 font-poppins" // leave space for the button
                                    />
                                    <Button variant="ghost" className="absolute right-1 top-1/2 
                                    -translate-1/8 cursor-pointer"
                                        onClick={() => setShowPassword3(!showPassword3)}>
                                        {showPassword3 ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-[820px] flex justify-end mt-3 lg:mt-12">
                            <Button className="w-full max-w-[200px] font-poppins cursor-pointer  
                            hover:scale-105 hover:shadow-lg">Change Password</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
