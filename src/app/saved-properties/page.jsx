"use client";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { BookmarkContext } from "@/providers/BookmarkProvider";
import { CiBookmark } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  getBookmarks,
  postToBookmark,
  removeFromBookmark,
} from "@/lib/property";
import PropertyPopUP from "@/components/features/PropertyPopUP/PropertyPopUp";
import { showCustomSwal } from "@/components/ui/CustomSwal";

export default function SavedProperties() {
  // const { bookmarks, removeBookmark } = useContext(BookmarkContext);
  const [bookmarks, setBookmarks] = useState([]);
  const [bigPopUpMounted, setBigPopUpMounted] = useState(false);
  const [bigPopUp, setBigPopUp] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const data = await getBookmarks();
        console.log("Fetched bookmarks:", data);
        setBookmarks(data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, []);

  const openPropertyPopup = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setBigPopUpMounted(true);
    // animate in
    requestAnimationFrame(() => setBigPopUp(true));
  };

  const handleToggleFavorite = async (bookmarkItem) => {
    const propId = bookmarkItem.property?.id;
    if (!propId) return;

    const currentlyFav = !!bookmarkItem.property?.is_favorite;

    // optimistic update
    setBookmarks((prev) =>
      prev.map((b) =>
        b.id === bookmarkItem.id
          ? { ...b, property: { ...b.property, is_favorite: !currentlyFav } }
          : b
      )
    );

    try {
      let resp;
      if (currentlyFav) {
        resp = await removeFromBookmark(propId);
      } else {
        resp = await postToBookmark(propId);
      }

      if (resp && (resp.status === 200 || resp.status === 201)) {
        // refresh canonical bookmarks list
        const data = await getBookmarks();
        
        setBookmarks(data);
      } else {
        // revert optimistic
        setBookmarks((prev) =>
          prev.map((b) =>
            b.id === bookmarkItem.id
              ? { ...b, property: { ...b.property, is_favorite: currentlyFav } }
              : b
          )
        );
        showCustomSwal({
          icon: "error",
          title: "Error",
          text: "Could not update favorite.",
        });
      }
    } catch (err) {
      console.error("Error toggling favorite in saved page:", err);
      // revert optimistic
      setBookmarks((prev) =>
        prev.map((b) =>
          b.id === bookmarkItem.id
            ? { ...b, property: { ...b.property, is_favorite: currentlyFav } }
            : b
        )
      );
      showCustomSwal({
        icon: "error",
        title: "Error",
        text: "Network error. Please try again.",
      });
    }
  };

  return (
    <div className="p-9 w-full max-w-[1300px] mx-auto">
      <div className="flex">
        <Link
          href="/dashboard"
          className="font-poppins px-3 py-2 rounded-lg flex justify-between bg-black text-white "
        >
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
      </div>

      <div className="lg:w-7xl mx-auto mt-8 px-2">
        {bookmarks.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-500 text-lg font-medium bg-gray-50 border border-dashed border-gray-300 px-6 py-4 rounded-md shadow-sm">
              No bookmarks found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {bookmarks.map((item) => (
              <div className="shadow-xl p-4 rounded-sm" key={item.id}>
                <div
                  className="relative w-full h-[50vh] cursor-pointer"
                  onClick={() => openPropertyPopup(item.property.id)}
                >
                  <Image
                    src={item.property.image}
                    alt="Image"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center justify-between mt-4">
                  <h1
                    className="font-semibold font-poppins text-[#000000] text-2xl cursor-pointer"
                    onClick={() => openPropertyPopup(item.property.id)}
                  >
                    ${item?.property?.price}
                  </h1>
                  <button onClick={() => handleToggleFavorite(item)}>
                    {item.property.is_favorite ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>
                <div onClick={() => openPropertyPopup(item.property.id)} >
                  <p className="font-poppins text-[#000000] text-sm mt-1">
                    {item.property.beds} beds | {item.property.baths} baths
                  </p>
                  <p className="font-poppins text-[#000000] text-sm truncate">
                    {item.details}
                  </p>
                  <p className="font-poppins text-[#000000] text-sm mt-1">
                    {item?.property?.address?.street},{" "}
                    {item?.property?.address?.city},{" "}
                    {item?.property?.address?.state}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Property popup overlay (match dashboard structure for scroll) */}
      {bigPopUpMounted && (
        <div
          className={`fixed inset-0 z-50 bg-transparent overflow-y-auto
            transition-all duration-300 ease-out ${
              bigPopUp ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
        >
          <PropertyPopUP
            id={selectedPropertyId}
            setBigPopUp={setBigPopUpMounted}
          />
        </div>
      )}
    </div>
  );
}
