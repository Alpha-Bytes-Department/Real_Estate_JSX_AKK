"use client";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbLogin } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { showCustomSwal, showSuccess } from "@/components/ui/CustomSwal";
import { clearAuth } from "@/lib/auth";
import { profileSetting, profileSecuritySetting } from "@/lib/profile_setting";
import { id } from "zod/v4/locales";

export default function AccountSettings() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Personal info states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Password states
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const activeLink = true;
  const unactiveLink = false;

  // Auth guard and user data loading
  useEffect(() => {
    const authUser =
      typeof window !== "undefined" ? localStorage.getItem("auth_user") : null;
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    if (!authUser || !token) {
      (async () => {
        await showCustomSwal({
          icon: "warning",
          title: "Login required",
          text: "Please sign in to access account settings.",
          confirmButtonText: "OK",
        });
        router.push(
          `/sign-in?loginRequired=1&redirect=${encodeURIComponent(
            "/account-settings"
          )}`
        );
      })();
      return;
    }

    try {
      const userData = JSON.parse(authUser);
      setUser(userData);
      setName(userData.name || "");
      if (userData.profile_pic) {
        if (userData.profile_pic.startsWith("http")) {
          setProfileImagePreview(userData.profile_pic);
        } else {
          setProfileImagePreview(
            `http://10.10.12.51:4000${userData.profile_pic}`
          );
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error parsing user data:", error);
      setUser({});
      setLoading(false);
    }
  }, [router]);

  // Handle profile image selection
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("image/")) {
      await showCustomSwal({
        icon: "error",
        title: "Invalid file",
        text: "Please select an image file.",
        confirmButtonText: "OK",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      await showCustomSwal({
        icon: "error",
        title: "File too large",
        text: "Please select an image smaller than 2MB.",
        confirmButtonText: "OK",
      });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setProfileImagePreview(e.target.result);
    reader.readAsDataURL(file);
    setProfileImage(file);

    // Upload image immediately
    try {
      const formData = new FormData();
      formData.append("profile_pic", file);
      const response = await profileSetting(formData);

      await showSuccess("Image Updated", "Profile image updated successfully.");

      const updateUser = {
        email: response.data.email,
        profile_pic: response.data.profile_pic,
        name: response.data.name,
        id: response.data.id,
      };

      localStorage.setItem("auth_user", JSON.stringify(updateUser));
      setUser(updateUser);
    } catch (error) {
      console.error("Error uploading image:", error);
      await showCustomSwal({
        icon: "error",
        title: "Upload Failed",
        text: "Failed to upload image. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      await showCustomSwal({
        icon: "error",
        title: "Invalid Name",
        text: "Name cannot be empty.",
        confirmButtonText: "OK",
      });
      return;
    }

    setIsUpdatingProfile(true);
    try {
      const response = await profileSetting({ name });

      await showSuccess(
        "Profile Updated",
        "Your name has been updated successfully."
      );

      // Update user data
      const updatedUser = { ...user, name };
      localStorage.setItem("auth_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditingProfile(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      await showCustomSwal({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update profile. Please try again.",
        confirmButtonText: "OK",
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // Handle password change
  const handleChangePassword = async () => {
    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      await showCustomSwal({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all password fields.",
        confirmButtonText: "OK",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      await showCustomSwal({
        icon: "error",
        title: "Passwords Don't Match",
        text: "New password and confirm password must match.",
        confirmButtonText: "OK",
      });
      return;
    }

    if (newPassword.length < 8) {
      await showCustomSwal({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 8 characters long.",
        confirmButtonText: "OK",
      });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await profileSecuritySetting({
        old_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      await showSuccess(
        "Password Changed",
        "Your password has been changed successfully."
      );

      // Clear password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordSection(false);
    } catch (error) {
      console.error("Error changing password:", error);
      await showCustomSwal({
        icon: "error",
        title: "Password Change Failed",
        text:
          error?.response?.data?.message ||
          "Failed to change password. Please try again.",
        confirmButtonText: "OK",
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    const result = await showCustomSwal({
      icon: "warning",
      title: "Confirm Logout",
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      clearAuth();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 bg-[#F9FAFB] min-h-screen">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 w-full justify-center py-4 lg:my-10 px-4 lg:px-0">
        {/* account setting div  */}
        <div className="flex flex-col justify-between lg:mt-2 order-2 lg:order-1">
          <div className="w-full flex flex-col gap-4">
            <h1 className="text-[#000000] font-poppins font-semibold text-2xl lg:text-3xl text-center">
              Account Settings
            </h1>
            <div className="flex flex-col gap-3 lg:gap-5">
              <Link
                href="/account-settings"
                className={`flex justify-between items-center p-3 rounded-lg shadow-md transition-transform duration-200 ease-in-out 
               active:scale-95 ${
                 activeLink ? "bg-black text-white" : "bg-white text-black"
               }`}
              >
                <p className="font-poppins text-sm lg:text-base">
                  Profile Settings
                </p>
                <FaUser className="text-lg lg:text-xl" />
              </Link>
              <Link
                href="/saved-properties"
                className={`flex justify-between items-center p-3 rounded-lg shadow-md transition-transform duration-200 ease-in-out 
               active:scale-95 ${
                 unactiveLink ? "bg-black text-white" : "bg-white text-black"
               }`}
              >
                <p className="font-poppins text-sm lg:text-base">
                  Saved Properties
                </p>
                <FaBookmark className="text-lg lg:text-xl" />
              </Link>
              <Link
                href="/listings"
                className={`flex justify-between items-center p-3 rounded-lg shadow-md transition-transform duration-200 ease-in-out 
               active:scale-95 ${
                 unactiveLink ? "bg-black text-white" : "bg-white text-black"
               }`}
              >
                <p className="font-poppins text-sm lg:text-base">Listings</p>
                <RxHamburgerMenu className="text-lg lg:text-xl" />
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
                <p className="font-poppins text-sm lg:text-base">
                  Back to Dashboard
                </p>
              </Link>
              <button
                onClick={handleLogout}
                className={`flex justify-between items-center p-3 rounded-lg shadow-md transition-transform duration-200 ease-in-out 
               active:scale-95 ${
                 unactiveLink ? "bg-black text-white" : "bg-white text-black"
               }`}
              >
                <p className="font-poppins text-sm lg:text-base">Logout</p>
                <TbLogin className="text-lg lg:text-xl" />
              </button>
            </div>
          </div>
        </div>
        <div className="order-1 py-3 lg:order-2 w-full lg:w-auto">
          {/* Personal Information & Security Section */}
          <div className="w-full max-w-4xl lg:w-[900px] bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="px-4 lg:px-6 py-4 border-b border-black">
              <h1 className="text-[#000000] font-poppins font-semibold text-xl lg:text-2xl">
                Account Settings
              </h1>
            </div>

            {/* Personal Information */}
            <div className="p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-8">
                {/* Profile Image */}
                <div className="flex flex-col items-center w-full lg:w-auto">
                  <div className="relative">
                    <Image
                      src={profileImagePreview || "/Image/Avater/Avater.png"}
                      className="rounded-full object-cover w-24 h-24 lg:w-36 lg:h-36 border-4 border-black"
                      height={120}
                      width={120}
                      alt="profile picture"
                    />
                    <input
                      type="file"
                      id="profileImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() =>
                      document.getElementById("profileImage").click()
                    }
                    className="mt-3 text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black"
                    variant="outline"
                  >
                    Change Photo
                  </Button>
                </div>

                {/* Personal Info Fields */}
                <div className="flex-1 w-full">
                  <div className="space-y-4 lg:space-y-6">
                    {/* Name Field */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <Label className="text-[#000000] font-poppins text-base lg:text-lg font-medium">
                          Name
                        </Label>
                        {!isEditingProfile && (
                          <Button
                            onClick={() => setIsEditingProfile(true)}
                            variant="outline"
                            className="px-3 lg:px-4 py-2 text-sm w-fit self-start sm:self-auto"
                          >
                            Edit
                          </Button>
                        )}
                      </div>
                      <div className="mt-2">
                        {isEditingProfile ? (
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <Input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="font-poppins text-base lg:text-lg flex-1"
                              placeholder="Enter your name"
                            />
                            <div className="flex gap-2 w-full sm:w-auto">
                              <Button
                                onClick={handleUpdateProfile}
                                disabled={isUpdatingProfile}
                                className="px-3 lg:px-4 py-2 text-sm flex-1 sm:flex-none"
                              >
                                {isUpdatingProfile ? "Saving..." : "Save"}
                              </Button>
                              <Button
                                onClick={() => {
                                  setIsEditingProfile(false);
                                  setName(user?.name || "");
                                }}
                                variant="outline"
                                className="px-3 lg:px-4 py-2 text-sm flex-1 sm:flex-none"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-base lg:text-lg font-poppins text-gray-800 py-2">
                            {user?.name || "No name set"}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email Field (Read-only) */}
                    <div>
                      <Label className="text-[#000000] font-poppins text-base lg:text-lg font-medium">
                        Email
                      </Label>
                      <p className="text-base lg:text-lg font-poppins text-gray-600 mt-2 py-2 break-all">
                        {user?.email || "No email"}
                      </p>
                    </div>

                    {/* Change Password Button */}
                    <div>
                      <Button
                        onClick={() =>
                          setShowPasswordSection(!showPasswordSection)
                        }
                        className="px-4 lg:px-6 py-2 bg-gray-800 hover:bg-gray-900 w-full sm:w-auto"
                      >
                        {showPasswordSection
                          ? "Cancel Password Change"
                          : "Change Password"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Change Section (Collapsible) */}
              {showPasswordSection && (
                <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200">
                  <h3 className="text-base lg:text-lg font-semibold font-poppins text-[#000000] mb-4">
                    Change Password
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    {/* Current Password */}
                    <div className="relative">
                      <Label className="text-[#000000] font-poppins text-sm lg:text-base">
                        Current Password
                      </Label>
                      <div className="relative mt-2">
                        <Input
                          type={showPassword1 ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Enter current password"
                          className="pr-10 font-poppins"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() => setShowPassword1(!showPassword1)}
                        >
                          {showPassword1 ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div className="relative">
                      <Label className="text-[#000000] font-poppins text-sm lg:text-base">
                        New Password
                      </Label>
                      <div className="relative mt-2">
                        <Input
                          type={showPassword2 ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="pr-10 font-poppins"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
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

                    {/* Confirm Password */}
                    <div className="relative lg:col-span-2">
                      <Label className="text-[#000000] font-poppins text-sm lg:text-base">
                        Confirm New Password
                      </Label>
                      <div className="relative mt-2 max-w-full lg:max-w-md">
                        <Input
                          type={showPassword3 ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          className="pr-10 font-poppins"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() => setShowPassword3(!showPassword3)}
                        >
                          {showPassword3 ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Change Password Button */}
                  <div className="mt-4 lg:mt-6">
                    <Button
                      onClick={handleChangePassword}
                      disabled={isUpdatingPassword}
                      className="px-4 lg:px-6 py-2 bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                    >
                      {isUpdatingPassword
                        ? "Changing Password..."
                        : "Update Password"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
