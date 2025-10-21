'use client'
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { BookmarkContext } from "@/providers/BookmarkProvider";
import { CiBookmark } from "react-icons/ci";
import { Button } from "@/components/ui/button";

export default function SavedProperties() {

  const { bookmarks, removeBookmark } = useContext(BookmarkContext);

  return (
    <div className="p-9 w-full max-w-[1300px] mx-auto">
      <div className="flex">
        <Link href="/dashboard" className="font-poppins px-3 py-2 rounded-lg flex justify-between bg-black text-white ">
          <ChevronLeft />
          <p>Back to search</p>
        </Link>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between pt-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-poppins font-medium text-3xl">
            Saved Properties
          </h1>
          <p className="font-poppins text-[#877E7E]">
            Manage your saved property listings and track their details
          </p>
        </div>
        <select name="" id="" className="border border-gray-200 py-2 px-4">
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
      </div>

      <div className="lg:w-7xl mx-auto mt-8 px-2">
        {bookmarks.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-500 text-lg font-medium bg-gray-50 border border-dashed border-gray-300 px-6 py-4 rounded-md shadow-sm">
              No bookmarks found
            </p>
          </div>
        ) : (
          <div>
            {bookmarks.map((item) => (
              <div className="shadow-xl p-4 rounded-sm" key={item.id}>
                <div className="relative w-full h-[50vh]">
                  <Image
                    src={item.image}
                    alt="Image"
                    fill
                    className="object-cover"
                  />
                </div>

                <h1 className="font-semibold font-poppins text-[#000000] text-2xl">
                  ${item.price}
                </h1>
                <p className="font-poppins text-[#000000] text-sm mt-1">
                  {item.beds} beds | {item.baths} baths
                </p>
                <p className="font-poppins text-[#000000] text-sm truncate">
                  {item.details}
                </p>
                <p className="font-poppins text-[#000000] text-sm mt-1">
                  {item.address.street}, {item.address.city},{" "}
                  {item.address.state}
                </p>
                <Button
                  onClick={() => removeBookmark(item.id)}
                  className="border-2 rounded-none text-lg cursor-pointer text-red-500 hover:bg-red-100"
                  variant="none"
                >
                  <CiBookmark />
                  Remove
                </Button>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
