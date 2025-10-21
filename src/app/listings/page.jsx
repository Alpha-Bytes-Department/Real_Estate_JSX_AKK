import ListingCard from "@/components/listingCard";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Listings() {
  return (
    <div className="mx-10 lg:mx-40 my-10 relative">
      <Link href="/dashboard" className="flex font-poppins text-[#3F3C3C]">
        <ChevronLeft />
        Back to seach
      </Link>
      <Image
        src="/Image/management/background/background_photo_of_listings.jpg"
        height={400}
        width={1100}
        alt="background"
        className="mt-3 w-full h-[413px]"
      />
      
      <div className="flex items-center justify-center mt-8">
        <ListingCard imageName={"zillow"} title={"Zillow"}/>
      </div>

      {/* <div className="lg:absolute top-1/2 left-1/6">
        <h1 className="text-white text-4xl mb-5">Data Source Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl top-20">
          <ListingCard imageName={"zillow"} title={"Zillow"} />
          <ListingCard imageName={"crexi"} title={"Crexi"} />
          <ListingCard imageName={"redfin"} title={"Redfin"} />
          <ListingCard imageName={"rexi"} title={"Coster"} />
          <ListingCard imageName={"loopnet"} title={"LoopNet"} />
          <ListingCard imageName={"zillow-2"} title={"Zillow"} />
        </div>
        <div className="flex lg:justify-end items-center gap-6 py-8">
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
      </div> */}
    </div>
  );
}
