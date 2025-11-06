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
import { useRouter } from "next/navigation";
import { showCustomSwal } from "@/components/ui/CustomSwal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CiBookmark, CiSearch } from "react-icons/ci";
// import PropertyPopUP from "@/components/features/PropertyPopUP/PropertyPopUp";
import AccountPopUP from "@/components/features/AccountPopUp/AccountPopUP";
import ZoningPopUp from "@/components/features/ZoningPopUp/ZoningPopUp";
import { BookmarkContext } from "@/providers/BookmarkProvider";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import PropertyPopUP from "@/components/features/PropertyPopUP/PropertyPopUp";
import { getProperties } from "@/lib/property";

export default function Dashboard() {
  const router = useRouter();
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
      const datas = await getProperties();
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

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("auth_user") || "null")
      : null;
  const name = user?.name || "User";
  const imageUrl = user?.profile_pic
    ? user?.profile_pic?.startsWith("http")
      ? user.profile_pic
      : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${user?.profile_pic}`
    : null;

  useEffect(() => {
    // Client-side guard: if no auth info in localStorage, show swal then redirect to sign-in
    const user =
      typeof window !== "undefined" ? localStorage.getItem("auth_user") : null;
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    if (!user || !token) {
      (async () => {
        await showCustomSwal({
          icon: "warning",
          title: "Login required",
          text: "Please sign in to access the dashboard.",
          confirmButtonText: "OK",
        });
        router.push(
          `/sign-in?loginRequired=1&redirect=${encodeURIComponent(
            "/dashboard"
          )}`
        );
      })();
      return;
    }

    handleFetchdata();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // If search is empty, show all properties
      setProperties(rootDatas);
      return;
    }

    setIsSearching(true);
    try {
      // First try to search within existing properties by address
      const localMatches = rootDatas.filter((property) => {
        const fullAddress =
          `${property.address.street}, ${property.address.city}, ${property.address.state}`.toLowerCase();
        const searchLower = searchQuery.toLowerCase();
        return (
          fullAddress.includes(searchLower) ||
          property.address.city.toLowerCase().includes(searchLower) ||
          property.address.state.toLowerCase().includes(searchLower) ||
          property.address.street.toLowerCase().includes(searchLower) ||
          property.address.zipcode.includes(searchQuery)
        );
      });

      if (localMatches.length > 0) {
        console.log("Found local matches:", localMatches);
        setProperties(localMatches);

        // Update map center to first match
        const firstMatch = localMatches[0];
        const lat = Number(firstMatch.latitude);
        const lng = Number(firstMatch.longitude);
        if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
          setMapCenter({ lat, lng });
        }
      } else {
        // If no local matches, use geocoding to center map on searched location
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          searchQuery
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
        const response = await fetch(geocodeUrl);
        const data = await response.json();
        console.log("Geocode response data:", data);

        if (data.status === "OK" && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setMapCenter({ lat: location.lat, lng: location.lng });

          // Filter properties within a radius of the searched location
          const radiusKm = 50; // 50km radius
          const nearbyProperties = rootDatas.filter((property) => {
            const distance = calculateDistance(
              location.lat,
              location.lng,
              Number(property.latitude),
              Number(property.longitude)
            );
            return distance <= radiusKm;
          });

          if (nearbyProperties.length > 0) {
            setProperties(nearbyProperties);
            console.log(
              `Found ${nearbyProperties.length} properties within ${radiusKm}km of searched location`
            );
          } else {
            setProperties([]); // No properties found in the area
            alert(
              `No properties found near "${searchQuery}". Try a different location.`
            );
          }
        } else {
          alert("Location not found. Please try again.");
          setProperties(rootDatas); // Reset to show all properties
        }
      }
    } catch (error) {
      console.error("Error searching location:", error);
      alert("Error searching location. Please try again.");
      setProperties(rootDatas); // Reset to show all properties
    } finally {
      setIsSearching(false);
    }
  };

  // Helper function to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // ========================= testing function =======================
  const fetchTesting = async () => {
    const res = await fetch(
      "https://cestoid-uncoarsely-kayla.ngrok-free.dev/api/offers/categories/"
    );
    // const data = await res.json();
    console.log("Testing API response:", res);
  };

  // Real-time search as user types (with debounce)
  useEffect(() => {
    // fetchTesting();
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        // Reset to show all properties when search is cleared
        setProperties(rootDatas);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, rootDatas]);

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
                    className="pt--1"
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
                      className="w-full max-w-[350px] h-[250px] cursor-pointer"
                    >
                      <div className=" h-[60%] relative">
                        <Image
                          src={selectedProperty.image || "/placeholder.png"}
                          alt="property-image"
                          fill
                          className="object-cover mx-auto px-3 rounded-2xl"
                        />
                        {/* Custom close button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProperty(null);
                          }}
                          className="absolute top-2 right-3 shadow-2xl bg-red-500 text-white font-black w-6 h-6 
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

        <div className="absolute top-1 hidden lg:block right-8">
          <p className="text-black bg-amber-100 px-3 rounded-full py-1 font-poppins">
            {name}
          </p>
        </div>

        <div className="absolute top-8 px-2 w-full  flex justify-between">
          <div
            className="flex justify-between items-center py-5 w-2/3 lg:w-full lg:max-w-[370px] h-[30px] lg:ml-8  
                ring-2 ring-[#000000] bg-[#000000] rounded-md ps-2"
          >
            <input
              className="text-white px-3 focus:outline-0 bg-transparent w-full"
              placeholder="Search by address city "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
            />
            <div className="w-8 lg:max-w-[80px]">
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full !h-[30px]  font-poppins text-base cursor-pointer 
                            hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? "..." : <FaSearch />}
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

          <div className="size-12 relative lg:mr-8">
            <button className="cursor-pointer" onClick={handleAccount}>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="user"
                  fill
                  className="rounded-full object-cover ring-3 ring-[#00308F] w-12 h-12"
                />
              ) : (
                <FaUser
                  size={20}
                  className="text-[#00308F] cursor-pointer ring-2 rounded-full size-8 p-1"
                />
              )}
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
              // Don't reset properties here, let the filter work on current data
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
            rootData={rootDatas}
          />
        </div>
      )}

      {bigPopUpMounted && (
        <div
          className={`fixed inset-0 z-50 bg-transparent overflow-y-auto
            transition-all duration-300 ease-out ${
              bigPopUp ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
        >
          <PropertyPopUP
            id={selectedProperty?.id}
            setBigPopUp={setBigPopUpMounted}
          />
        </div>
      )}
    </div>
  );
}
