"use client";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { getPropertyById } from "@/lib/property";

export default function PropertyPopUP({ setBigPopUp, id }) {
  const [showMore, setShowMore] = useState(false);

  console.log("Property ID in PopUp:", id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [property, setProperty] = useState({});
  const [customUnit, setCustomUnit] = useState(null);
  const [customValue, setCustomValue] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchProperty() {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const res = await getPropertyById(id);
        console.log("Fetched property data:", res);
        if (mounted) {
          setProperty(res || {});
          if (res && res.latitude && res.longitude) {
            setMarkerLocation({
              lat: Number(res.latitude),
              lng: Number(res.longitude),
            });
          }
        }
      } catch (err) {
        console.error("Error fetching property by id", err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchProperty();
    return () => (mounted = false);
  }, [id]);

  function handleShowMore() {
    setShowMore(!showMore);
  }

  const [markerLocation, setMarkerLocation] = useState({
    lat: 40.4406,
    lng: -79.9959,
  });

  // small popup state (used by Marker onClick) to avoid undefined setter errors
  const [smallPopUp, setSmallPopUp] = useState(false);

  const overviewRef = useRef(null);
  const calculationRef = useRef(null);
  const factsAndFeaturesRef = useRef(null);

  function handleScrollToOverview() {
    overviewRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
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
      block: "start",
      inline: "center",
    });
  }

  const handleInputChangeCalculation = (e) => {
    e.preventDefault();
    const priceInput = e.target.elements[0].value;
    const pricePerUnit = property.price / property.total_units;
    setCustomUnit(parseInt(priceInput / pricePerUnit));
  };
  // debug: show fetched property data
  // console.log('Property data:', Data);
  const handleCalculation = (e) => {
    e.preventDefault();
    const priceInput = e.target.elements[0].value;
    const totalunit = e.target.elements[1].value;
    setCustomValue(parseInt(priceInput / totalunit));
  };
  return (
    <div className="p-4 bg-white lg:p-8 mx-auto max-w-screen-xl">
      {/* ======================= Sticky Header ======================= */}
      <div className="sticky top-0 z-50 bg-white py-5">
        <div className="w-1/2 flex justify-between">
          <div className="flex">
            <div
              onClick={() => setBigPopUp(false)}
              className="flex gap-5 items-center cursor-pointer bg-white text-black font-poppins rounded-lg px-3 transition-transform duration-200 ease-in-out 
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
            py-2 mt-4"
        >
          <p
            onClick={handleScrollToOverview}
            className="text-[#3F3C3C] cursor-pointer font-poppins"
          >
            Over View
          </p>
          <p
            onClick={handleScrollToCalculation}
            className="text-[#3F3C3C] cursor-pointer font-poppins"
          >
            Calculation
          </p>
          <p
            onClick={handleScrollToFactsAndFeatures}
            className="text-[#3F3C3C] font-poppins cursor-pointer"
          >
            Facts & Features
          </p>
        </nav>
      </div>

      {/* Image gallery - shows up to 6 images, with Show All modal for more */}
      <div className="mt-4 bg-white z-50" ref={overviewRef}>
        {Array.isArray(property.photos) && property.photos.length > 0 ? (
          <div className={`grid gap-3 mt-4 `}>
            {/* Layout rules based on number of images */}
            {(() => {
              const photos = property.photos || [];
              const visible = photos.slice(0, 6);
              const count = visible.length;

              // 1 image: Single large layout
              if (count === 1) {
                return (
                  <div className="h-72 overflow-hidden rounded-lg">
                    <img
                      src={visible[0].url}
                      alt={`img-0`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              }

              // 2 images: Two equal columns
              if (count === 2) {
                return (
                  <div className="grid grid-cols-2 gap-3">
                    {visible.map((p, i) => (
                      <div key={i} className="h-56 overflow-hidden rounded-lg">
                        <img
                          src={p.url}
                          alt={`img-${i}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                );
              }

              // 3 images: Three equal columns
              if (count === 3) {
                return (
                  <div className="grid grid-cols-3 gap-3">
                    {visible.map((p, i) => (
                      <div key={i} className="h-48 overflow-hidden rounded-lg">
                        <img
                          src={p.url}
                          alt={`img-${i}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                );
              }

              // 4 images: 2x2 grid
              if (count === 4) {
                return (
                  <div className="grid grid-cols-2 gap-3">
                    {visible.map((p, i) => (
                      <div key={i} className="h-48 overflow-hidden rounded-lg">
                        <img
                          src={p.url}
                          alt={`img-${i}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                );
              }

              // 5 images: First large on left, 4 small on right (2x2)
              if (count === 5) {
                return (
                  <div className="grid grid-cols-2 gap-3">
                    {/* Large image on left */}
                    <div className="row-span-2 h-full overflow-hidden rounded-lg">
                      <img
                        src={visible[0].url}
                        alt={`img-0`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* 4 small images on right in 2x2 grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {visible.slice(1).map((p, i) => (
                        <div
                          key={i}
                          className="h-32 overflow-hidden rounded-lg"
                        >
                          <img
                            src={p.url}
                            alt={`img-${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              // 6 images: 2 large on left (stacked), 4 small on right (2x2)
              if (count === 6) {
                return (
                  <div className="grid grid-cols-2 gap-3">
                    {/* Left column: 2 large images stacked */}
                    <div className="grid grid-rows-2 gap-3">
                      <div className="h-48 overflow-hidden rounded-lg">
                        <img
                          src={visible[0].url}
                          alt={`img-0`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="h-48 overflow-hidden rounded-lg">
                        <img
                          src={visible[1].url}
                          alt={`img-1`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    {/* Right column: 4 small images in 2x2 grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {visible.slice(2).map((p, i) => (
                        <div
                          key={i}
                          className="h-48 overflow-hidden rounded-lg"
                        >
                          <img
                            src={p.url}
                            alt={`img-${i + 2}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              // Fallback (shouldn't reach here with slice(0,6))
              return null;
            })()}

            <div className="flex justify-end mt-2">
              <button
                onClick={() => {
                  setCurrentImageIndex(0);
                  setShowAllImages(true);
                }}
                className="bg-white text-black border px-4 py-2 rounded-lg"
              >
                Show All ({property.photos.length})
              </button>
            </div>
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center bg-gray-100 rounded-lg">
            No images available
          </div>
        )}
      </div>

      <div className="font-poppins text-[#000000] mt-4">
        <div className="flex items-center pt-2 gap-4">
          <p>List Price : </p>{" "}
          <h1 className="font-semibold text-2xl ">
            {property?.price ? `$${property.price.toLocaleString()}` : "—"}
          </h1>
        </div>

        <p>
          {property?.address
            ? `${property.address.street}, ${property.address.city}, ${
                property.address.state
              } ${property.address.zipcode || ""}`
            : "Address not available"}
        </p>
      </div>

      <div className="flex gap-4 pt-4 font-poppins font-semibold">
        <p>{property?.beds ?? "—"} Beds</p>
        <p>{property?.baths ?? "—"} Baths</p>
        <p>
          {property?.lot_area_value ? `${property.lot_area_value} Sqft` : "—"}
        </p>
      </div>

      <h1 className="font-poppins font-semibold text-xl pt-4">
        Property Highlights
      </h1>

      {showMore ? (
        <div>
          <p className="font-poppins text-[#000000]">
            {property?.description || "No description available."}
          </p>
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
            {(property?.description || "No description available.").slice(
              0,
              220
            )}
            {property?.description && property.description.length > 180
              ? "..."
              : ""}
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
        <h1>{property?.days_on_zillow} days on Zillow &nbsp;</h1>
      </div>

      <div className="text-[#000000] flex flex-col gap-3 text-base font-poppins pt-6">
        <p>Zonify last checked: 13 hours ago</p>
        <p>Listing updated: {property?.updated_at || "N/A"}</p>
        <p>Listed by: {property?.broker_name || "N/A"} </p>
        <p>
          Contact:{" "}
          {property?.agent_phone_number
            ? ` ${property.agent_phone_number}`
            : ""}
        </p>
        <p>Agent: {property?.agent_name || "N/A"}</p>
        <p className=" py-2">
          Source:{" "}
          <a
            href={property?.url || "#"}
            className=" px-3 py-1 border-blue-200 border m-3 cursor-pointer rounded-full bg-blue-500 text-white shadow-blue-400 shadow-md"
          >
            Zillow
          </a>
        </p>
      </div>

      <div className="w-full  border-2 border-[#8F8C8C] mt-6 rounded-md font-poppins">
        <div className="p-6">
          <h1
            ref={calculationRef}
            className="text-[#000000] font-medium text-2xl"
          >
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
                  ${property?.price ? property.price.toLocaleString() : "—"}
                </h1>
                <p className="font-poppins">List Price</p>
              </div>
              <div className="flex items-center justify-center">
                <p className="font-semibold">/</p>
              </div>
              <div className="flex flex-col items-center justify-center text-[#000000]">
                <h1 className="font-poppins font-semibold text-3xl">
                  {property?.total_units || "— N/A"}
                </h1>
                <p className="font-poppins">Max Allowable Units(R1)</p>
              </div>
              <div className="flex items-center justify-center">
                <p className="font-semibold">=</p>
              </div>
              <div className="flex flex-col items-center justify-center text-[#000000]">
                <h1 className="font-poppins font-semibold text-3xl">
                  $
                  {property?.price && property?.total_units
                    ? (property.price / property.total_units).toLocaleString()
                    : property.price}
                </h1>
                <p className="font-poppins">Price Per Unit</p>
              </div>
            </div>
          </div>

          <div
            className="w-full mt-5 p-6  outline-dashed rounded-md bg-[#F9FAFB] text-[#000000] 
                    font-poppins"
          >
            <form onSubmit={handleInputChangeCalculation}>
              <h1 className="font-semibold">Explore Scenarios</h1>
              <div className="flex flex-col justify-between lg:flex-row  gap-12 mt-4">
                <div className="flex flex-col gap-2 ">
                  <p>Custom Price (Optional)</p>
                  <input
                    className="border  lg:min-w-md border-[#877E7E] outline-none pl-2 py-2 rounded-sm"
                    placeholder="$ e.g. 340,000"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p>Units</p>
                  <p
                    className={`border lg:min-w-md border-[#877E7E] outline-none pl-2 ${
                      customUnit ? "py-2" : "py-5"
                    } rounded-sm`}
                  >
                    {customUnit}
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <button
                  type="submit"
                  className="text-[#FFFFFF] bg-[#000000] ring-2
                          px-4 py-1 mt-4 rounded-sm cursor-pointer"
                >
                  Recalculate
                </button>
              </div>
            </form>
          </div>
          <div
            className="w-full mt-5 p-6  outline-dashed rounded-md bg-[#F9FAFB] text-[#000000] 
                    font-poppins"
          >
            <form onSubmit={handleCalculation}>
              <h1 className="font-semibold">Find Price Assumption</h1>
              <div className="flex flex-col justify-between lg:flex-row  gap-12 mt-4">
                <div className="flex flex-col gap-2 ">
                  <p>Custom Price </p>
                  <input
                    required={true}
                    className="border  lg:min-w-xs border-[#877E7E] outline-none pl-2 py-2 rounded-sm"
                    placeholder="$ e.g. 340,000"
                  />
                </div>
                <div className="flex flex-col gap-2 ">
                  <p>Custom Units </p>
                  <input
                    required={true}
                    className="border  lg:min-w-xs border-[#877E7E] outline-none pl-2 py-2 rounded-sm"
                    placeholder="$ e.g.  2 "
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p>Units</p>
                  <p
                    className={`border lg:min-w-xs border-[#877E7E] outline-none pl-2 ${
                      customValue ? "py-2" : "py-5"
                    } rounded-sm`}
                  >
                    {customValue}
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <button
                  type="submit"
                  className="text-[#FFFFFF] bg-[#000000] ring-2
                          px-4 py-1 mt-4 rounded-sm cursor-pointer"
                >
                  Recalculate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <h1
        ref={factsAndFeaturesRef}
        className="text-[#000000] font-semibold font-poppins text-2xl mt-6"
      >
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
          <li>Bedrooms: {property.beds}</li>
          <li>Bathrooms: {property.baths}</li>
        </ul>
      </div>

      <div>
        <h1 className="font-semibold text-xl">Home Type</h1>
        <ul className="list-disc list-inside pl-4">
          <li>Home types: {property?.home_type}</li>
        </ul>
      </div>

      <div>
        <h1 className="font-semibold text-xl">Interior area</h1>
        <ul className="list-disc list-inside pl-4">
          <li>Total structure area: {property?.lot_size} sqft</li>
          <li>Total interior livable area: {property?.area} sqft</li>
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
          {property?.zoning_data?.length > 0 && (
            <li>Home type: {property.zoning_data[0].land_use_category}</li>
          )}

          <li>Architectural style: Traditional</li>
          {property?.zoning_data?.length > 0 && (
            <li>
              Property subtype: {property.zoning_data[0].land_use_subcategory}
            </li>
          )}
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
          <li>
            Price per square foot: $
            {property.price && property.area
              ? (property.price / property.area).toFixed(2)
              : 0}
            /sqft
          </li>
          <li>Year built: {property.year_built}</li>
          <li>Potential Unit Price: ${property.potential_per_unit_price?property.potential_per_unit_price:"N/A"}</li>
          <li>
            Property Units: 
            {property.total_units?property.total_units:"N/A"}
          </li>
          
        </ul>
      </div>

      <div className="w-full h-[450px] p-6 mt-8 border-2">
        <h1 className="text-[#000000] font-semibold font-poppins text-2xl">
          Location & Zoning Map
        </h1>
        <div className="w-full h-[350px] relative mt-4">
          <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
          >
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
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div
          className="lg:w-1/2 h-[100px] bg-[#F9FAFB] font-poppins flex flex-col items-center
            justify-center"
        >
          <p className="text-[#000000]">Estimated Property Value</p>
          <p className="text-[#137FEC] text-2xl font-semibold">
            $ {property.zestimate ? property.zestimate : "—"}
          </p>
        </div>
        <div
          className="lg:w-1/2 h-[100px] bg-[#F9FAFB] font-poppins flex flex-col items-center
            justify-center"
        >
          <p className="text-[#000000]">Potential Rental Income</p>
          <p className="text-[#137FEC] text-2xl font-semibold">
            ${property.rent_zestimate ? property.rent_zestimate : "—"}/year
          </p>
        </div>
      </div>

      {/* Fullscreen image gallery modal */}
      {showAllImages &&
        Array.isArray(property.photos) &&
        property.photos.length > 0 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="absolute top-4 right-4 z-60">
              <button
                onClick={() => setShowAllImages(false)}
                className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="w-full max-w-6xl h-[80vh] bg-black/0 flex flex-col items-center">
              <div className="relative w-full flex-1">
                <button
                  onClick={() =>
                    setCurrentImageIndex(
                      (i) =>
                        (i - 1 + property.photos.length) %
                        property.photos.length
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-white/30 text-white p-2 rounded-full"
                  aria-label="Previous"
                >
                  ‹
                </button>

                <div className="h-full w-full relative flex items-center justify-center">
                  <img
                    src={property.photos[currentImageIndex]?.url}
                    alt={`photo-${currentImageIndex}`}
                    className="max-h-[80vh] mx-auto object-contain"
                  />
                </div>

                <button
                  onClick={() =>
                    setCurrentImageIndex(
                      (i) => (i + 1) % property.photos.length
                    )
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-white/30 text-white p-2 rounded-full"
                  aria-label="Next"
                >
                  ›
                </button>
              </div>

              {/* Thumbnails */}
              <div className="w-full mt-4 overflow-x-auto py-2">
                <div className="flex gap-2">
                  {property.photos.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-none w-24 h-16 overflow-hidden rounded-md border ${
                        idx === currentImageIndex ? "ring-2 ring-white" : ""
                      }`}
                    >
                      <img
                        src={p.url}
                        alt={`thumb-${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      <div className="w-full h-[1px] bg-[#000000] mt-2" />
    </div>
  );
}
