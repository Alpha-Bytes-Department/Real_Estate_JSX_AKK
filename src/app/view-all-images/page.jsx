import Image from "next/image";
import Link from "next/link";

export default function ViewAllImage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
            <Image src="/HomePageLogo.svg" alt="home-page-logo" height={100} width={200} />
            
            <Image src="/home_pic_1.jpg" alt="home_pic_1" height={200} width={400} />
            <Image src="/home_pic_2.jpg" alt="home_pic_2" height={200} width={400} />

            <Link href="/property-details">
                <button className="bg-[#000000] text-[#FFFFFF] font-poppins px-6 py-2 rounded-md
            cursor-pointer">Back</button>
            </Link>
        </div>
    );
}
