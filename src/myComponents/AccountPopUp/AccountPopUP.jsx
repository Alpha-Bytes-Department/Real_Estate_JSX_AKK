import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AccountPopUP = () => {
    return (
        <div
            className="absolute top-24 right-8 w-full max-w-[250px] pb-5 rounded-md
                    flex flex-col gap-4 bg-[#FFFFFF] px-5 shadow-lg z-50"
          >
            <div className="w-full pt-6">
              <Link href="/account-settings">
                <Button
                  className="w-full flex justify-between cursor-pointer bg-[#D9D9D9] 
                            hover:bg-[#D9D9D9]"
                >
                  <Label
                    htmlFor="profile-settings"
                    className="text-[#000000] font-poppins 
                                cursor-pointer text-base"
                  >
                    Profile Settings
                  </Label>
                  <Image
                    src="/user-logo.svg"
                    alt="user-logo"
                    height={15}
                    width={20}
                    className=""
                  />
                </Button>
              </Link>
            </div>

            <div className="w-full">
              <Link href="/saved-properties">
                <Button
                  className="w-full flex justify-between cursor-pointer bg-[#D9D9D9] 
                            hover:bg-[#D9D9D9]"
                >
                  <Label
                    htmlFor="profile-settings"
                    className="text-[#000000] 
                                    font-poppins cursor-pointer text-base"
                  >
                    Saved Properties
                  </Label>
                  <Image
                    src="/bookmark.svg"
                    alt="bookmark-logo"
                    height={15}
                    width={20}
                    className=""
                  />
                </Button>
              </Link>
            </div>

            <div className="w-full">
              <Link href="/listings">
                <Button
                  className="w-full flex justify-between cursor-pointer bg-[#D9D9D9] 
                            hover:bg-[#D9D9D9]"
                >
                  <Label
                    htmlFor="listings"
                    className="text-[#000000] font-poppins 
                                cursor-pointer text-base"
                  >
                    Listings
                  </Label>
                  <Image
                    src="/list.svg"
                    alt="list-logo"
                    height={15}
                    width={20}
                    className=""
                  />
                </Button>
              </Link>
            </div>

            <div className="w-full flex items-center gap-2 pl-4">
              <div className="w-full max-w-[80px] h-[1px] bg-[#8F8C8C]" />
              <p className="text-[#A4A3A3] font-poppins">and</p>
              <div className="w-full max-w-[80px] h-[1px] bg-[#8F8C8C]" />
            </div>

            <div className="w-full">
              <Button
                className="w-full flex items-center justify-center 
                                    cursor-pointer bg-[#D9D9D9] hover:bg-[#D9D9D9]"
              >
                <Label
                  htmlFor="privacy-policy"
                  className="text-[#000000] 
                                        font-poppins cursor-pointer text-base"
                >
                  Privacy Policy
                </Label>
              </Button>
            </div>

            <div className="w-full">
              <Button
                className="w-full flex items-center justify-center 
                                    cursor-pointer bg-[#D9D9D9] hover:bg-[#D9D9D9]"
              >
                <Label
                  htmlFor="terms-of-services"
                  className="text-[#000000] 
                                        font-poppins cursor-pointer text-base"
                >
                  Terms of Services
                </Label>
              </Button>
            </div>
            <div className="w-full">
              <Button
                className="w-full flex items-center justify-center 
                                    cursor-pointer bg-[#D9D9D9] hover:bg-[#D9D9D9]"
              >
                <Label
                  htmlFor="logout"
                  className="text-[#000000] 
                                        font-poppins cursor-pointer text-base"
                >
                  Logout
                </Label>
              </Button>
            </div>
          </div>
    );
};

export default AccountPopUP;