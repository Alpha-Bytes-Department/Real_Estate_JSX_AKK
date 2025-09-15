"use client"
import { APIProvider, Map, Marker, InfoWindow } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useState } from "react";
import { Slider } from "@/components/ui/slider"
import Link from "next/link";


export default function Dashboard() {
    const [zoningMapClicked, setZoningMapClicked] = useState(false);
    const [account, setAccount] = useState(false);
    const [smallPopUp, setSmallPopUp] = useState(false);

    function zoningPopUpShow() {
        setZoningMapClicked(true);
    }

    function handleAccount() {
        setAccount(!account);
    }

    const [markerLocation, setMarkerLocation] = useState({
        lat: 40.4406,
        lng: -79.9959,
    });

    return (
        <div className="w-full h-screen relative">
            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
                <Map
                    style={{ borderRadius: "20px" }}
                    defaultZoom={13}
                    defaultCenter={markerLocation}
                    gestureHandling={"greedy"}
                    disableDefaultUI
                >
                    <Marker position={markerLocation} onClick={() => setSmallPopUp(true)} />
                    {smallPopUp && (
                        <InfoWindow
                            position={markerLocation}
                            onCloseClick={() => setSmallPopUp(false)}
                        >
                            <div className="w-[250px] h-[250px]">
                                <div className="w-full h-[60%] relative">
                                    <Image src="/saved-properties-1.jpg" alt="pop-up-house" fill />
                                </div>
                                <div className="w-full h-[40%] ">
                                    <h1 className="font-semibold font-poppins text-[#000000] text-2xl">
                                        $199,999</h1>
                                    <p className="font-poppins text-[#000000]">3 beds | 2 bathrooms |
                                        2611 sqft - House for sale</p>
                                    <p className="font-poppins text-[#000000]">6515 Belair Road
                                        (MDFS35424512)</p>
                                </div>
                                <Link href="/property-details">
                                    <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </InfoWindow>
                    )}
                </Map>
            </APIProvider>

            <div className="absolute top-4 w-full flex justify-between">
                <div className="flex max-w-[370px] h-[40px] ml-8 mt-2 ring-2 ring-[#000000] 
            bg-[#000000] rounded-md">
                    <Image src="/search.svg" alt="search-icon" width={20} height={20}
                        className="invert ml-2" />
                    <input type="text" placeholder="Search by address,cityc or neighorhood..."
                        className="outline-none pl-2 font-poppins text-white" />
                    <button className="bg-[#2C2B2B] font-poppins text-[#FFFFFF] px-2 mr-2 rounded-md">
                        Search</button>
                </div>

                <div className="hidden lg:block">
                    <Image src="/HomePageLogo.svg" alt="1st_page" width={300} height={100} />
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-black font-poppins">Maya</p>
                    <div className="w-12 h-12 relative mr-8">
                        <button className="cursor-pointer" onClick={handleAccount}>
                            <Image src="/User.jpg" alt="user" fill className="rounded-full object-cover 
                        ring-3 ring-[#00308F]"/>
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-6 w-full flex items-center justify-center gap-6">
                <Link href="/saved-properties">
                    <button className="bg-[#ECECEC] text-[#000000] rounded-md font-poppins px-6 py-2 
                cursor-pointer focus:bg-[#000000] focus:text-[#FFFFFF]">Saved Properties</button>
                </Link>
                <button className="bg-[#ECECEC] text-[#000000] rounded-md font-poppins px-6 py-2
                cursor-pointer focus:bg-[#000000] focus:text-[#FFFFFF]"
                    onClick={zoningPopUpShow}>Zoning Map</button>
                <Link href="/listings">
                    <button className="bg-[#ECECEC] text-[#000000] rounded-md font-poppins px-6 py-2
                cursor-pointer focus:bg-[#000000] focus:text-[#FFFFFF]">Listings</button>
                </Link>
            </div>

            {zoningMapClicked && (
                <div>
                    <div className="absolute top-70 w-full lg:w-[700px] h-[50px] overflow-x-scroll 
                    overflow-y-scroll lg:ml-150 z-20 bg-[#FFFFFF] flex justify-around gap-6 lg:gap-8">
                        <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
                            <input type="checkbox" />
                            Sold Listings
                        </label>
                        <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
                            <input type="checkbox" />
                            Reviewed
                        </label>
                        <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
                            <input type="checkbox" />
                            Exclusion Zones
                        </label>
                        <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
                            <input type="checkbox" />
                            Show Alert Map
                        </label>
                    </div>

                    <div className="absolute bottom-30 lg:bottom-20 w-full lg:w-[900px] h-[400px] 
                    lg:h-[500px] overflow-x-scroll overflow-y-scroll lg:ml-130 z-30 bg-[#FFFFFF]">
                        <div className="flex justify-around gap-6 pt-5">
                            <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
                                <input type="checkbox" />
                                Missing Data
                            </label>
                            <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
                                <input type="checkbox" />
                                Favorites
                            </label>
                            <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
                                <input type="checkbox" />
                                Business Rule Matches
                            </label>
                            <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
                                <input type="checkbox" />
                                Newly Listed
                            </label>
                            <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
                                <input type="checkbox" />
                                Normal Listings
                            </label>
                        </div>

                        <div className="pt-5 flex gap-6 lg:pl-6">
                            <h1 className="text-[#000000] font-poppins font-medium">Property Type:</h1>
                            <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
                                <input type="radio" />
                                All
                            </label>
                            <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
                                <input type="radio" />
                                Multi-Family
                            </label>
                            <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
                                <input type="radio" />
                                Land
                            </label>
                        </div>

                        <div className="lg:w-[800px] h-[330px] flex flex-col items-center justify-center 
                        gap-5 mt-4 lg:ml-12 bg-[#F5F5F5]">
                            <p className="font-poppins text-[#000000]">Zoned Units</p>
                            <Slider defaultValue={[13, 70]} max={100} step={1} />
                            <p className="font-poppins text-[#000000]">List Price</p>
                            <Slider defaultValue={[33, 90]} max={100} step={1} />
                            <p className="font-poppins text-[#000000]">Existing Potential $ Per Unit</p>
                            <Slider defaultValue={[47, 92]} max={100} step={1} />
                            <p className="font-poppins text-[#000000]">Days on Market</p>
                            <Slider defaultValue={[27, 54]} max={100} step={1} />
                        </div>

                        <div className="flex justify-end gap-6 pt-4 pr-8">
                            <button className="ring-2 ring-[#000000] bg-[#FFFFFF] px-4 py-1 rounded-xs
                    font-poppins cursor-pointer focus:bg-[#000000] focus:text-[#FFFFFF]"
                                onClick={() => setZoningMapClicked(false)}>Clear</button>
                            <button className="ring-2 ring-[#000000] bg-[#FFFFFF] px-4 py-1 rounded-xs
                    font-poppins cursor-pointer focus:bg-[#000000] focus:text-[#FFFFFF]"
                                onClick={() => setZoningMapClicked(false)}>Apply</button>
                        </div>
                    </div>
                </div>
            )}

            {
                account && (
                    <div className="absolute top-25 right-20 w-[250px] h-[350px] flex flex-col gap-4
                    bg-[#FFFFFF]">
                        <Link href="/account-settings">
                            <button>
                                <div className="w-full h-[40px] flex items-center justify-between 
                                bg-[#D9D9D9] mt-3 rounded-sm cursor-pointer">
                                    <p className="text-[#000000] font-poppins pl-3">Profile Settings</p>
                                    <Image src="user-logo.svg" alt="user-logo" width={20} height={20}
                                        className="" />
                                </div>
                            </button>
                        </Link>

                        <Link href="/saved-properties">
                            <button>
                                <div className="w-full h-[40px] flex items-center justify-between 
                            bg-[#D9D9D9] rounded-sm cursor-pointer">
                                    <p className="text-[#000000] font-poppins pl-3">Saved Properties</p>
                                    <Image src="bookmark.svg" alt="bookmark-logo" width={20} height={20}
                                        className="" />
                                </div>
                            </button>
                        </Link>

                        <Link href="/listings">
                            <button>
                                <div className="w-full h-[40px] flex items-center justify-between 
                            bg-[#D9D9D9] rounded-sm cursor-pointer">
                                    <p className="text-[#000000] font-poppins pl-3">Listings</p>
                                    <Image src="list.svg" alt="list-logo" width={20} height={20}
                                        className="" />
                                </div>
                            </button>
                        </Link>

                        <div className="w-full h-[40px] flex items-center gap-2 pl-4">
                            <div className="w-[80px] h-[1px] bg-[#8F8C8C]" />
                            <p className="text-[#A4A3A3] font-poppins">and</p>
                            <div className="w-[80px] h-[1px] bg-[#8F8C8C]" />
                        </div>

                        <button>
                            <div className="w-full h-[40px] bg-[#D9D9D9] rounded-sm cursor-pointer">
                                <p className="text-[#000000] font-poppins pt-2 pl-3">Privacy Policy</p>
                            </div>
                        </button>

                        <button>
                            <div className="w-full h-[40px] bg-[#D9D9D9] rounded-sm cursor-pointer">
                                <p className="text-[#000000] font-poppins pt-2 pl-3">Terms of Services</p>
                            </div>
                        </button>
                    </div>
                )
            }
        </div>
    );
};
