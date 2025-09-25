import ListingCard from "@/components/listingCard";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Listings() {
  return (
    <div className="mx-40 my-10 relative">
      <div className="flex">
        <ChevronLeft />
        <Link href="/dashboard" className="font-poppins text-[#3F3C3C]">
          Back to seach
        </Link>
      </div>
      <Image
        src="/Image/management/background/background_photo_of_listings.jpg"
        height={400}
        width={1100}
        alt="background"
        className="mt-3 w-full h-[413px]"
      />
      <div className="absolute top-2/4 left-2/12">
        <h1 className="text-white text-4xl mb-5">Data Source Management</h1>
        <div className="grid grid-cols-3 gap-5  max-w-5xl  top-20">
          <ListingCard imageName={"zillow"} title={"Zillow"} />
          <ListingCard imageName={"crexi"} title={"Crexi"} />
          <ListingCard imageName={"redfin"} title={"Redfin"} />
          <ListingCard imageName={"rexi"} title={"Coster"} />
          <ListingCard imageName={"loopnet"} title={"LoopNet"} />
          <ListingCard imageName={"zillow-2"} title={"Zillow"} />
        </div>
        <div className="flex justify-end items-center gap-6 py-8">
          <Link href="/dashboard">
            <button
              className="text-[#000000] font-poppins bg-[#FFFFFF] ring-2 
                ring-[#000000] px-4 py-1 mt-4 rounded-sm hover:bg-[#3F3C3C]
                hover:text-[#FFFFFF] cursor-pointer"
            >
              Back
            </button>
          </Link>
          <Link href="/dashboard">
            <button
              className="text-[#000000] font-poppins bg-[#FFFFFF] ring-2 
                ring-[#000000] px-4 py-1 mt-4 rounded-sm hover:bg-[#3F3C3C]
                hover:text-[#FFFFFF] cursor-pointer"
            >
              Save
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
