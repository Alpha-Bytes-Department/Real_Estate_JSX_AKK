import ListingCard from '@/components/listingCard';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Listings() {
    return (
        <div className="w-full min-h-screen p-9">
            <div className="flex">
                <ChevronLeft />
                <Link href="/dashboard" className="font-poppins text-[#3F3C3C]">Back</Link>
            </div>
            {/* <div className="w-full h-[400px] relative flex items-center justify-center">
                <Image src="/background-photo-of-listings.jpg" alt="background" fill
                    className="bg-cover" />
                <h1 className="absolute font-poppins text-[#FFFFFF] font-bold 
                text-3xl z-50">Data Source Management</h1>
            </div> */}
            <div className="w-full h-[400px] bg-[url(/background_photo_of_listings.jpg)]
            bg-cover relative flex items-center justify-center mt-4">
                <h1 className="absolute font-poppins text-[yellow] lg:text-[blue] font-bold 
                text-3xl text-center z-50">Data Source Management</h1>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-8 pl-14 pr-14 pt-8">
                <ListingCard imageName={"zillow"} title={"Zillow"} />
                <ListingCard imageName={"crexi"} title={"Crexi"} />
                <ListingCard imageName={"redfin"} title={"Redfin"} />
                <ListingCard imageName={"rexi"} title={"Coster"} />
                <ListingCard imageName={"loopnet"} title={"LoopNet"} />
                <ListingCard imageName={"zillow-2"} title={"Zillow"} />
            </div>

            <div className="flex gap-6 lg:pl-400 pt-8">
                <button className="text-[#000000] font-poppins bg-[#FFFFFF] ring-2 
                ring-[#000000] px-4 py-1 mt-4 rounded-sm hover:bg-[#3F3C3C]
                hover:text-[#FFFFFF] cursor-pointer">Back</button>
                <button className="text-[#000000] font-poppins bg-[#FFFFFF] ring-2 
                ring-[#000000] px-4 py-1 mt-4 rounded-sm hover:bg-[#3F3C3C]
                hover:text-[#FFFFFF] cursor-pointer">Save</button>
            </div>
        </div>
    );
}










