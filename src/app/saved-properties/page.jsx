import Image from "next/image";
import { ChevronLeft, Star } from "lucide-react";
import { Trash2 } from "lucide-react";
import Link from "next/link";

export default function SavedProperties() {
  return (
    <div className="p-9 w-full max-w-[1300px] mx-auto">
      <div className="flex">
        <ChevronLeft />
        <Link href="/dashboard" className="font-poppins text-[#3F3C3C]">
          Back to search
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

      <div className="pt-12">
        <nav>
          <ul className="flex gap-8 font-poppins text-[#8F8C8C]">
            <li>
              <Link href="">All</Link>
            </li>
            <li>
              <Link href="">Residential</Link>
            </li>
            <li>
              <Link href="">Commercial</Link>
            </li>
            <li>
              <Link href="">Favourites</Link>
            </li>
          </ul>
        </nav>
      </div>
      <hr />
      {/*----------------------- card item are here -------------------- */}
      <div>
        <div className="w-full  pt-8  shadow-xl rounded-xl">
          <div className="w-full relative">
            <Image
              src="/Image/properitse/home_pic_1.jpg"
              alt="home_pic_1"
              height={800}
              width={800}
              className=" h-[300px] w-full rounded-t-xl"
            />
            <div className="flex gap-4">
              <button>
                <div className="w-[35px] h-[35px] absolute top-2 right-2 rounded-full  bg-[white] flex items-center justify-center">
                  <Star />
                </div>
              </button>
              <button>
                <div
                  className="w-[35px] h-[35px] absolute top-2 right-14 rounded-full 
                            bg-[white] flex items-center justify-center"
                >
                  <Trash2 />
                </div>
              </button>
            </div>
          </div>
          <div className="pt-4 flex flex-col lg:flex-row lg:justify-between py-5 mx-5">
            <div className="flex flex-col gap-1">
              <p className="font-poppins text-[#000000] font-normal">Zilow</p>
              <h1 className="font-poppins font-semibold">
                123 Oak Street, Pittsburgh,PA
              </h1>
              <p className="text-sm">Residential 3 beds 2 bath 15,00 sqft</p>
              <h1 className="text-[#000000] font-poppins font-semibold pt-3">
                $85,000
              </h1>
            </div>
            <div className="flex flex-col text-end justify-between">
              <h1 className="font-poppins font-semibold">$1,250/unit</h1>
              <Link href="/property-details">
                <button
                  className="text-[#FFFFFF] bg-[#000000] px-4 py-2 rounded-lg mt-4
                        cursor-pointer font-poppins"
                >
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full  pt-8  shadow-xl rounded-xl">
          <div className="w-full relative">
            <Image
              src="/Image/properitse/home_pic_2.jpg"
              alt="home_pic_1"
              height={800}
              width={800}
              className=" h-[300px] w-full rounded-t-xl"
            />
            <div className="flex gap-4">
              <button>
                <div className="w-[35px] h-[35px] absolute top-2 right-2 rounded-full  bg-[white] flex items-center justify-center">
                  <Star />
                </div>
              </button>
              <button>
                <div
                  className="w-[35px] h-[35px] absolute top-2 right-14 rounded-full 
                            bg-[white] flex items-center justify-center"
                >
                  <Trash2 />
                </div>
              </button>
            </div>
          </div>
          <div className="pt-4 flex flex-col lg:flex-row lg:justify-between py-5 mx-5">
            <div className="flex flex-col gap-1">
              <p className="font-poppins text-[#000000] font-normal">Zilow</p>
              <h1 className="font-poppins font-semibold">
                123 Oak Street, Pittsburgh,PA
              </h1>
              <p className="text-sm">Residential 3 beds 2 bath 15,00 sqft</p>
              <h1 className="text-[#000000] font-poppins font-semibold pt-3">
                $85,000
              </h1>
            </div>
            <div className="flex flex-col text-end justify-between">
              <h1 className="font-poppins font-semibold">$1,250/unit</h1>
              <Link href="/property-details">
                <button
                  className="text-[#FFFFFF] bg-[#000000] px-4 py-2 rounded-lg mt-4
                        cursor-pointer font-poppins"
                >
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full  pt-8  shadow-xl rounded-xl">
          <div className="w-full relative">
            <Image
              src="/Image/properitse/home_pic_3.jpg"
              alt="home_pic_1"
              height={800}
              width={800}
              className="h-[300px] w-full rounded-t-xl"
            />
            <div className="flex gap-4">
              <button>
                <div className="w-[35px] h-[35px] absolute top-2 right-2 rounded-full  bg-[white] flex items-center justify-center">
                  <Star />
                </div>
              </button>
              <button>
                <div
                  className="w-[35px] h-[35px] absolute top-2 right-14 rounded-full 
                            bg-[white] flex items-center justify-center"
                >
                  <Trash2 />
                </div>
              </button>
            </div>
          </div>
          <div className="pt-4 flex flex-col lg:flex-row lg:justify-between py-5 mx-5">
            <div className="flex flex-col gap-1">
              <p className="font-poppins text-[#000000] font-normal">Zilow</p>
              <h1 className="font-poppins font-semibold">
                123 Oak Street, Pittsburgh,PA
              </h1>
              <p className="text-sm">Residential 3 beds 2 bath 15,00 sqft</p>
              <h1 className="text-[#000000] font-poppins font-semibold pt-3">
                $85,000
              </h1>
            </div>
            <div className="flex flex-col text-end justify-between">
              <h1 className="font-poppins font-semibold">$1,250/unit</h1>
              <Link href="/property-details">
                <button
                  className="text-[#FFFFFF] bg-[#000000] px-4 py-2 rounded-lg mt-4
                        cursor-pointer font-poppins"
                >
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full  pt-8  shadow-xl rounded-xl">
          <div className="w-full relative">
            <Image
              src="/Image/properitse/home_pic_4.jpg"
              alt="home_pic_1"
              height={800}
              width={800}
              className=" h-[300px] w-full rounded-t-xl"
            />
            <div className="flex gap-4">
              <button>
                <div className="w-[35px] h-[35px] absolute top-2 right-2 rounded-full  bg-[white] flex items-center justify-center">
                  <Star />
                </div>
              </button>
              <button>
                <div
                  className="w-[35px] h-[35px] absolute top-2 right-14 rounded-full 
                            bg-[white] flex items-center justify-center"
                >
                  <Trash2 />
                </div>
              </button>
            </div>
          </div>
          <div className="pt-4 flex flex-col lg:flex-row lg:justify-between py-5 mx-5">
            <div className="flex flex-col gap-1">
              <p className="font-poppins text-[#000000] font-normal">Zilow</p>
              <h1 className="font-poppins font-semibold">
                123 Oak Street, Pittsburgh,PA
              </h1>
              <p className="text-sm">Residential 3 beds 2 bath 15,00 sqft</p>
              <h1 className="text-[#000000] font-poppins font-semibold pt-3">
                $85,000
              </h1>
            </div>
            <div className="flex flex-col text-end justify-between">
              <h1 className="font-poppins font-semibold">$1,250/unit</h1>
              <Link href="/property-details">
                <button
                  className="text-[#FFFFFF] bg-[#000000] px-4 py-2 rounded-lg mt-4
                        cursor-pointer font-poppins"
                >
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
