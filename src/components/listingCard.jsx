import Image from "next/image";

export default function ListingCard({ imageName, title }) {
    return (
        <div className=" w-[308px]">
            <div className="">
                <Image src={`/Image/management/${imageName}.png`} alt="photo" height={400} width={400} className="w-full h-[200px]"/>
            </div>
            <div className="w-full flex flex-col items-center justify-center
            text-center  min-h-32 border-2 border-t-0 border-gray-600 py-5">
                <h1 className="text-[#000000] font-poppins font-bold text-5xl">{title}</h1>
                <p className="text-[#8F8C8C] font-poppins text-2xl mt-3">Last Scraped: 2023-11-15 10:00 am</p>
            </div>
        </div>
    );
}
