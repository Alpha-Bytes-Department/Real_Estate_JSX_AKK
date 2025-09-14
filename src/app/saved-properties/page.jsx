import Image from "next/image";
import { ChevronLeft } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import Link from "next/link";

export default function SavedProperties() {
    return (
        <div className="w-full min-h-screen p-9">
            <div className="flex">
                <ChevronLeft />
                <Link href="/dashboard" className="font-poppins text-[#3F3C3C]">Back</Link>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between pt-8">
                <div className="flex flex-col gap-2">
                    <h1 className="font-poppins font-medium text-3xl">Saved Properties</h1>
                    <p className="font-poppins text-[#877E7E]">Manage your saved property listings
                        and track their details</p>
                </div>

                <div className="font-poppins text-[#8F8C8C]">
                    <p>Sort By Price :</p>
                    <select name="" id="">
                        <option value="low-to-high">Low to High</option>
                        <option value="high-to-low">High to Low</option>
                    </select>
                </div>
            </div>

            <div className="pt-12">
                <nav>
                    <ul className="flex gap-8 font-poppins text-[#8F8C8C]">
                        <li>
                            <Link href="/all-properties">All</Link>
                        </li>
                        <li>
                            <Link href="/residential">Residential</Link>
                        </li>
                        <li>
                            <Link href="/commercial">Commercial</Link>
                        </li>
                        <li>
                            <Link href="/fovourites">Favourites</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <hr />

            <div className="w-full lg:w-1/3 h-[400px] pt-8 rounded-lg">
                <div className="w-full h-[70%] relative">
                    <Image src="/saved-properties-1.jpg" alt="saved-properties-1" fill />
                    <div className="flex gap-4">
                        <button>
                            <div className="w-[35px] h-[35px] absolute top-2 right-2 rounded-full 
                            bg-[white] flex items-center justify-center">
                                <Trash2 />
                            </div>
                        </button>

                        <button>
                            <div className="w-[35px] h-[35px] absolute top-2 right-14 rounded-full 
                            bg-[white] flex items-center justify-center">
                                <Trash2 />
                            </div>
                        </button>
                    </div>
                </div>

                <div className="w-full h-[30%] pt-4 flex flex-col lg:flex-row lg:justify-between">
                    <div className="flex flex-col gap-1">
                        <p className="font-poppins text-[#000000] font-normal">Zilow</p>
                        <h1 className="font-poppins font-semibold">123 Oak Street, Pittsburgh,PA</h1>
                        <p className="text-sm">Residential  3 beds  2 bath  15,00 sqft</p>
                        <h1 className="text-[#000000] font-poppins font-semibold pt-3">$85,000</h1>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="font-poppins font-semibold">$1,250/unit</h1>
                        <Link href="/property-details">
                            <button className="text-[#FFFFFF] bg-[#000000] px-4 py-2 rounded-lg mt-4
                        cursor-pointer font-poppins">View Details</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}




// "use client"
// import { useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";

// export default function SortBy() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [sortOption, setSortOption] = useState("Sort by");

//   const handleSelect = (option) => {
//     setSortOption(option);
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative inline-block w-48">
//       {/* Dropdown button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full flex items-center justify-between px-4 py-2 border border-gray-400 rounded-md bg-white text-gray-700 font-medium"
//       >
//         <span>{sortOption}</span>
//         {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//       </button>

//       {/* Dropdown options */}
//       {isOpen && (
//         <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
//           <button
//             onClick={() => handleSelect("Low to High")}
//             className="w-full text-left px-4 py-2 hover:bg-gray-100"
//           >
//             Low to High
//           </button>
//           <button
//             onClick={() => handleSelect("High to Low")}
//             className="w-full text-left px-4 py-2 hover:bg-gray-100"
//           >
//             High to Low
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
