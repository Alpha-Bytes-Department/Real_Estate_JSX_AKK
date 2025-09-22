"use client"
import { APIProvider, Map, Marker, InfoWindow } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useState } from "react";
import { Slider } from "@/components/ui/slider"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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

            <div className="absolute top-1 right-8">
                <p className="text-black font-poppins">Maya</p>
            </div>

            <div className="absolute top-8 w-full flex justify-between">
                {/*search box*/}
                <div className="flex lg:w-full lg:max-w-[370px] h-[30px] lg:ml-8  
                ring-2 ring-[#000000] bg-[#000000] rounded-md">
                    <Image src="/search.svg" alt="search-icon" width={20} height={20}
                        className="invert ml-2" />
                    <Input type="text" placeholder="Search by address,city or neighborhood..."
                        className="font-poppins text-white !border-0 !ring-0 !focus:ring-0 
                    !focus:border-transparent !outline-none text-2xl -translate-y-1/8"/>
                    <div className="w-full max-w-[80px]">
                        <Link href="">
                            <Button className="w-full !h-[30px] font-poppins text-base cursor-pointer 
                            hover:scale-105 hover:shadow-lg">Search</Button>
                        </Link>
                    </div>
                </div>

                <div className="hidden lg:block">
                    <Image src="/HomePageLogo.svg" alt="1st_page" width={200} height={100} />
                </div>

                <div className="w-12 h-12 relative mr-8">
                    <button className="cursor-pointer" onClick={handleAccount}>
                        <Image src="/User.jpg" alt="user" fill className="rounded-full object-cover 
                        ring-3 ring-[#00308F]"/>
                    </button>
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
                <Dialog open={zoningMapClicked} onOpenChange={setZoningMapClicked}>
                    <DialogContent>
                        <form className="font-poppins">
                            <div className="flex flex-col gap-3 text-red-600">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="sold-listings" />
                                    <Label htmlFor="sold-listings">Sold Listings</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="reviewed" />
                                    <Label htmlFor="reviewed">Reviewed</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="exclusion-zones" />
                                    <Label htmlFor="exclusion-zones">Exclusion Zones</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="show-alert-map" />
                                    <Label htmlFor="show-alert-map">Show Alert Map</Label>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 mt-6 text-black-600">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="missing-data" />
                                    <Label htmlFor="missing-data">Missing Data</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="favorites" />
                                    <Label htmlFor="favorites">Favorites</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="business-rule-matches" />
                                    <Label htmlFor="business-rule-matches">Business Rule Matches</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="newly-listed" />
                                    <Label htmlFor="newly-listed">Newly Listed</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="normal-listings" />
                                    <Label htmlFor="normal-listings">Normal Listings</Label>
                                </div>
                            </div>

                            <div className="mt-6 text-blue-900">
                                <RadioGroup defaultValue="">
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="all" id="r1" />
                                        <Label htmlFor="r1">All</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="multi-family" id="r2" />
                                        <Label htmlFor="r2">Multi-Family</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="land" id="r3" />
                                        <Label htmlFor="r3">Land</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="flex flex-col items-center justify-center gap-4  
                                mt-6 bg-[#F5F5F5]">
                                <p className="text-[#000000]">Zoned Units</p>
                                <Slider defaultValue={[13, 70]} max={100} step={1} />
                                <p className="text-[#000000]">List Price</p>
                                <Slider defaultValue={[33, 90]} max={100} step={1} />
                                <p className="text-[#000000]">Existing Potential $
                                    Per Unit</p>
                                <Slider defaultValue={[47, 92]} max={100} step={1} />
                                <p className="text-[#000000]">Days on Market</p>
                                <Slider defaultValue={[27, 114]} max={1000} step={1} />
                            </div>

                            <div className="flex justify-end">
                                {/* buttons */}
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            )}

            {
                account && (
                    <div className="absolute top-25 right-20 w-full max-w-[250px] h-[350px] 
                    flex flex-col gap-4 bg-[#FFFFFF]">
                        <div className="w-full pt-6">
                            <Link href="/account-settings">
                                <Button className="w-full flex justify-between cursor-pointer bg-[#D9D9D9] 
                            hover:bg-[#D9D9D9]">
                                    <Label htmlFor="profile-settings" className="text-[#000000] font-poppins 
                                cursor-pointer text-base">Profile Settings</Label>
                                    <Image src="/user-logo.svg" alt="user-logo" height={15} width={20}
                                        className="" />
                                </Button>
                            </Link>
                        </div>

                        <div className="w-full">
                            <Link href="/saved-properties">
                                <Button className="w-full flex justify-between cursor-pointer bg-[#D9D9D9] 
                            hover:bg-[#D9D9D9]">
                                    <Label htmlFor="profile-settings" className="text-[#000000] 
                                    font-poppins cursor-pointer text-base">Saved Properties</Label>
                                    <Image src="/bookmark.svg" alt="bookmark-logo" height={15} width={20}
                                        className="" />
                                </Button>
                            </Link>
                        </div>

                        <div className="w-full">
                            <Link href="/listings">
                                <Button className="w-full flex justify-between cursor-pointer bg-[#D9D9D9] 
                            hover:bg-[#D9D9D9]">
                                    <Label htmlFor="listings" className="text-[#000000] font-poppins 
                                cursor-pointer text-base">Listings</Label>
                                    <Image src="/list.svg" alt="list-logo" height={15} width={20}
                                        className="" />
                                </Button>
                            </Link>
                        </div>

                        <div className="w-full flex items-center gap-2 pl-4">
                            <div className="w-full max-w-[80px] h-[1px] bg-[#8F8C8C]" />
                            <p className="text-[#A4A3A3] font-poppins">and</p>
                            <div className="w-full max-w-[80px] h-[1px] bg-[#8F8C8C]" />
                        </div>

                        <div className="w-full">
                            <Link href="">
                                <Button className="w-full flex items-center justify-center 
                                    cursor-pointer bg-[#D9D9D9] hover:bg-[#D9D9D9]">
                                    <Label htmlFor="privacy-policy" className="text-[#000000] 
                                        font-poppins cursor-pointer text-base">Privacy Policy</Label>
                                </Button>
                            </Link>
                        </div>

                        <div className="w-full">
                            <Link href="">
                                <Button className="w-full flex items-center justify-center 
                                    cursor-pointer bg-[#D9D9D9] hover:bg-[#D9D9D9]">
                                    <Label htmlFor="terms-of-services" className="text-[#000000] 
                                        font-poppins cursor-pointer text-base">Terms of Services</Label>
                                </Button>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    );
};


{/* <div className="absolute top-70 w-full lg:w-[700px] h-[50px] sm:overflow-x-scroll 
                    md:overflow-x-scroll lg:overflow-x-visible sm:overflow-y-scroll md:overflow-y-scroll 
                    lg:overflow-y-visible lg:ml-150 z-20 bg-[#FFFFFF] flex justify-around gap-6 
                    lg:gap-8">
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
</div> */}




{/* <div className="absolute bottom-30 lg:bottom-20 w-full lg:w-[900px] h-[400px] 
                    lg:h-[500px] sm:overflow-x-scroll md:overflow-x-scroll lg:overflow-x-visible 
                    sm:overflow-y-scroll md:overflow-y-scroll lg:overflow-y-visible lg:ml-130 z-30 
                    bg-[#FFFFFF]">
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
</div> */}








// "use client"
// import { APIProvider, Map, Marker, InfoWindow } from "@vis.gl/react-google-maps";
// import Image from "next/image";
// import { useState } from "react";
// import { Slider } from "@/components/ui/slider"
// import Link from "next/link";
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"

// export default function Dashboard() {
//     const [zoningMapClicked, setZoningMapClicked] = useState(false);
//     const [account, setAccount] = useState(false);
//     const [smallPopUp, setSmallPopUp] = useState(false);

//     function zoningPopUpShow() {
//         setZoningMapClicked(true);
//     }

//     function handleAccount() {
//         setAccount(!account);
//     }

//     const [markerLocation, setMarkerLocation] = useState({
//         lat: 40.4406,
//         lng: -79.9959,
//     });

//     return (
//         <div className="w-full h-screen relative">
//             <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
//                 <Map
//                     style={{ borderRadius: "20px" }}
//                     defaultZoom={13}
//                     defaultCenter={markerLocation}
//                     gestureHandling={"greedy"}
//                     disableDefaultUI
//                 >
//                     <Marker position={markerLocation} onClick={() => setSmallPopUp(true)} />
//                     {smallPopUp && (
//                         <InfoWindow
//                             position={markerLocation}
//                             onCloseClick={() => setSmallPopUp(false)}
//                         >
//                             <div className="w-[250px] h-[250px]">
//                                 <div className="w-full h-[60%] relative">
//                                     <Image src="/saved-properties-1.jpg" alt="pop-up-house" fill />
//                                 </div>
//                                 <div className="w-full h-[40%] ">
//                                     <h1 className="font-semibold font-poppins text-[#000000] text-2xl">
//                                         $199,999</h1>
//                                     <p className="font-poppins text-[#000000]">3 beds | 2 bathrooms |
//                                         2611 sqft - House for sale</p>
//                                     <p className="font-poppins text-[#000000]">6515 Belair Road
//                                         (MDFS35424512)</p>
//                                 </div>
//                                 <Link href="/property-details">
//                                     <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded">
//                                         View Details
//                                     </button>
//                                 </Link>
//                             </div>
//                         </InfoWindow>
//                     )}
//                 </Map>
//             </APIProvider>

//             <div className="absolute top-1 right-8">
//                 <p className="text-black font-poppins">Maya</p>
//             </div>

//             <div className="absolute top-8 w-full flex justify-between">
//                 {/*search box*/}
//                 <div className="flex lg:w-full lg:max-w-[370px] h-[30px] lg:ml-8
//                 ring-2 ring-[#000000] bg-[#000000] rounded-md">
//                     <Image src="/search.svg" alt="search-icon" width={20} height={20}
//                         className="invert ml-2" />
//                     <Input type="text" placeholder="Search by address,city or neighborhood..."
//                         className="font-poppins text-white !border-0 !ring-0 !focus:ring-0
//                     !focus:border-transparent !outline-none text-2xl -translate-y-1/8"/>
//                     <div className="w-full max-w-[80px]">
//                         <Link href="">
//                             <Button className="w-full !h-[30px] font-poppins text-base cursor-pointer
//                             hover:scale-105 hover:shadow-lg">Search</Button>
//                         </Link>
//                     </div>
//                 </div>

//                 <div className="hidden lg:block">
//                     <Image src="/HomePageLogo.svg" alt="1st_page" width={200} height={100} />
//                 </div>

//                 <div className="w-12 h-12 relative mr-8">
//                     <button className="cursor-pointer" onClick={handleAccount}>
//                         <Image src="/User.jpg" alt="user" fill className="rounded-full object-cover
//                         ring-3 ring-[#00308F]"/>
//                     </button>
//                 </div>
//             </div>

//             <div className="absolute bottom-6 w-full flex items-center justify-center gap-6">
//                 <Link href="/saved-properties">
//                     <button className="bg-[#ECECEC] text-[#000000] rounded-md font-poppins px-6 py-2
//                 cursor-pointer focus:bg-[#000000] focus:text-[#FFFFFF]">Saved Properties</button>
//                 </Link>
//                 <button className="bg-[#ECECEC] text-[#000000] rounded-md font-poppins px-6 py-2
//                 cursor-pointer focus:bg-[#000000] focus:text-[#FFFFFF]"
//                     onClick={zoningPopUpShow}>Zoning Map</button>
//                 <Link href="/listings">
//                     <button className="bg-[#ECECEC] text-[#000000] rounded-md font-poppins px-6 py-2
//                 cursor-pointer focus:bg-[#000000] focus:text-[#FFFFFF]">Listings</button>
//                 </Link>
//             </div>

//             {zoningMapClicked && (
//                 <div>
//                     <div className="absolute top-70 w-full max-w-[700px] h-[50px] overflow-x-scroll
//                     overflow-y-scroll lg:ml-150 z-20 bg-[#FFFFFF] flex justify-around gap-6 lg:gap-8">
//                         <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//                             <input type="checkbox" />
//                             Sold Listings
//                         </label>
//                         <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//                             <input type="checkbox" />
//                             Reviewed
//                         </label>
//                         <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//                             <input type="checkbox" />
//                             Exclusion Zones
//                         </label>
//                         <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//                             <input type="checkbox" />
//                             Show Alert Map
//                         </label>
//                     </div>

//                     <div className="absolute bottom-30 lg:bottom-20 w-full lg:w-[900px] h-[400px]
//                     lg:h-[500px] overflow-x-scroll overflow-y-scroll lg:ml-130 z-30 bg-[#FFFFFF]">
//                         <div className="flex justify-around gap-6 pt-5">
//                             <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//                                 <input type="checkbox" />
//                                 Missing Data
//                             </label>
//                             <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//                                 <input type="checkbox" />
//                                 Favorites
//                             </label>
//                             <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//                                 <input type="checkbox" />
//                                 Business Rule Matches
//                             </label>
//                             <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//                                 <input type="checkbox" />
//                                 Newly Listed
//                             </label>
//                             <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//                                 <input type="checkbox" />
//                                 Normal Listings
//                             </label>
//                         </div>

//                         <div className="pt-5 flex gap-6 lg:pl-6">
//                             <h1 className="text-[#000000] font-poppins font-medium">Property Type:</h1>
//                             <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//                                 <input type="radio" />
//                                 All
//                             </label>
//                             <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//                                 <input type="radio" />
//                                 Multi-Family
//                             </label>
//                             <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//                                 <input type="radio" />
//                                 Land
//                             </label>
//                         </div>

//                         <div className="lg:w-[800px] h-[330px] flex flex-col items-center justify-center
//                         gap-5 mt-4 lg:ml-12 bg-[#F5F5F5]">
//                             <p className="font-poppins text-[#000000]">Zoned Units</p>
//                             <Slider defaultValue={[13, 70]} max={100} step={1} />
//                             <p className="font-poppins text-[#000000]">List Price</p>
//                             <Slider defaultValue={[33, 90]} max={100} step={1} />
//                             <p className="font-poppins text-[#000000]">Existing Potential $ Per Unit</p>
//                             <Slider defaultValue={[47, 92]} max={100} step={1} />
//                             <p className="font-poppins text-[#000000]">Days on Market</p>
//                             <Slider defaultValue={[27, 54]} max={100} step={1} />
//                         </div>

//                         <div className="flex justify-end gap-6 pt-4 pr-8">
//                             <button className="ring-2 ring-[#000000] bg-[#FFFFFF] px-4 py-1 rounded-xs
//                     font-poppins cursor-pointer focus:bg-[#000000] focus:text-[#FFFFFF]"
//                                 onClick={() => setZoningMapClicked(false)}>Clear</button>
//                             <button className="ring-2 ring-[#000000] bg-[#FFFFFF] px-4 py-1 rounded-xs
//                     font-poppins cursor-pointer focus:bg-[#000000] focus:text-[#FFFFFF]"
//                                 onClick={() => setZoningMapClicked(false)}>Apply</button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {
//                 account && (
//                     <div className="absolute top-25 right-20 w-full max-w-[250px] h-[350px]
//                     flex flex-col gap-4 bg-[#FFFFFF]">
//                         <div className="w-full pt-6">
//                             <Link href="/account-settings">
//                                 <Button className="w-full flex justify-between cursor-pointer bg-[#D9D9D9]
//                             hover:bg-[#D9D9D9]">
//                                     <Label htmlFor="profile-settings" className="text-[#000000] font-poppins
//                                 cursor-pointer text-base">Profile Settings</Label>
//                                     <Image src="/user-logo.svg" alt="user-logo" height={15} width={20}
//                                         className="" />
//                                 </Button>
//                             </Link>
//                         </div>

//                         <div className="w-full">
//                             <Link href="/saved-properties">
//                                 <Button className="w-full flex justify-between cursor-pointer bg-[#D9D9D9]
//                             hover:bg-[#D9D9D9]">
//                                     <Label htmlFor="profile-settings" className="text-[#000000]
//                                     font-poppins cursor-pointer text-base">Saved Properties</Label>
//                                     <Image src="/bookmark.svg" alt="bookmark-logo" height={15} width={20}
//                                         className="" />
//                                 </Button>
//                             </Link>
//                         </div>

//                         <div className="w-full">
//                             <Link href="/listings">
//                                 <Button className="w-full flex justify-between cursor-pointer bg-[#D9D9D9]
//                             hover:bg-[#D9D9D9]">
//                                     <Label htmlFor="listings" className="text-[#000000] font-poppins
//                                 cursor-pointer text-base">Listings</Label>
//                                     <Image src="/list.svg" alt="list-logo" height={15} width={20}
//                                         className="" />
//                                 </Button>
//                             </Link>
//                         </div>

//                         <div className="w-full flex items-center gap-2 pl-4">
//                             <div className="w-full max-w-[80px] h-[1px] bg-[#8F8C8C]" />
//                             <p className="text-[#A4A3A3] font-poppins">and</p>
//                             <div className="w-full max-w-[80px] h-[1px] bg-[#8F8C8C]" />
//                         </div>

//                         <div className="w-full">
//                             <Link href="">
//                                 <Button className="w-full flex items-center justify-center
//                                     cursor-pointer bg-[#D9D9D9] hover:bg-[#D9D9D9]">
//                                     <Label htmlFor="privacy-policy" className="text-[#000000]
//                                         font-poppins cursor-pointer text-base">Privacy Policy</Label>
//                                 </Button>
//                             </Link>
//                         </div>

//                         <div className="w-full">
//                             <Link href="">
//                                 <Button className="w-full flex items-center justify-center
//                                     cursor-pointer bg-[#D9D9D9] hover:bg-[#D9D9D9]">
//                                     <Label htmlFor="terms-of-services" className="text-[#000000]
//                                         font-poppins cursor-pointer text-base">Terms of Services</Label>
//                                 </Button>
//                             </Link>
//                         </div>
//                     </div>
//                 )
//             }
//         </div>
//     );
// };


// {/* <div className="absolute top-70 w-full lg:w-[700px] h-[50px] sm:overflow-x-scroll
//                     md:overflow-x-scroll lg:overflow-x-visible sm:overflow-y-scroll md:overflow-y-scroll
//                     lg:overflow-y-visible lg:ml-150 z-20 bg-[#FFFFFF] flex justify-around gap-6
//                     lg:gap-8">
//     <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//         <input type="checkbox" />
//         Sold Listings
//     </label>
//     <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//         <input type="checkbox" />
//         Reviewed
//     </label>
//     <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//         <input type="checkbox" />
//         Exclusion Zones
//     </label>
//     <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//         <input type="checkbox" />
//         Show Alert Map
//     </label>
// </div> */}




// {/* <div className="absolute bottom-30 lg:bottom-20 w-full lg:w-[900px] h-[400px]
//                     lg:h-[500px] sm:overflow-x-scroll md:overflow-x-scroll lg:overflow-x-visible
//                     sm:overflow-y-scroll md:overflow-y-scroll lg:overflow-y-visible lg:ml-130 z-30
//                     bg-[#FFFFFF]">
//     <div className="flex justify-around gap-6 pt-5">
//         <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//             <input type="checkbox" />
//             Missing Data
//         </label>
//         <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//             <input type="checkbox" />
//             Favorites
//         </label>
//         <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//             <input type="checkbox" />
//             Business Rule Matches
//         </label>
//         <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//             <input type="checkbox" />
//             Newly Listed
//         </label>
//         <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//             <input type="checkbox" />
//             Normal Listings
//         </label>
//     </div>

//     <div className="pt-5 flex gap-6 lg:pl-6">
//         <h1 className="text-[#000000] font-poppins font-medium">Property Type:</h1>
//         <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//             <input type="radio" />
//             All
//         </label>
//         <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//             <input type="radio" />
//             Multi-Family
//         </label>
//         <label className="flex items-center gap-2 text-[#000000] font-poppins text-sm">
//             <input type="radio" />
//             Land
//         </label>
//     </div>

//     <div className="lg:w-[800px] h-[330px] flex flex-col items-center justify-center
//                         gap-5 mt-4 lg:ml-12 bg-[#F5F5F5]">
//         <p className="font-poppins text-[#000000]">Zoned Units</p>
//         <Slider defaultValue={[13, 70]} max={100} step={1} />
//         <p className="font-poppins text-[#000000]">List Price</p>
//         <Slider defaultValue={[33, 90]} max={100} step={1} />
//         <p className="font-poppins text-[#000000]">Existing Potential $ Per Unit</p>
//         <Slider defaultValue={[47, 92]} max={100} step={1} />
//         <p className="font-poppins text-[#000000]">Days on Market</p>
//         <Slider defaultValue={[27, 54]} max={100} step={1} />
//     </div>

//     <div className="flex justify-end gap-6 pt-4 pr-8">
//         <button className="ring-2 ring-[#000000] bg-[#FFFFFF] px-4 py-1 rounded-xs
//                     font-poppins cursor-pointer focus:bg-[#000000] focus:text-[#FFFFFF]"
//             onClick={() => setZoningMapClicked(false)}>Clear</button>
//         <button className="ring-2 ring-[#000000] bg-[#FFFFFF] px-4 py-1 rounded-xs
//                     font-poppins cursor-pointer focus:bg-[#000000] focus:text-[#FFFFFF]"
//             onClick={() => setZoningMapClicked(false)}>Apply</button>
//     </div>
// </div> */}

