"use client";
import { APIProvider, Map, Marker, InfoWindow, OverlayView } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import PropertyPopUP from "@/myComponents/PropertyPopUP/PropertyPopUp";
import AccountPopUP from "@/myComponents/AccountPopUp/AccountPopUP";
import ZoningPopUp from "@/myComponents/ZoningPopUp/ZoningPopUp";
import { IoStar } from "react-icons/io5";
import { IoMdStarOutline } from "react-icons/io";

export default function Dashboard() {
  const [account, setAccount] = useState(false);
  const [smallPopUp, setSmallPopUp] = useState(false);
  const [bigPopUp, setBigPopUp] = useState(false);

  // Multiple properties with their locations
  const [properties, setProperties] = useState([]);
  // Use a valid default center (Dhaka) so map won't throw on first render.
  const [mapCenter, setMapCenter] = useState({ lat: 40.4387, lng: -79.9972 });

  // Add mounting states for proper animation
  const [smallPopUpMounted, setSmallPopUpMounted] = useState(false);
  const [bigPopUpMounted, setBigPopUpMounted] = useState(false);

  // selected property for InfoWindow + big popup
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [showIframe, setShowIframe] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [isSaved, setIsSaved] = useState(false);

  function handleAccount() {
    setAccount(!account);
  }

  const handleFetchdata = async () => {
    try {
      const res = await fetch("http://10.10.12.51:4000/api/v1/realstate/listings/");
      const datas = await res.json();

      // ensure results is an array before setting
      const results = Array.isArray(datas?.results) ? datas.results : [];
      setProperties(datas);
      console.log("result are............", results);
      console.log('api response : ', datas)

      // If we have at least one property, center the map on the first property's coords
      if (results.length > 0) {
        const first = results[0];
        const lat = Number(first.latitude);
        const lng = Number(first.longitude);
        if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
          setMapCenter({ lat, lng });
        } else {
          console.warn("First property has invalid coordinates", first);
        }
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  useEffect(() => {
    handleFetchdata();
  }, []);

  // Function to search and move map to a city/address
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      // Use Google Geocoding API to get coordinates from address/city
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        searchQuery
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setMapCenter({ lat: location.lat, lng: location.lng });
        console.log(`Moved to: ${searchQuery}`, location);
      } else {
        alert("Location not found. Please try a different search term.");
      }
    } catch (error) {
      console.error("Error searching location:", error);
      alert("Error searching location. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  // Handle Enter key press in search input
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

  // Functions to handle popup opening and closing with proper animation timing
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

  // openBigPopUp accepts a property to show inside the big popup
  const openBigPopUp = (property) => {
    console.log(property)
    // setSelectedProperty ensures InfoWindow is closed (if necessary) and big popup has the property
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

  // Refs for click outside detection
  const smallpopupRef = useRef(null);
  const bigpopupRef = useRef(null);

  // Click outside and ESC key handlers for small popup
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
    document.addEventListener("touchstart", handleSideClick);
    document.addEventListener("keydown", handleESC);

    return () => {
      document.removeEventListener("mousedown", handleSideClick);
      document.removeEventListener("touchstart", handleSideClick);
      document.removeEventListener("keydown", handleESC);
    };
  }, [smallPopUp]);

  // Click outside and ESC key handlers for big popup
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
    document.addEventListener("touchstart", handleSideClick);
    document.addEventListener("keydown", handleESC);

    return () => {
      document.removeEventListener("mousedown", handleSideClick);
      document.removeEventListener("touchstart", handleSideClick);
      document.removeEventListener("keydown", handleESC);
    };
  }, [bigPopUp]);

  // main component
  return (
    <div>
      <div className="w-full h-screen fixed">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
          {/* Make sure mapCenter has numeric lat/lng before rendering Map */}
          {mapCenter && typeof mapCenter.lat === "number" && typeof mapCenter.lng === "number" && (
            <Map
              style={{ borderRadius: "20px" }}
              defaultZoom={12}
              defaultCenter={mapCenter}
              gestureHandling={"greedy"}
              disableDefaultUI
            >
              {/* Render property markers as price tags */}
              {properties?.map((property) => {
                // console.log(property)
                // guard against missing coords
                const lat = Number(property.latitude);
                const lng = Number(property.longitude);
                if (Number.isNaN(lat) || Number.isNaN(lng)) {
                  // skip invalid coordinates
                  console.warn("Skipping property with invalid coords:", property);
                  return null;
                }

                return (
                  <Marker
                    key={property.id}
                    position={{ lat, lng }}
                    icon={{
                      url: "/fa-circle.svg", // ✅ Path to your custom icon
                      scaledSize: new google.maps.Size(15, 15), // optional - resize icon
                      anchor: new google.maps.Point(20, 40), // optional - aligns icon properly
                    }}
                    onClick={() => setSelectedProperty(property)}
                  >
                    {/* wrapper ensures the marker bottom-center anchors at the position */}
                    <div
                      // onClick={() => console.log(property)}
                      // onClick={() => setSelectedProperty(property)}
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
                          {property.price}
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

              {/* Info window for selected property
              {selectedProperty && (
                <InfoWindow
                  position={{
                    lat: Number(selectedProperty.latitude),
                    lng: Number(selectedProperty.longitude),
                  }}
                  onCloseClick={() => setSelectedProperty(selectedProperty)}
                >
                  <div
                    onClick={() => {
                      setSelectedProperty(selectedProperty); // close InfoWindow
                      setBigPopUpMounted(true);
                      requestAnimationFrame(() => setBigPopUp(true));
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
                      {isSaved ? <IoStar className="absolute top-2 right-2 text-orange-500 w-7 h-7"
                        onClick={() => setIsSaved(!isSaved)} /> :
                        <IoMdStarOutline className="absolute top-2 right-2 text-orange-500 w-7 h-7"
                          onClick={() => setIsSaved(!isSaved)} />
                      }
                    </div>
                    <div className="w-full h-[40%] p-2">
                      <h1 className="font-semibold font-poppins text-[#000000] text-2xl">
                        ${selectedProperty.price}
                      </h1>
                      <p className="font-poppins text-[#000000] text-sm mt-1">{selectedProperty.beds}{' '}beds{' | '}
                        {selectedProperty.baths}{' '} baths</p>
                      <p className="font-poppins text-[#000000] text-sm truncate">
                        {selectedProperty.details}
                      </p>
                      <p className="font-poppins text-[#000000] text-sm mt-1">
                        {selectedProperty.address.street} , {selectedProperty.address.city} , {selectedProperty.address.state}
                      </p>
                    </div>
                  </div>
                </InfoWindow>
              )} */}

              {/* Info window for selected property */}
              {selectedProperty && (
                <InfoWindow
                  position={{
                    lat: Number(selectedProperty.latitude),
                    lng: Number(selectedProperty.longitude),
                  }}
                  onCloseClick={() => setSelectedProperty(null)}
                >
                  <div
                    onClick={() => {
                      // Only trigger modal if you click outside the star
                      setSelectedProperty(selectedProperty);
                      setBigPopUpMounted(true);
                      requestAnimationFrame(() => setBigPopUp(true));
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
                      {isSaved ? (
                        <IoStar
                          className="absolute top-2 right-2 text-orange-500 w-7 h-7"
                          onClick={(e) => {
                            e.stopPropagation(); // ✅ Prevent modal from opening
                            setIsSaved(!isSaved);
                          }}
                        />
                      ) : (
                        <IoMdStarOutline
                          className="absolute top-2 right-2 text-orange-500 w-7 h-7"
                          onClick={(e) => {
                            e.stopPropagation(); // ✅ Prevent modal from opening
                            setIsSaved(!isSaved);
                          }}
                        />
                      )}
                    </div>
                    <div className="w-full h-[40%] p-2">
                      <h1 className="font-semibold font-poppins text-[#000000] text-2xl">
                        ${selectedProperty.price}
                      </h1>
                      <p className="font-poppins text-[#000000] text-sm mt-1">
                        {selectedProperty.beds} beds | {selectedProperty.baths} baths
                      </p>
                      <p className="font-poppins text-[#000000] text-sm truncate">
                        {selectedProperty.details}
                      </p>
                      <p className="font-poppins text-[#000000] text-sm mt-1">
                        {selectedProperty.address.street}, {selectedProperty.address.city}, {selectedProperty.address.state}
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
          {/*search box*/}
          <div
            className="flex justify-between items-center py-5 lg:w-full lg:max-w-[370px] h-[30px] lg:ml-8  
                ring-2 ring-[#000000] bg-[#000000] rounded-md ps-2"
          >
            <CiSearch className="text-white text-2xl" />
            <input
              className="text-white px-3 focus:outline-0 bg-transparent w-full"
              placeholder="Search by address city or neighborhood"
              title="Search by address city or neighborhood"
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
            <Image src="/HomePageLogo.svg" alt="1st_page" width={200} height={100} />
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
            onClick={openSmallPopUp}
            className="text-[#ECECEC] bg-[#000000] rounded-md font-poppins px-2 lg:px-5 py-2 
              cursor-pointer"
          >
            Zoning map
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

      {/* Small Popup with proper animation */}
      {smallPopUpMounted && (
        <div
          ref={smallpopupRef}
          className={`fixed bottom-20 left-2/4 transform -translate-x-1/2 z-50
            transition-all duration-300 ease-out ${smallPopUp ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2"
            }`}
        >
          <ZoningPopUp properties={properties} setProperties={setProperties} />
        </div>
      )}

      {/* Big Popup with proper animation */}
      {bigPopUpMounted && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-all`}
        >
          <div
            ref={bigpopupRef}
            className={`bg-white rounded-lg w-full max-w-[850px] h-[90vh] overflow-hidden shadow-lg transition-transform duration-300 ease-out ${bigPopUp ? "scale-100" : "scale-95"
              }`}
          >
            <div className="w-full h-full relative">
              <iframe
                src={selectedProperty?.url}
                title="Property Page"
                className="w-full h-full border-0 rounded-lg"
              ></iframe>

              {/* Close Button */}
              <button
                onClick={() => {
                  setBigPopUp(false);
                  setTimeout(() => setBigPopUpMounted(false), 300);
                }}
                className="absolute top-3 right-3 bg-black text-white px-3 py-1 rounded-md hover:bg-gray-800 transition"
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
