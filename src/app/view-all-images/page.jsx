import Image from "next/image";
import Link from "next/link";

export default function ViewAllImage() {
  const images = [
    "/Image/propertyImage/image1.jpg",
    "/Image/propertyImage/image2.jpg",
    "/Image/propertyImage/image3.jpg",
    "/Image/propertyImage/image4.jpg",
    "/Image/propertyImage/image5.jpg",
    "/Image/propertyImage/image6.jpg",
    "/Image/propertyImage/image7.jpg",
  ];

  return (
    <div className=" flex flex-col items-center justify-center gap-6 p-8">
      <div className="flex justify-between items-center w-full cursor-pointer">
        <div className="flex gap-1 items-center">
          <MdArrowBackIos className="text-xl" />
          <p>Back to search</p>
        </div>
        <Image
          src="/HomePageLogo.svg"
          alt="home-page-logo"
          height={100}
          width={200}
        />
        <div></div>
      </div>
      <div className="w-full px-4">
        {" "}
        {/* full width container */}
        <div
          className="grid gap-4 w-full"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", // min 250px per column
            gridAutoRows: "400px", // base row height
          }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="relative w-full overflow-hidden rounded-lg shadow-sm"
            >
              <Image
                src={src}
                alt={`gallery-img-${i}`}
                fill
                className="object-cover"
                sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 100vw"
              />
            </div>
          ))}
        </div>
      </div>

            <Link href="/property-details">
                <button className="bg-[#000000] text-[#FFFFFF] font-poppins px-6 py-2 rounded-md
            cursor-pointer">Back</button>
            </Link>
        </div>
    );
}
