"use client";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Data } from "@/data";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export default function PropertyPopUP({ setBigPopUp }) {
  const [showMore, setShowMore] = useState(false);

  function handleShowMore() {
    setShowMore(!showMore);
  }

  const [markerLocation, setMarkerLocation] = useState({
    lat: 40.4406,
    lng: -79.9959,
  });

  const overviewRef = useRef(null);
  const calculationRef = useRef(null);
  const factsAndFeaturesRef = useRef(null);
  const financialAnalysisRef = useRef(null);

  function handleScrollToOverview() {
    overviewRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function handleScrollToCalculation() {
    calculationRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function handleScrollToFactsAndFeatures() {
    factsAndFeaturesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function handleScrollToFinancialAnalysis() {
    financialAnalysisRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  return (
    <div className="p-3 lg:p-8 mx-10">
      <div className="sticky top-0 z-50 bg-white py-5">
        <div className="w-1/2 flex justify-between">
          <div className="flex">
            <div
              onClick={() => setBigPopUp(false)}
              className="flex gap-5 items-center cursor-pointer bg-black text-white font-poppins rounded-lg px-3 transition-transform duration-200 ease-in-out 
               active:scale-95"
            >
              <ChevronLeft />
              <p>Back to search</p>
            </div>
            {/* <ChevronLeft />
                        <Link href="/dashboard" className="font-poppins">Back to search</Link> */}
          </div>
          <Image
            src="/HomePageLogo.svg"
            alt="home-page-logo"
            height={70}
            width={150}
          />
        </div>

        <nav
          className="w-full border-b border-t flex items-center justify-center space-x-6 
            h-11 mt-4"
        >
          <p
            onClick={handleScrollToOverview}
            className="text-[#3F3C3C] font-poppins"
          >
            Over View
          </p>
          <p
            onClick={handleScrollToCalculation}
            className="text-[#3F3C3C] font-poppins"
          >
            Calculation
          </p>
          <Link
            href=""
            onClick={handleScrollToOverview}
            className="text-[#3F3C3C] font-poppins"
          >
            Facts & Features
          </Link>
          <Link
            href=""
            onClick={handleScrollToCalculation}
            className="text-[#3F3C3C] font-poppins"
          >
            Financial Analysis
          </Link>
        </nav>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4 ref={overviewRef}">
        <div className="relative lg:col-span-2 h-75">
          <Image
            src="/home_pic_1.jpg"
            alt="home1"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-75">
          <Image
            src="/home_pic_2.jpg"
            alt="home2"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-75">
          <Image
            src="/home_pic_3.jpg"
            alt="home3"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative lg:col-span-2 h-75">
          <Image
            src="/home_pic_4.jpg"
            alt="home4"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-75">
          <Image
            src="/home_pic_5.jpg"
            alt="home5"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-75">
          <Image
            src="/home_pic_6.jpg"
            alt="home6"
            fill
            className="object-cover"
          />
          <Link href="/view-all-images">
            <Button
              className="absolute bottom-3 right-3 cursor-pointer bg-white 
                    text-black font-poppins text-base hover:bg-white hover:text-black"
            >
              See All
            </Button>
          </Link>
        </div>
      </div>

      <div className="font-poppins text-[#000000] mt-4">
        <h1 className="font-semibold text-2xl pt-6">$350,000</h1>
        <p>List Price</p>
        <p>3692 W Highway 270, Pencil Bluff, AR 71965</p>
      </div>

      <div className="flex gap-4 pt-4 font-poppins font-semibold">
        <p>3 Beds</p>
        <p>2 Baths</p>
        <p>1,350 Sqft</p>
      </div>

      <div
        className="w-[300px] h-[40px] rounded-full mt-4 bg-[#DFDFDF] flex items-center
                justify-center"
      >
        <p className="text-[#000000] font-poppins">
          Est.: $1,115/mo Get pre-qualified
        </p>
      </div>

      <h1 className="font-poppins font-semibold text-xl pt-4">
        What's special
      </h1>

      <div className="flex gap-4">
        <div
          className="w-full max-w-[180px] h-[40px] rounded-md mt-2 bg-[#DFDFDF] flex 
                items-center justify-center"
        >
          <p className="text-[#000000] font-poppins">Excellent visibility</p>
        </div>
        <div
          className="w-full max-w-[180px] h-[40px] rounded-md mt-2 bg-[#DFDFDF] flex 
                items-center justify-center"
        >
          <p className="text-[#000000] font-poppins">Timeless Charm</p>
        </div>
      </div>

      {showMore ? (
        <div>
          <p className="font-poppins text-[#000000]">{Data}</p>
          <button
            className="text-[#000000] font-poppins bg-[#FFFFFF] ring-2 
                        ring-[#000000] px-4 py-1 mt-4 rounded-sm hover:bg-[#3F3C3C] 
                        hover:text-[#FFFFFF] cursor-pointer"
            onClick={handleShowMore}
          >
            Show Less
          </button>
        </div>
      ) : (
        <div>
          <p className="font-poppins text-[#000000]">
            {Data.slice(0, 100) + "...."}
          </p>
          <button
            className="text-[#000000] font-poppins bg-[#FFFFFF] ring-2 
                        ring-[#000000] px-4 py-1 mt-4 rounded-sm hover:bg-[#3F3C3C] 
                        hover:text-[#FFFFFF] cursor-pointer"
            onClick={handleShowMore}
          >
            Show More
          </button>
        </div>
      )}

      <div className="flex pt-6 font-semibold text-[#000000]">
        <h1>121 days on Zonify | &nbsp;</h1>
        <h1>101 views | &nbsp;</h1>
        <h1>9 saves</h1>
      </div>

      <div className="text-[#000000] text-sm font-poppins pt-6">
        <p>Zonify last checked: 13 hours ago</p>
        <p>Listing updated: July 21, 2025 at 11:47am</p>
        <p>
          Listed by: Letitia L Sommerkorn 870-490-0791,Caddo River Realty, Inc.
          Branch Office 870-490-0791
        </p>
        Source: CARMLS,MLS#: 25017212
      </div>

      <div className="w-full lg:h-[470px] border-2 border-[#8F8C8C] mt-6 rounded-md font-poppins">
        <div className="p-6">
          <h1 className="text-[#000000] font-medium text-2xl ref={calculationRef} ">
            Per-Unit Price Calculation
          </h1>
          <div className="w-full h-[1px] bg-[#8F8C8C] mt-2" />
          <div className="pt-2">
            <p className="text-[#3F3C3C]">Methodology</p>
            <p>
              The effective price per unit is calculated by dividing the list
              price by the maximum number of allowable residential units based
              on the property’s zoning classification.{" "}
            </p>
          </div>

          <div className="w-full h-full bg-[#F9FAFB] border-2 rounded-md mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="flex flex-col items-center justify-center text-[#000000]">
                <h1 className="font-poppins font-semibold text-3xl">
                  $350,000
                </h1>
                <p className="font-poppins">List Price</p>
              </div>
              <div className="flex items-center justify-center">
                <p className="font-semibold">/</p>
              </div>
              <div className="flex flex-col items-center justify-center text-[#000000]">
                <h1 className="font-poppins font-semibold text-3xl">1</h1>
                <p className="font-poppins">Max Allowable Units(R1)</p>
              </div>
              <div className="flex items-center justify-center">
                <p className="font-semibold">=</p>
              </div>
              <div className="flex flex-col items-center justify-center text-[#000000]">
                <h1 className="font-poppins font-semibold text-3xl">
                  $350,000
                </h1>
                <p className="font-poppins">Price Per Unit</p>
              </div>
            </div>
          </div>

          <div
            className="w-full mt-6 p-6 outline-dashed rounded-md bg-[#F9FAFB] text-[#000000] 
                    font-poppins"
          >
            <h1 className="font-semibold">Explore Scenarios</h1>
            <div className="flex flex-col lg:flex-row gap-12 mt-4">
              <div className="flex flex-col gap-2">
                <p>Custom Price (Optional)</p>
                <input
                  className="border border-[#877E7E] outline-none pl-2 rounded-sm"
                  placeholder="$ e.g. 340,000"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>Custom Units</p>
                <input className="border border-[#877E7E] outline-none pl-2 rounded-sm" />
              </div>
            </div>
            <div className="flex gap-6">
              <button
                className="text-[#FFFFFF] bg-[#000000] ring-2 
                        px-4 py-1 mt-4 rounded-sm cursor-pointer"
              >
                Recalculate
              </button>
              <p className="text-[#009B26]">Custom Price Per Unit: $170,000</p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-[#000000] font-semibold font-poppins text-2xl mt-6">
        Facts & features
      </h1>
      <div
        className="w-full h-[40px] bg-[#DFDFDF] rounded-sm font-poppins flex items-center
                mt-4 mb-2"
      >
        <p className="pl-4">Interior</p>
      </div>

      <div>
        <h1 className="font-semibold text-xl">Bedrooms & bathrooms</h1>
        <ul className="list-disc list-inside pl-4">
          <li>Bedrooms: 0</li>
          <li>Bathrooms: 0</li>
        </ul>
      </div>

      <div>
        <h1 className="font-semibold text-xl">Rooms</h1>
        <ul className="list-disc list-inside pl-4">
          <li>Room types: None</li>
        </ul>
      </div>

      <div>
        <h1 className="font-semibold text-xl">Appliances</h1>
        <ul className="list-disc list-inside pl-4">
          <li>Included: None</li>
        </ul>
      </div>

      <div>
        <h1 className="font-semibold text-xl">Dining room</h1>
        <ul className="list-disc list-inside pl-4">
          <li>Features: None</li>
        </ul>
      </div>

      <div>
        <h1 className="font-semibold text-xl">Features</h1>
        <ul className="list-disc list-inside pl-4">
          <li>Other</li>
          <li>Flooring: Concrete</li>
          <li>Has fireplace: Yes</li>
          <li>Fireplace features: Woodburning-Site-Built</li>
        </ul>
      </div>

      <div>
        <h1 className="font-semibold text-xl">Interior area</h1>
        <ul className="list-disc list-inside pl-4">
          <li>Total structure area: 1,520</li>
          <li>Total interior livable area: 1,520 sqft</li>
        </ul>
      </div>

      <div
        className="w-full h-[40px] bg-[#DFDFDF] rounded-sm font-poppins flex items-center
                mt-4 mb-2"
      >
        <p className="pl-4">Property</p>
      </div>

      <div>
        <h1 className="font-semibold text-xl">Parking</h1>
        <ul className="list-disc list-inside pl-4">
          <li>Total spaces: 2</li>
          <li>Parking features: Two Car, Garage Faces Rear</li>
        </ul>
      </div>

      <div>
        <h1 className="font-semibold text-xl">Features</h1>
        <ul className="list-disc list-inside pl-4">
          <li>Levels: One</li>
          <li>Stories: 1</li>
          <li>Exterior features: Storage</li>
          <li>Has view: Yes</li>
          <li>View description: Mountain(s)</li>
        </ul>
      </div>

      <div>
        <h1 className="font-semibold text-xl">Lot</h1>
        <ul className="list-disc list-inside pl-4">
          <li>Size: 3.2 Acres</li>
          <li>Features: Level, Rural Property, Cleared, Not in Subdivision</li>
        </ul>
      </div>

      <div
        className="w-full h-[40px] bg-[#DFDFDF] rounded-sm font-poppins flex items-center
                mt-4 mb-2"
      >
        <p className="pl-4">Construction</p>
      </div>

      <div>
        <h1 className="font-semibold text-xl">Type & style</h1>
        <ul className="list-disc list-inside pl-4">
          <li>Home type: SingleFamily</li>
          <li>Architectural style: Traditional</li>
          <li>Property subtype: Single Family Residence</li>
        </ul>
      </div>

      <div>
        <h1 className="font-semibold text-xl">Materials</h1>
        <ul className="list-disc list-inside pl-4">
          <li>Foundation: Slab</li>
          <li>Roof: Metal</li>
        </ul>
      </div>

      <div>
        <h1 className="font-semibold text-xl">Condition</h1>
        <ul className="list-disc list-inside pl-4">
          <li>Fixer</li>
          <li>New construction: No</li>
          <li>Year built: 1920</li>
        </ul>
      </div>

      <div
        className="w-full h-[40px] bg-[#DFDFDF] rounded-sm font-poppins flex items-center
                mt-4 mb-2"
      >
        <p className="pl-4">Construction</p>
      </div>

      <div>
        <h1 className="font-semibold text-xl"></h1>
        <ul className="list-disc list-inside pl-4">
          <li>Price per square foot: $130/sqft</li>
          <li>Annual tax amount: $321</li>
          <li>Date on market: 5/2/2025</li>
          <li>Listing terms: Conventional,Cash</li>
          <li>Road surface type: Paved</li>
        </ul>
      </div>

      <div className="w-full h-[450px] p-6 mt-8 border-2">
        <h1 className="text-[#000000] font-semibold font-poppins text-2xl">
          Location & Zoning Map
        </h1>
        <div className="w-full h-[350px] relative mt-4">
          <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
            <Map
              style={{ borderRadius: "20px" }}
              defaultZoom={13}
              defaultCenter={markerLocation}
              gestureHandling={"greedy"}
              disableDefaultUI
            >
              <Marker
                position={markerLocation}
                onClick={() => setSmallPopUp(true)}
              />
            </Map>
          </APIProvider>
        </div>
      </div>

      <h1 className="font-semibold font-poppins text-2xl text-[#000000] pt-6">
        Financial Analysis
      </h1>
      <div className="w-full h-[1px] bg-[#000000] mt-2" />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div
          className="lg:w-1/2 h-[100px] bg-[#F9FAFB] font-poppins flex flex-col items-center
            justify-center"
        >
          <p className="text-[#000000]">Estimated Property Taxes</p>
          <p className="text-[#137FEC] text-2xl font-semibold">$4,200/year</p>
        </div>
        <div
          className="lg:w-1/2 h-[100px] bg-[#F9FAFB] font-poppins flex flex-col items-center
            justify-center"
        >
          <p className="text-[#000000]">Potential Rental Income</p>
          <p className="text-[#137FEC] text-2xl font-semibold">$2,500/year</p>
        </div>
      </div>

      <div
        className="w-full h-[100px] bg-[#F9FAFB] font-poppins flex flex-col items-center
            justify-center mt-6"
      >
        <p className="text-[#137FEC] text-2xl font-bold">Estimated Cap Rate</p>
        <p className="text-[#000000] text-2xl font-semibold">6.8%</p>
      </div>

      <h1 className="text-[#000000] text-2xl font-semibold font-poppins mt-8">
        Comparable Properties
      </h1>

      <div className="w-full flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 h-[150px] relative bg-[#F9FAFB] flex gap-8 m-6 shadow-lg">
          <div className="w-1/3 h-full p-3 relative">
            <Image
              src="/comparable-properties-1.jpg"
              alt="comparable-properties-1"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-2/3 flex flex-col pt-8">
            <h1 className="font-semibold font-poppins text-2xl text-[#000000]">
              456 Oak Ave
            </h1>
            <p className="font-poppins text-[#000000]">$375,000.3bd/2ba</p>
            <p className="font-poppins text-[#000000]">Sold 2 Weeks ago</p>
          </div>
        </div>

        <div className="lg:w-1/2 h-[150px] relative bg-[#F9FAFB] flex gap-8 m-6 shadow-lg">
          <div className="w-1/3 h-full relative">
            <Image
              src="/comparable-properties-2.jpg"
              alt="comparable-properties-1"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-2/3 flex flex-col pt-8">
            <h1 className="font-semibold font-poppins text-2xl text-[#000000]">
              456 Oak Ave
            </h1>
            <p className="font-poppins text-[#000000]">$375,000.3bd/2ba</p>
            <p className="font-poppins text-[#000000]">Sold 2 Weeks ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
