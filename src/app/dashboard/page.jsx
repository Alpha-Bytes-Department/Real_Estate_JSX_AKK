"use client";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CiBookmark, CiSearch } from "react-icons/ci";
// import PropertyPopUP from "@/components/features/PropertyPopUP/PropertyPopUp";
import AccountPopUP from "@/components/features/AccountPopUp/AccountPopUP";
import ZoningPopUp from "@/components/features/ZoningPopUp/ZoningPopUp";
import { BookmarkContext } from "@/providers/BookmarkProvider";

export default function Dashboard() {
  const [account, setAccount] = useState(false);
  const [smallPopUp, setSmallPopUp] = useState(false);
  const [bigPopUp, setBigPopUp] = useState(false);

  const { bookmarks, toggleBookmark } = useContext(BookmarkContext);

  const [properties, setProperties] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 40.4387, lng: -79.9972 });

  const [smallPopUpMounted, setSmallPopUpMounted] = useState(false);
  const [bigPopUpMounted, setBigPopUpMounted] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [rootDatas, setRootDatas] = useState([]);

  function handleAccount() {
    setAccount(!account);
  }

  const handleFetchdata = async () => {
    try {
      console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
      const res = await fetch(
        "http://10.10.12.51:4000/api/v1/realstate/listings/"
      );
      const datas = await res.json();
      //const results = Array.isArray(datas?.results) ? datas.results : [];
      setProperties(datas);
      setRootDatas(datas);
      if (datas.length > 0) {
        const first = datas[0];
        const lat = Number(first.latitude);
        const lng = Number(first.longitude);
        if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
          setMapCenter({ lat, lng });
        }
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  useEffect(() => {
    handleFetchdata();
    
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        searchQuery
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setMapCenter({ lat: location.lat, lng: location.lng });
      } else {
        alert("Location not found. Please try again.");
      }
    } catch (error) {
      console.error("Error searching location:", error);
      alert("Error searching location. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const { handleSubmit, control } = useForm({
    defaultValues: {
      soldListings: false,
      reviewed: false,
      exclusionZones: false,
      showAlertMap: false,
      missingdatas: false,
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

  const onSubmit = (datas) => {
    console.log("Form datas:", datas);
  };

  const openSmallPopUp = () => {
    setSmallPopUpMounted(true);
    requestAnimationFrame(() => {
      setSmallPopUp(true);
    });
  };

  const closeSmallPopUp = () => {
    setSmallPopUp(false);
    setTimeout(() => {
      setSmallPopUpMounted(false);
    }, 300);
  };

  const openBigPopUp = (property) => {
    setSelectedProperty(property);
    setBigPopUpMounted(true);
    requestAnimationFrame(() => {
      setBigPopUp(true);
    });
  };

  const closeBigPopUp = () => {
    setBigPopUp(false);
    setTimeout(() => {
      setBigPopUpMounted(false);
    }, 300);
  };

  const smallpopupRef = useRef(null);
  const bigpopupRef = useRef(null);

  useEffect(() => {
    if (!smallPopUp) return;
    function handleSideClick(e) {
      if (smallpopupRef.current && !smallpopupRef.current.contains(e.target)) {
        closeSmallPopUp();
      }
    }
    function handleESC(e) {
      if (e.key === "Escape") closeSmallPopUp();
    }
    document.addEventListener("mousedown", handleSideClick);
    document.addEventListener("keydown", handleESC);
    return () => {
      document.removeEventListener("mousedown", handleSideClick);
      document.removeEventListener("keydown", handleESC);
    };
  }, [smallPopUp]);

  useEffect(() => {
    if (!bigPopUp) return;
    function handleSideClick(e) {
      if (bigpopupRef.current && !bigpopupRef.current.contains(e.target)) {
        closeBigPopUp();
      }
    }
    function handleESC(e) {
      if (e.key === "Escape") closeBigPopUp();
    }
    document.addEventListener("mousedown", handleSideClick);
    document.addEventListener("keydown", handleESC);
    return () => {
      document.removeEventListener("mousedown", handleSideClick);
      document.removeEventListener("keydown", handleESC);
    };
  }, [bigPopUp]);

  

  return (
    <div>
      <div className="w-full h-screen fixed">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
          {mapCenter &&
            typeof mapCenter.lat === "number" &&
            typeof mapCenter.lng === "number" && (
              <Map
                mapId="DEMO_MAP_ID"
                style={{ borderRadius: "20px" }}
                defaultZoom={12}
                defaultCenter={mapCenter}
                gestureHandling={"greedy"}
                disableDefaultUI
              >
                {properties?.map((property) => {
                  const lat = Number(property.latitude);
                  const lng = Number(property.longitude);
                  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;

                  return (
                    <AdvancedMarker
                      key={property.id}
                      position={{ lat, lng }}
                      onClick={() => setSelectedProperty(property)}
                    >
                      <div
                        className="bg-white border-2 border-blue-600 rounded px-1 shadow-lg hover:bg-blue-600 hover:text-white 
                      transition-colors cursor-pointer"
                      >
                        <span className="font-bold text-sm whitespace-nowrap">
                          ${property.price / 1000}K
                        </span>
                      </div>
                    </AdvancedMarker>

                    // <Marker
                    //   key={property.id}
                    //   position={{ lat, lng }}
                    //   icon={{
                    //     url: "/fa-circle.svg",
                    //     scaledSize: new google.maps.Size(15, 15),
                    //     anchor: new google.maps.Point(20, 40),
                    //   }}
                    //   onClick={() => setSelectedProperty(property)}
                    // />
                  );
                })}

                {selectedProperty && (
                  <InfoWindow
                    position={{
                      lat: Number(selectedProperty.latitude),
                      lng: Number(selectedProperty.longitude),
                    }}
                    onCloseClick={() => setSelectedProperty(null)}
                    options={{
                      pixelOffset: new google.maps.Size(0, 0), // removes offset
                      //;disableAutoPan: true,
                      backgroundColor: "transparent",
                    }}
                    className=""
                  >
                    <div
                      onClick={() => {
                        setSelectedProperty(selectedProperty);
                        setBigPopUpMounted(true);
                        requestAnimationFrame(() => setBigPopUp(true));
                      }}
                      style={{
                        margin: 0,
                        padding: 0,
                        overflow: "hidden",
                      }}
                      className="w-full max-w-[250px] h-[250px] cursor-pointer"
                    >
                      <div className="w-full h-[60%] relative">
                        <Image
                          src={selectedProperty.image || "/placeholder.png"}
                          alt="property-image"
                          fill
                          className="object-cover"
                        />
                        {/* Custom close button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProperty(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white font-black w-6 h-6 
                      rounded-full text-xs flex items-center justify-center cursor-pointer transition"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="w-full h-[40%] p-2">
                        <h1 className="font-semibold font-poppins text-[#000000] text-2xl">
                          ${selectedProperty.price}
                        </h1>
                        <p className="font-poppins text-[#000000] text-sm mt-1">
                          {selectedProperty.beds} beds |{" "}
                          {selectedProperty.baths} baths
                        </p>
                        <p className="font-poppins text-[#000000] text-sm truncate">
                          {selectedProperty.details}
                        </p>
                        <p className="font-poppins text-[#000000] text-sm mt-1">
                          {selectedProperty.address.street},{" "}
                          {selectedProperty.address.city},{" "}
                          {selectedProperty.address.state}
                        </p>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            )}
        </APIProvider>

        <div className="absolute top-1 right-8">
          <p className="text-black font-poppins">Maya</p>
        </div>

        <div className="absolute top-8 w-full flex justify-between">
          <div
            className="flex justify-between items-center py-5 lg:w-full lg:max-w-[370px] h-[30px] lg:ml-8  
                ring-2 ring-[#000000] bg-[#000000] rounded-md ps-2"
          >
            <CiSearch className="text-white text-2xl" />
            <input
              className="text-white px-3 focus:outline-0 bg-transparent w-full"
              placeholder="Search by address city or neighborhood"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
            />
            <div className="w-full max-w-[80px]">
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full !h-[30px] font-poppins text-base cursor-pointer 
                            hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? "..." : "Search"}
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
                className="rounded-full object-cover ring-3 ring-[#00308F]"
              />
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 w-full flex items-center justify-center gap-6">
          <Link href="/saved-properties">
            <button
              className="text-[#ECECEC] bg-[#000000] rounded-md font-poppins px-2 lg:px-5 py-2 
                cursor-pointer"
            >
              Saved Properties
            </button>
          </Link>
          <button
            onClick={() => {
              openSmallPopUp();
              setProperties(rootDatas);
            }}
            className="text-[#ECECEC] bg-[#000000] rounded-md font-poppins px-2 lg:px-5 py-2 
              cursor-pointer"
          >
            Zoning Map
          </button>
          <Link href="/listings">
            <button
              className="text-[#ECECEC] bg-[#000000] rounded-md font-poppins px-2 lg:px-5 py-2 
                cursor-pointer"
            >
              Listings
            </button>
          </Link>
        </div>

        {account && <AccountPopUP />}
      </div>

      {smallPopUpMounted && (
        <div
          ref={smallpopupRef}
          className={`fixed bottom-20 left-2/4 transform -translate-x-1/2 z-50
            transition-all duration-300 ease-out ${
              smallPopUp
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-2"
            }`}
        >
          <ZoningPopUp
            properties={properties}
            setProperties={setProperties}
            setSmallPopUp={setSmallPopUp}
            rootData={properties}
          />
        </div>
      )}

      {bigPopUpMounted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-all">
          <div
            ref={bigpopupRef}
            className={`bg-white rounded-lg w-full max-w-[850px] h-[90vh] overflow-hidden shadow-lg transition-transform duration-300 ease-out ${
              bigPopUp ? "scale-100" : "scale-95"
            }`}
          >
            <div className="w-full h-full relative">
              <iframe
                src={selectedProperty?.url}
                title="Property Page"
                className="w-full h-full border-0 rounded-lg"
              ></iframe>

              {/* ✅ Bookmark Button on Modal */}
              <Button
                className={`absolute top-3 left-3 border-2 rounded-none text-lg cursor-pointer z-50 ${
                  bookmarks.some((i) => i.id === selectedProperty?.id)
                    ? "bg-[#3366CC] text-white hover:bg-[#3366CC] hover:text-white"
                    : "bg-white text-black hover:bg-gray-100 hover:text-black"
                }`}
                variant="ghost"
                onClick={() => toggleBookmark(selectedProperty)}
              >
                <CiBookmark />
              </Button>

              {/* Close Button */}
              <button
                onClick={() => {
                  setBigPopUp(false);
                  setTimeout(() => setBigPopUpMounted(false), 300);
                }}
                className="absolute top-3 right-3 bg-black text-white px-3 py-1 mb-2 rounded-md 
                hover:bg-gray-800 transition cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
