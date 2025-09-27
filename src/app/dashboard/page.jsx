"use client";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import PropertyPopUP from "@/myComponents/PropertyPopUP/PropertyPopUp";

export default function Dashboard() {
  const [account, setAccount] = useState(false);
  const [smallPopUp, setSmallPopUp] = useState(false);
  const [bigPopUp, setBigPopUp] = useState(false);

  function handleAccount() {
    setAccount(!account);
  }

  // Center point for the map
  const [mapCenter, setMapCenter] = useState({
    lat: 40.4406,
    lng: -79.9959,
  });

  // Multiple properties with their locations
  const [properties, setProperties] = useState([
    {
      id: 1,
      position: { lat: 40.4406, lng: -79.9959 },
      price: "$199,999",
      details: "3 beds | 2 bathrooms | 2611 sqft - House for sale",
      address: "6515 Belair Road (MDFS35424512)",
      image: "/saved-properties-1.jpg",
    },
    {
      id: 2,
      position: { lat: 40.445, lng: -79.99 },
      price: "$225,000",
      details: "4 beds | 3 bathrooms | 2800 sqft - House for sale",
      address: "1234 Main Street (MDFS35424513)",
      image: "/saved-properties-1.jpg",
    },
    {
      id: 3,
      position: { lat: 40.435, lng: -80.005 },
      price: "$180,000",
      details: "2 beds | 1 bathroom | 1800 sqft - House for sale",
      address: "5678 Oak Avenue (MDFS35424514)",
      image: "/saved-properties-1.jpg",
    },
    {
      id: 4,
      position: { lat: 40.438, lng: -79.992 },
      price: "$275,000",
      details: "5 beds | 3 bathrooms | 3200 sqft - House for sale",
      address: "789 Pine Street (MDFS35424515)",
      image: "/saved-properties-1.jpg",
    },
    {
      id: 5,
      position: { lat: 40.442, lng: -79.998 },
      price: "$195,000",
      details: "3 beds | 2 bathrooms | 2100 sqft - House for sale",
      address: "321 Elm Road (MDFS35424516)",
      image: "/saved-properties-1.jpg",
    },
    {
      id: 6,
      position: { lat: 40.432, lng: -79.994 },
      price: "$310,000",
      details: "4 beds | 3.5 bathrooms | 3500 sqft - House for sale",
      address: "456 Maple Avenue (MDFS35424517)",
      image: "/saved-properties-1.jpg",
    },
    {
      id: 7,
      position: { lat: 40.447, lng: -79.993 },
      price: "$245,000",
      details: "3 beds | 2.5 bathrooms | 2800 sqft - House for sale",
      address: "890 Cedar Lane (MDFS35424518)",
      image: "/saved-properties-1.jpg",
    },
    {
      id: 8,
      position: { lat: 40.439, lng: -80.002 },
      price: "$289,000",
      details: "4 beds | 3 bathrooms | 3100 sqft - House for sale",
      address: "123 Birch Street (MDFS35424519)",
      image: "/saved-properties-1.jpg",
    },
    {
      id: 9,
      position: { lat: 40.444, lng: -79.987 },
      price: "$335,000",
      details: "5 beds | 4 bathrooms | 3800 sqft - House for sale",
      address: "567 Willow Way (MDFS35424520)",
      image: "/saved-properties-1.jpg",
    },
    {
      id: 10,
      position: { lat: 40.436, lng: -79.999 },
      price: "$229,000",
      details: "3 beds | 2 bathrooms | 2400 sqft - House for sale",
      address: "432 Aspen Court (MDFS35424521)",
      image: "/saved-properties-1.jpg",
    },
    // 10 new items
    {
      id: 11,
      position: { lat: 40.441, lng: -79.985 },
      price: "$210,000",
      details: "3 beds | 2 bathrooms | 2500 sqft - House for sale",
      address: "1010 Cherry Lane (MDFS35424522)",
      image: "/saved-properties-1.jpg",
    },
    {
      id: 12,
      position: { lat: 40.437, lng: -79.991 },
      price: "$265,000",
      details: "4 beds | 3 bathrooms | 3000 sqft - House for sale",
      address: "2020 Spruce Street (MDFS35424523)",
      image: "/saved-properties-1.jpg",
    },
    {
      id: 13,
      position: { lat: 40.434, lng: -79.988 },
      price: "$190,000",
      details: "2 beds | 2 bathrooms | 2000 sqft - House for sale",
      address: "3030 Walnut Avenue (MDFS35424524)",
      image: "/saved-properties-1.jpg",
    },
    {
      id: 14,
      position: { lat: 40.446, lng: -79.996 },
      price: "$320,000",
      details: "5 beds | 4 bathrooms | 3600 sqft - House for sale",
      address: "4040 Pinecrest Road (MDFS35424525)",
      image: "/saved-properties-1.jpg",
    },
    {
      id: 15,
      position: { lat: 40.443, lng: -79.989 },
      price: "$230,000",
      details: "3 beds | 2 bathrooms | 2600 sqft - House for sale",
      address: "5050 Magnolia Blvd (MDFS35424526)",
      image: "/saved-properties-1.jpg",
    },
    {
      id: 16,
      position: { lat: 40.431, lng: -79.997 },
      price: "$280,000",
      details: "4 beds | 3 bathrooms | 3200 sqft - House for sale",
      address: "6060 Oakwood Street (MDFS35424527)",
      image: "/saved-properties-1.jpg",
    },
    {
      id: 17,
      position: { lat: 40.448, lng: -79.99 },
      price: "$245,000",
      details: "3 beds | 2.5 bathrooms | 2800 sqft - House for sale",
      address: "7070 Maple Lane (MDFS35424528)",
      image: "/saved-properties-1.jpg",
    },
    {
      id: 18,
      position: { lat: 40.44, lng: -80.001 },
      price: "$300,000",
      details: "4 beds | 3 bathrooms | 3400 sqft - House for sale",
      address: "8080 Cedar Street (MDFS35424529)",
      image: "/saved-properties-1.jpg",
    },
    {
      id: 19,
      position: { lat: 40.4355, lng: -79.9935 },
      price: "$220,000",
      details: "3 beds | 2 bathrooms | 2400 sqft - House for sale",
      address: "9090 Birch Avenue (MDFS35424530)",
      image: "/saved-properties-1.jpg",
    },
    {
      id: 20,
      position: { lat: 40.4425, lng: -79.9865 },
      price: "$350,000",
      details: "5 beds | 4 bathrooms | 4000 sqft - House for sale",
      address: "10101 Willow Drive (MDFS35424531)",
      image: "/saved-properties-1.jpg",
    },
  ]);

  // const [properties, setProperties] = useState([
  //   {
  //     id: 1,
  //     position: { lat: 40.4406, lng: -79.9959 },
  //     price: "$199,999",
  //     details: "3 beds | 2 bathrooms | 2611 sqft - House for sale",
  //     address: "6515 Belair Road (MDFS35424512)",
  //     image: "/saved-properties-1.jpg"
  //   },
  //   {
  //     id: 2,
  //     position: { lat: 40.4450, lng: -79.9900 },
  //     price: "$225,000",
  //     details: "4 beds | 3 bathrooms | 2800 sqft - House for sale",
  //     address: "1234 Main Street (MDFS35424513)",
  //     image: "/saved-properties-1.jpg"
  //   },
  //   {
  //     id: 3,
  //     position: { lat: 40.4350, lng: -80.0050 },
  //     price: "$180,000",
  //     details: "2 beds | 1 bathroom | 1800 sqft - House for sale",
  //     address: "5678 Oak Avenue (MDFS35424514)",
  //     image: "/saved-properties-1.jpg"
  //   },
  //   {
  //     id: 4,
  //     position: { lat: 40.4380, lng: -79.9920 },
  //     price: "$275,000",
  //     details: "5 beds | 3 bathrooms | 3200 sqft - House for sale",
  //     address: "789 Pine Street (MDFS35424515)",
  //     image: "/saved-properties-1.jpg"
  //   },
  //   {
  //     id: 5,
  //     position: { lat: 40.4420, lng: -79.9980 },
  //     price: "$195,000",
  //     details: "3 beds | 2 bathrooms | 2100 sqft - House for sale",
  //     address: "321 Elm Road (MDFS35424516)",
  //     image: "/saved-properties-1.jpg"
  //   },
  //   {
  //     id: 6,
  //     position: { lat: 40.4320, lng: -79.9940 },
  //     price: "$310,000",
  //     details: "4 beds | 3.5 bathrooms | 3500 sqft - House for sale",
  //     address: "456 Maple Avenue (MDFS35424517)",
  //     image: "/saved-properties-1.jpg"
  //   },
  //   {
  //     id: 7,
  //     position: { lat: 40.4470, lng: -79.9930 },
  //     price: "$245,000",
  //     details: "3 beds | 2.5 bathrooms | 2800 sqft - House for sale",
  //     address: "890 Cedar Lane (MDFS35424518)",
  //     image: "/saved-properties-1.jpg"
  //   },
  //   {
  //     id: 8,
  //     position: { lat: 40.4390, lng: -80.0020 },
  //     price: "$289,000",
  //     details: "4 beds | 3 bathrooms | 3100 sqft - House for sale",
  //     address: "123 Birch Street (MDFS35424519)",
  //     image: "/saved-properties-1.jpg"
  //   },
  //   {
  //     id: 9,
  //     position: { lat: 40.4440, lng: -79.9870 },
  //     price: "$335,000",
  //     details: "5 beds | 4 bathrooms | 3800 sqft - House for sale",
  //     address: "567 Willow Way (MDFS35424520)",
  //     image: "/saved-properties-1.jpg"
  //   },
  //   {
  //     id: 10,
  //     position: { lat: 40.4360, lng: -79.9990 },
  //     price: "$229,000",
  //     details: "3 beds | 2 bathrooms | 2400 sqft - House for sale",
  //     address: "432 Aspen Court (MDFS35424521)",
  //     image: "/saved-properties-1.jpg"
  //   }
  // ]);

  const [selectedProperty, setSelectedProperty] = useState(null);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      soldListings: false,
      reviewed: false,
      exclusionZones: false,
      showAlertMap: false,

      missingData: false,
      favorites: false,
      businessRuleMatches: false,
      newlyListed: false,
      normalListings: false,

      propertyType: "all",

      zonedUnits: [13, 70],
      listPrice: [33, 90],
      existingPotential: [47, 92],
      daysOnMarket: [27, 114],
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setZoningMapClicked(false);
  };

  // closing popup if click outside
  const popupRef = useRef(null);

  useEffect(() => {
    if (!bigPopUp) return;

    function handleSideClick(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setBigPopUp(false);
      }
    }

    function handleESC(e) {
      if (e.key === "Escape") setBigPopUp(false);
    }

    document.addEventListener("mousedown", handleSideClick);
    document.addEventListener("touchstart", handleSideClick);
    document.addEventListener("keydown", handleESC);

    return () => {
      document.removeEventListener("mousedown", handleSideClick);
      document.removeEventListener("touchstart", handleSideClick);
      document.removeEventListener("keydown", handleESC);
    };
  }, [bigPopUp, setBigPopUp]);

  // main component
  return (
    <div>
      <div className="w-full h-screen fixed">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
          <Map
            style={{ borderRadius: "20px" }}
            defaultZoom={13}
            defaultCenter={mapCenter}
            gestureHandling={"greedy"}
            disableDefaultUI
          >
            {/* Render property markers as price tags */}
            {properties.map((property) => {
              // Convert price to K format
              const priceNum = parseInt(property.price.replace(/\$|,/g, ""));
              const priceK =
                priceNum >= 1000000
                  ? `$${(priceNum / 1000000).toFixed(1)}M`
                  : `$${Math.round(priceNum / 1000)}K`;

              return (
                <Marker
                  key={property.id}
                  position={property.position}
                  onClick={() => setSelectedProperty(property)}
                >
                  {/* wrapper ensures the marker bottom-center anchors at the position */}
                  <div
                    onClick={() => setSelectedProperty(property)}
                    // Tailwind classes kept; inline styles guarantee layout/visibility
                    className="cursor-pointer transition-colors"
                    style={{
                      position: "relative", // overlay positioning context
                      transform: "translate(-50%, -100%)", // anchor bottom-center
                      left: "50%", // center horizontally relative to overlay anchoring
                      top: "100%", // move above the anchor point
                      zIndex: 9999, // ensure above map elements
                      pointerEvents: "auto", // allow hover/click
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="bg-[#00308F] px-3 py-1 rounded-md shadow-md hover:bg-[#002266] transition-colors"
                      style={{
                        // inline fallbacks in case Tailwind utilities don't apply
                        background: "#00308F",
                        padding: "4px 12px",
                        borderRadius: "8px",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                        color: "white",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        transformOrigin: "center bottom",
                      }}
                    >
                      <span className="text-white font-semibold font-poppins text-sm">
                        {priceK}
                      </span>
                    </div>

                    {/* optional drop pin triangle so it reads like a map pin */}
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "6px solid transparent",
                        borderRight: "6px solid transparent",
                        borderTop: "8px solid #00308F",
                        marginTop: -1,
                      }}
                    />
                  </div>
                </Marker>
              );
            })}

            {/* Info window for selected property */}
            {selectedProperty && (
              <InfoWindow
                position={selectedProperty.position}
                onCloseClick={() => setSelectedProperty(null)}
              >
                <div
                  onClick={() => setBigPopUp(true)}
                  className="w-full max-w-[250px] h-[250px] cursor-pointer"
                >
                  <div className="w-full h-[60%] relative">
                    <Image
                      src={selectedProperty.image}
                      alt="property-image"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-full h-[40%] ">
                    <h1 className="font-semibold font-poppins text-[#000000] text-2xl">
                      {selectedProperty.price}
                    </h1>
                    <p className="font-poppins text-[#000000]">
                      {selectedProperty.details}
                    </p>
                    <p className="font-poppins text-[#000000]">
                      {selectedProperty.address}
                    </p>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>

        <div className="absolute top-1 right-8">
          <p className="text-black font-poppins">Maya</p>
        </div>

        <div className="absolute top-8 w-full flex justify-between">
          {/*search box*/}
          <div
            className="flex justify-between items-center py-5 lg:w-full lg:max-w-[370px] h-[30px] lg:ml-8  
                ring-2 ring-[#000000] bg-[#000000] rounded-md ps-2"
          >
            <CiSearch className="text-white text-2xl" />
            <input
              className="text-white px-3 focus:outline-0"
              placeholder="Search by adderess city or neighborhood"
              title="Search by adderess city or neighborhood"
            />
            <div className="w-full max-w-[80px]">
              <Button
                className="w-full !h-[30px] font-poppins text-base cursor-pointer 
                            hover:scale-105 hover:shadow-lg"
              >
                Search
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <Image
              src="/HomePageLogo.svg"
              alt="1st_page"
              width={200}
              height={100}
            />
          </div>

          <div className="w-12 h-12 relative mr-8">
            <button className="cursor-pointer" onClick={handleAccount}>
              <Image
                src="/User.jpg"
                alt="user"
                fill
                className="rounded-full object-cover 
                        ring-3 ring-[#00308F]"
              />
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 w-full flex items-center justify-center gap-6">
          <Link href="/saved-properties">
            <button
              className="text-[#ECECEC] bg-[#000000] rounded-md font-poppins px-5 py-2 
                cursor-pointer"
            >
              Saved Properties
            </button>
          </Link>
            <button 
              onClick={()=>setSmallPopUp(true)}
              className="text-[#ECECEC] bg-[#000000] rounded-md font-poppins px-5 py-2 
                cursor-pointer"
            >
              Zoning map
            </button>
          <Link href="/listings">
            <button
              className="text-[#ECECEC] bg-[#000000] rounded-md font-poppins px-5 py-2 
                cursor-pointer"
            >
              Listings
            </button>
          </Link>
        </div>

        {account && (
          <div
            className="absolute top-16 right-8 w-full max-w-[250px] pb-5 rounded-md
                    flex flex-col gap-4 bg-[#FFFFFF] px-5 shadow-lg z-50"
          >
            <div className="w-full pt-6">
              <Link href="/account-settings">
                <Button
                  className="w-full flex justify-between cursor-pointer bg-[#D9D9D9] 
                            hover:bg-[#D9D9D9]"
                >
                  <Label
                    htmlFor="profile-settings"
                    className="text-[#000000] font-poppins 
                                cursor-pointer text-base"
                  >
                    Profile Settings
                  </Label>
                  <Image
                    src="/user-logo.svg"
                    alt="user-logo"
                    height={15}
                    width={20}
                    className=""
                  />
                </Button>
              </Link>
            </div>

            <div className="w-full">
              <Link href="/saved-properties">
                <Button
                  className="w-full flex justify-between cursor-pointer bg-[#D9D9D9] 
                            hover:bg-[#D9D9D9]"
                >
                  <Label
                    htmlFor="profile-settings"
                    className="text-[#000000] 
                                    font-poppins cursor-pointer text-base"
                  >
                    Saved Properties
                  </Label>
                  <Image
                    src="/bookmark.svg"
                    alt="bookmark-logo"
                    height={15}
                    width={20}
                    className=""
                  />
                </Button>
              </Link>
            </div>

            <div className="w-full">
              <Link href="/listings">
                <Button
                  className="w-full flex justify-between cursor-pointer bg-[#D9D9D9] 
                            hover:bg-[#D9D9D9]"
                >
                  <Label
                    htmlFor="listings"
                    className="text-[#000000] font-poppins 
                                cursor-pointer text-base"
                  >
                    Listings
                  </Label>
                  <Image
                    src="/list.svg"
                    alt="list-logo"
                    height={15}
                    width={20}
                    className=""
                  />
                </Button>
              </Link>
            </div>

            <div className="w-full flex items-center gap-2 pl-4">
              <div className="w-full max-w-[80px] h-[1px] bg-[#8F8C8C]" />
              <p className="text-[#A4A3A3] font-poppins">and</p>
              <div className="w-full max-w-[80px] h-[1px] bg-[#8F8C8C]" />
            </div>

            <div className="w-full">
              <Button
                className="w-full flex items-center justify-center 
                                    cursor-pointer bg-[#D9D9D9] hover:bg-[#D9D9D9]"
              >
                <Label
                  htmlFor="privacy-policy"
                  className="text-[#000000] 
                                        font-poppins cursor-pointer text-base"
                >
                  Privacy Policy
                </Label>
              </Button>
            </div>

            <div className="w-full">
              <Button
                className="w-full flex items-center justify-center 
                                    cursor-pointer bg-[#D9D9D9] hover:bg-[#D9D9D9]"
              >
                <Label
                  htmlFor="terms-of-services"
                  className="text-[#000000] 
                                        font-poppins cursor-pointer text-base"
                >
                  Terms of Services
                </Label>
              </Button>
            </div>
            <div className="w-full">
              <Button
                className="w-full flex items-center justify-center 
                                    cursor-pointer bg-[#D9D9D9] hover:bg-[#D9D9D9]"
              >
                <Label
                  htmlFor="logout"
                  className="text-[#000000] 
                                        font-poppins cursor-pointer text-base"
                >
                  Logout
                </Label>
              </Button>
            </div>
          </div>
        )}
      </div>

      {bigPopUp && (
        <div
          ref={popupRef}
          className={`${
            bigPopUp
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
        fixed inset-0 z-50 flex items-center justify-center bg-black/70
        transition-all duration-300 ease-out transform`}
        >
          <div className="bg-white rounded-lg max-w-7xl max-h-[90vh] overflow-auto m-4">
            <PropertyPopUP setBigPopUp={setBigPopUp} />
          </div>
        </div>
      )}
    </div>
  );
}
