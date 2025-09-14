// Home-Page

import Image from "next/image";
import Link from "next/link";

export default function FirstPage() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-8">
      <div className="max-w-[300px] w-full h-[70px] relative">
        <Image src="/HomePageLogo.svg" alt="1st_page" fill />
      </div>
      <p className="text-black text-center font-poppins">Turning Complex Zoning
        Into Clear Investment Opportunities.</p>

      <div className="flex flex-col lg:flex-row gap-16 mt-6">
        <Link href="/sign-up">
          <button className="text-[#FFFFFF] bg-[#000000] w-[300px] h-[60px] rounded-md
          font-poppins">Sign Up</button>
        </Link>

        <Link href="/sign-in">
          <button className="text-[#FFFFFF] bg-[#000000] w-[300px] h-[60px] rounded-md
        font-poppins">Log In</button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        <button className="text-[#000000] ring-2 ring-[#D9D9D9] w-[220px] h-[40px] 
                    rounded-md font-poppins">
          <div className="flex gap-3">
            <Image src="/Google_Icon.svg" alt="google_icon" height={20} width={20}
              className="ml-4" />
            <p className="text-[#000000] font-poppins">Sign in with
              Google</p>
          </div>
        </button>

        <button className="text-[#000000] ring-2 ring-[#D9D9D9] w-[220px] h-[40px] 
                    rounded-md font-poppins">
          <div className="flex gap-3">
            <Image src="/Apple_Icon.svg" alt="apple_icon" height={20} width={20}
              className="ml-4" />
            <p className="text-[#000000] font-poppins">Sign in with
              Apple</p>
          </div>
        </button>
      </div>
    </div>
  );
}






// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
//               src/app/page.js
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }


