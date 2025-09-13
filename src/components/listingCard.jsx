import Image from "next/image";

export default function ListingCard({ imageName, title }) {
    return (
        <div className="h-[200px] lg:h-[300px] border-2">
            <div className="w-full h-[60%] relative">
                <Image src={`/${imageName}.png`} alt="photo" fill />
            </div>
            <div className="w-full h-[40%] flex flex-col items-center justify-center
            text-center">
                <h1 className="text-[#000000] font-poppins font-bold text-2xl">{title}</h1>
                <p className="text-[#8F8C8C] font-poppins">Last Scraped: 2023-11-15 10:00 am</p>
            </div>
        </div>
    );
}
