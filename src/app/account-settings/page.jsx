"use client";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbLogin } from "react-icons/tb";

export default function AccountSettings() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const activeLink = true;
  const unactiveLink = false;

  return (
    <div className="flex gap-12 bg-[#F9FAFB] h-screen">
      <div className="flex gap-12 w-full justify-center my-20">
        {/* account setting div  */}
        <div className="flex flex-col justify-between mt-10">
          <div className="w-full flex flex-col gap-6">
            <h1 className="text-[#000000] font-poppins font-semibold text-3xl text-center">
              Account Settings
            </h1>
            <div className="flex flex-col gap-5">
              <Link
                href="/account-settings"
                className={`flex justify-between items-center p-3 rounded-lg shadow-md transition-transform duration-200 ease-in-out 
               active:scale-95 ${
                 activeLink ? "bg-black text-white" : "bg-white text-black"
               }`}
              >
                <p className="font-poppins">Profile Settings</p>
                <FaUser className="text-xl" />
              </Link>
              <Link
                href="/account-settings"
                className={`flex justify-between items-center p-3 rounded-lg shadow-md transition-transform duration-200 ease-in-out 
               active:scale-95 ${
                 unactiveLink ? "bg-black text-white" : "bg-white text-black"
               }`}
              >
                <p className="font-poppins">Saved Properties</p>
                <FaBookmark className="text-xl" />
              </Link>
              <Link
                href="/account-settings"
                className={`flex justify-between items-center p-3 rounded-lg shadow-md transition-transform duration-200 ease-in-out 
               active:scale-95 ${
                 unactiveLink ? "bg-black text-white" : "bg-white text-black"
               }`}
              >
                <p className="font-poppins">Listings</p>
                <RxHamburgerMenu className="text-xl" />
              </Link>
              <Link
                href="/account-settings"
                className={`flex justify-between items-center p-3 rounded-lg shadow-md transition-transform duration-200 ease-in-out 
               active:scale-95 ${
                 unactiveLink ? "bg-black text-white" : "bg-white text-black"
               }`}
              >
                <p className="font-poppins">Logout</p>
                <TbLogin className="text-xl" />
              </Link>
            </div>
          </div>
          {/* privicy policy  */}
          <div className="w-full max-w-sm flex flex-col gap-8 pb-38">
            <div className="flex flex-col gap-5">
              <Link
                href="/account-settings"
                className={`w-full p-3 rounded-lg shadow-md transition-transform duration-200 ease-in-out 
               active:scale-95 ${
                 unactiveLink
                   ? "bg-black text-white"
                   : "bg-[#D9D9D9] text-black"
               }`}
              >
                <p className="font-poppins">Privacy Policy</p>
              </Link>
              <Link
                href="/account-settings"
                className={`w-full p-3 rounded-lg shadow-md transition-transform duration-200 ease-in-out 
               active:scale-95 ${
                 unactiveLink
                   ? "bg-black text-white"
                   : "bg-[#D9D9D9] text-black"
               }`}
              >
                <p className="font-poppins">Terms of Services</p>
              </Link>
              <Link
                href="/dashboard"
                className={`w-full p-3 rounded-lg shadow-md transition-transform duration-200 ease-in-out 
               active:scale-95 ${
                 unactiveLink
                   ? "bg-black text-white"
                   : "bg-[#D9D9D9] text-black"
               }`}
              >
                <p className="font-poppins">Back to Dashboard</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="">
          {/* personal information  */}
          <div className="flex flex-col w-[900px] rounded-lg shadow-lg">
            <h1 className="text-[#000000] font-poppins font-semibold text-2xl px-5 pt-3">
              Personal Information
            </h1>
            <div className="w-full border border-black mt-3" />
            <div className="flex gap-5 px-10 pb-10">
              {/* image will show here */}
              <div className="px-5 mt-3">
                <Image
                  src={"/Image/Avater/Avater.png"}
                  className=""
                  height={100}
                  width={100}
                  alt="avater"
                />
              </div>
              {/* form will show here  */}
              <form action="" className="mt-5 flex-1">
                <div className="flex flex-col gap-10 me-40">
                  {/* name  */}
                  <div className="flex flex-col gap-3">
                    <Label
                      htmlFor="name"
                      className="text-[#000000] font-poppins"
                    >
                      Name
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Enter your name"
                      className="font-poppins"
                    />
                    <div>
                      <Button className="font-poppins cursor-pointer hover:scale-105 hover:shadow-lg">
                        Edit
                      </Button>
                    </div>
                  </div>
                  {/* email address  */}
                  <div className="flex flex-col gap-3">
                    <Label
                      htmlFor="email"
                      className="text-[#000000] font-poppins"
                    >
                      Email address
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      className="font-poppins"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* security div  */}
          <div className="w-full bg-[#FFFFFF] mt-24 rounded-lg pb-10 shadow-lg">
            <h1 className="text-[#000000] font-poppins font-semibold text-2xl px-5 pt-3">
              Security
            </h1>
            <div className="w-full border border-black mt-3" />
            <form action="" className="mx-5">
              <div className="flex gap-10">
                <div className="relative w-full max-w-sm mt-4 grid gap-3">
                  <Label
                    htmlFor="email"
                    className="text-[#000000] font-poppins"
                  >
                    Current Password
                  </Label>
                  <Input
                    type={showPassword1 ? "text" : "password"}
                    placeholder="Enter your current password"
                    className="pr-10 font-poppins" // leave space for the button
                  />
                  <Button
                    variant="ghost"
                    className="absolute right-1 top-1/2 -translate-1/8
                        cursor-pointer"
                    onClick={() => setShowPassword1(!showPassword1)}
                  >
                    {showPassword1 ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="relative w-full max-w-sm mt-4 grid gap-3">
                  <Label
                    htmlFor="email"
                    className="text-[#000000] font-poppins"
                  >
                    New Password
                  </Label>
                  <Input
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Enter your new password"
                    className="pr-10 font-poppins" // leave space for the eye button
                  />
                  <Button
                    variant="ghost"
                    className="absolute right-1 top-1/2
                            -translate-1/8 cursor-pointer"
                    onClick={() => setShowPassword2(!showPassword2)}
                  >
                    {showPassword2 ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="relative w-full max-w-sm mt-4 grid gap-3">
                <Label htmlFor="email" className="text-[#000000] font-poppins">
                  Confirm New Password
                </Label>
                <Input
                  type={showPassword3 ? "text" : "password"}
                  placeholder="Confirm your new password"
                  className="pr-10 font-poppins" // leave space for the button
                />
                <Button
                  variant="ghost"
                  className="absolute right-1 top-1/2
                            -translate-1/8 cursor-pointer"
                  onClick={() => setShowPassword3(!showPassword3)}
                >
                  {showPassword3 ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="w-full max-w-[820px] flex justify-end mt-3 lg:mt-12">
                <Button
                  className="w-full max-w-[200px] font-poppins cursor-pointer
                    hover:scale-105 hover:shadow-lg"
                >
                  Change Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

