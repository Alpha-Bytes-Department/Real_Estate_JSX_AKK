// import { Poppins } from "next/font/google";
// import Image from "next/image";

// const poppinsFont = Poppins({
//     subsets: ["latin"],
//     weight: ["400", "500", "600", "700", "800", "900"]
// });

// export default function FirstPage() {
//     return (
//         <div className="w-full h-screen flex flex-col items-center justify-center gap-8">
//             <div className="max-w-[300px] w-full h-[70px] relative">
//                 <Image src="/HomePageLogo.svg" alt="1st_page" fill />
//             </div>
//             <p className="text-black text-center font-poppins">Turning Complex Zoning
//                 Into Clear Investment Opportunities.</p>

//             <div className="flex flex-col lg:flex-row gap-16">
//                 <button className="text-[#FFFFFF] bg-[#000000] w-[300px] h-[60px] rounded-md
//                     font-poppins">Sign Up</button>
//                 <button className="text-[#FFFFFF] bg-[#000000] w-[300px] h-[60px] rounded-md
//                     font-poppins">Log In</button>
//             </div>

//             <div className="flex flex-col lg:flex-row gap-8 pt-4">
//                 <button className="text-[#000000] ring-2 ring-[#D9D9D9] w-[220px] h-[40px] 
//                     rounded-md font-poppins">
//                     <div className="flex gap-3">
//                         <Image src="/Google_Icon.svg" alt="google_icon" height={20} width={20}
//                             className="ml-4" />
//                         <p className="text-[#000000] font-poppins">Sign in with
//                             Google</p>
//                     </div>
//                 </button>

//                 <button className="text-[#000000] ring-2 ring-[#D9D9D9] w-[220px] h-[40px] 
//                     rounded-md font-poppins">
//                     <div className="flex gap-3">
//                         <Image src="/Apple_Icon.svg" alt="apple_icon" height={20} width={20}
//                             className="ml-4" />
//                         <p className="text-[#000000] font-poppins">Sign in with
//                             Apple</p>
//                     </div>
//                 </button>
//             </div>
//         </div>
//     );
// }