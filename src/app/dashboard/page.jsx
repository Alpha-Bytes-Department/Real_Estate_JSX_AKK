"use client"
import { APIProvider, Map, Marker, InfoWindow } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useState } from "react";
import { Slider } from "@/components/ui/slider"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader,DialogTitle,} 
from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm, Controller } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import PropertyDetails from "../property-details/page";

export default function Dashboard() {
    const [zoningMapClicked, setZoningMapClicked] = useState(false);
    const [account, setAccount] = useState(false);
    const [smallPopUp, setSmallPopUp] = useState(false);
    const [bigPopUp, setBigPopUp] = useState(false);

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

      zonedUnits: [13, 10, 12, 34, 70],
      listPrice: [33, 90],
      existingPotential: [47, 92],
      daysOnMarket: [27, 114],
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setZoningMapClicked(false);
  };
  
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
                            <div className="w-full max-w-[250px] h-[250px]" 
                            onClick={()=>setBigPopUp(true)}>
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
                                <Link href="/property-details" className="mt-2 px-3 py-1 bg-blue-600 text-white rounded">
                                    View Details
                                </Link>
                            </div>
                        </InfoWindow>
                    )}
                </Map>
                {bigPopUp && <PropertyDetails/>}
            </APIProvider>

            <div className="absolute top-1 right-8">
                <p className="text-black font-poppins">Maya</p>
            </div>

            <div className="absolute top-8 w-full flex justify-between">
                {/*search box*/}
                <div className="flex justify-between items-center py-5 lg:w-full lg:max-w-[370px] h-[30px] lg:ml-8  
                ring-2 ring-[#000000] bg-[#000000] rounded-md ps-2">
                    <CiSearch className="text-white text-2xl"/>
                    <input className="text-white px-3 focus:outline-0" placeholder="Search by adderess city or neighborhood" title="Search by adderess city or neighborhood"/>
                    <div className="w-full max-w-[80px]">
                        <Button className="w-full !h-[30px] font-poppins text-base cursor-pointer 
                            hover:scale-105 hover:shadow-lg">Search</Button>
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
                    <button className="bg-[#ECECEC] text-[#000000] rounded-md font-poppins px-2 py-2 
                cursor-pointer focus:bg-[#000000] focus:text-[#FFFFFF]">Saved Properties</button>
                </Link>
                <button className="bg-[#ECECEC] text-[#000000] rounded-md font-poppins px-2 py-2
                cursor-pointer focus:bg-[#000000] focus:text-[#FFFFFF]"
                    onClick={zoningPopUpShow}>Zoning Map</button>
                <Link href="/listings">
                    <button className="bg-[#ECECEC] text-[#000000] rounded-md font-poppins px-2 py-2
                cursor-pointer focus:bg-[#000000] focus:text-[#FFFFFF]">Listings</button>
                </Link>
            </div>

            {zoningMapClicked && (
                <Dialog open={zoningMapClicked} onOpenChange={setZoningMapClicked}>
                    <DialogContent className="bg-transparent border-none p-2">
                        <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="bg-white grid grid-cols-2 md:grid-cols-4 gap-y-2 px-5 py-2 rounded-full">
                                {
                                [
                                { name: "soldListings", label: "Sold Listings", id: "sold-listings"},
                                { name: "reviewed", label: "Reviewed", id: "reviewed" },
                                { name: "exclusionZones", label: "Exclusion Zones", 
                                    id: "exclusion-zones" },
                                { name: "showAlertMap", label: "Show Alert Map", id: "show-alert-map"},
                                ].map((fieldData) => (
                                        <Controller
                                        key={fieldData.name}
                                        name={fieldData.name}
                                        control={control}
                                        render={({ field }) => (
                                            <div className="flex items-center gap-2">
                                            <Checkbox
                                                id={fieldData.id}
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            <Label htmlFor={fieldData.id}>{fieldData.label}</Label>
                                            </div>
                                        )}
                                        />
                            ))}


                                {/* <Controller name="soldListings" control={control}
                                    render={({ field }) => (
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="sold-listings" checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <Label htmlFor="sold-listings">Sold Listings</Label>
                                    </div>
                                    )}
                                />
                                <Controller name="soldListings" control={control}
                                    render={({ field }) => (
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="sold-listings" checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <Label htmlFor="sold-listings">Sold Listings</Label>
                                    </div>
                                    )}
                                />
                                <Controller name="soldListings" control={control}
                                    render={({ field }) => (
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="sold-listings" checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <Label htmlFor="sold-listings">Sold Listings</Label>
                                    </div>
                                    )}
                                />
                                <Controller name="soldListings" control={control}
                                    render={({ field }) => (
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="sold-listings" checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <Label htmlFor="sold-listings">Sold Listings</Label>
                                    </div>
                                    )}
                                /> */}
                            </div>
                            
                                
                            <div className="bg-white mt-6 px-8 py-3">
                                <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 text-black-600">
                                    {
                                        [
                                { name: "missingData", label: "Missing Data", id: "missing-data"},
                                { name: "favorites", label: "Favorites", id: "favorites" },
                                { name: "businessRuleMatches", label: "Business Rule Matches", 
                                    id: "business-rule-matches" },
                                { name: "newlyListed", label: "Newly Listed", id: "newly-listed"},
                                { name: "normalListings", label: "Normal Listings", id: "normal-listings"},
                                ].map((fieldData) => (
                                        <Controller
                                            key={fieldData.name}
                                            name={fieldData.name}
                                            control={control}
                                            render={({ field }) => (
                                                <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id={fieldData.id}
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                                <Label htmlFor={fieldData.id}>{fieldData.label}</Label>
                                                </div>
                                            )}
                                        />
                                        ))
                                    }


                                    {/* <div className="flex items-center gap-2">
                                        <Checkbox id="missing-data" {...register("missingData")}/>
                                        <Label htmlFor="missing-data">Missing Data</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="favorites" {...register("favorites")}/>
                                        <Label htmlFor="favorites">Favorites</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="business-rule-matches" {...register("businessRuleMatches")}/>
                                        <Label htmlFor="business-rule-matches">Business Rule Matches</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="newly-listed" {...register("newlyListed")}/>
                                        <Label htmlFor="newly-listed">Newly Listed</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="normal-listings" {...register("normalListings")}/>
                                        <Label htmlFor="normal-listings">Normal Listings</Label>
                                    </div> */}
                                </div>

                                <div className="mt-6">
                                    <Controller
                                     control={control}
                                     name="propertyType"
                                     render={({ field }) => (
                                     <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-2 lg:grid-cols-4">
                                        <h1 className="font-semibold">Property Type: </h1>
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
                                   )}
                                 />
                                </div>

                                <div className="flex flex-col items-center justify-center gap-5  
                                mt-6 pt-2 pb-4 bg-[#F5F5F5]">
                                    <p className="text-[#000000]">Zoned Units</p>
                                    <Controller control={control} name="zonedUnits" 
                                    render={({ field }) => (
                                        <Slider defaultValue={field.value} max={100} step={1} onValueChange={field.onChange} />
                                    )}
                                    />

                                    <p className="text-[#000000]">List Price</p>
                                    <Controller control={control} name="listPrice" 
                                    render={({ field }) => (
                                        <Slider defaultValue={field.value} max={100} step={1} onValueChange={field.onChange} />
                                    )}
                                    />

                                    <p className="text-[#000000]">Existing Potential $
                                        Per Unit</p>
                                    <Controller control={control} name="existingPotential" 
                                    render={({ field }) => (
                                        <Slider defaultValue={field.value} max={100} step={1} onValueChange={field.onChange} />
                                    )}
                                    />

                                    <p className="text-[#000000]">Days on Market</p>
                                    <Controller control={control} name="daysOnMarket" 
                                    render={({ field }) => (
                                        <Slider defaultValue={field.value} max={100} step={1} onValueChange={field.onChange} />
                                    )}
                                    />
                                </div>

                                <div className="flex justify-end gap-5 mt-4">
                                    <Button type="button" className="bg-[#FFFFFF] text-[#000000]
                                ring-2 ring-[#000000] hover:bg-[#FFFFFF] focus:text-[#FFFFFF] 
                                focus:bg-[#000000] font-poppins cursor-pointer"
                                        onClick={() => setZoningMapClicked(false)}>Clear</Button>
                                    <Button type="submit" className="bg-[#FFFFFF] text-[#000000]
                                ring-2 ring-[#000000] hover:bg-[#FFFFFF] focus:text-[#FFFFFF] 
                                focus:bg-[#000000] font-poppins cursor-pointer">Apply</Button>
                                </div>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            )}

            {
                account && (
                    <div className="absolute top-25 right-20 w-full max-w-[250px] h-[350px] 
                    flex flex-col gap-4 bg-[#FFFFFF] px-5">
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






            // {zoningMapClicked && (
            //     <Dialog open={zoningMapClicked} onOpenChange={setZoningMapClicked}>
            //         <DialogContent className="bg-transparent border-none p-2">
            //             <form>
            //                 <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 bg-white px-5 py-2 rounded-full">
            //                     <div className="flex items-center gap-2">
            //                         <Checkbox id="sold-listings" />
            //                         <Label htmlFor="sold-listings">Sold Listings</Label>
            //                     </div>
            //                     <div className="flex items-center gap-2">
            //                         <Checkbox id="reviewed" />
            //                         <Label htmlFor="reviewed">Reviewed</Label>
            //                     </div>
            //                     <div className="flex items-center gap-2">
            //                         <Checkbox id="exclusion-zones" />
            //                         <Label htmlFor="exclusion-zones">Exclusion Zones</Label>
            //                     </div>
            //                     <div className="flex items-center gap-2">
            //                         <Checkbox id="show-alert-map" />
            //                         <Label htmlFor="show-alert-map">Show Alert Map</Label>
            //                     </div>
            //                 </div>

            //                 <div className="bg-white mt-6 px-8 py-3">
            //                     <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 text-black-600">
            //                         <div className="flex items-center gap-2">
            //                             <Checkbox id="missing-data" />
            //                             <Label htmlFor="missing-data">Missing Data</Label>
            //                         </div>
            //                         <div className="flex items-center gap-2">
            //                             <Checkbox id="favorites" />
            //                             <Label htmlFor="favorites">Favorites</Label>
            //                         </div>
            //                         <div className="flex items-center gap-2">
            //                             <Checkbox id="business-rule-matches" />
            //                             <Label htmlFor="business-rule-matches">Business Rule Matches</Label>
            //                         </div>
            //                         <div className="flex items-center gap-2">
            //                             <Checkbox id="newly-listed" />
            //                             <Label htmlFor="newly-listed">Newly Listed</Label>
            //                         </div>
            //                         <div className="flex items-center gap-2">
            //                             <Checkbox id="normal-listings" />
            //                             <Label htmlFor="normal-listings">Normal Listings</Label>
            //                         </div>
            //                     </div>

            //                     <div className="mt-6">
            //                         <RadioGroup defaultValue="" className="grid grid-cols-2 lg:grid-cols-4">
            //                             <h1 className="font-semibold">Property Type: </h1>
            //                             <div className="flex items-center gap-3">
            //                                 <RadioGroupItem value="all" id="r1" />
            //                                 <Label htmlFor="r1">All</Label>
            //                             </div>
            //                             <div className="flex items-center gap-3">
            //                                 <RadioGroupItem value="multi-family" id="r2" />
            //                                 <Label htmlFor="r2">Multi-Family</Label>
            //                             </div>
            //                             <div className="flex items-center gap-3">
            //                                 <RadioGroupItem value="land" id="r3" />
            //                                 <Label htmlFor="r3">Land</Label>
            //                             </div>
            //                         </RadioGroup>
            //                     </div>

            //                     <div className="flex flex-col items-center justify-center gap-5  
            //                     mt-6 pt-2 pb-4 bg-[#F5F5F5]">
            //                         <p className="text-[#000000]">Zoned Units</p>
            //                         <Slider defaultValue={[13, 70]} max={100} step={1} />
            //                         <p className="text-[#000000]">List Price</p>
            //                         <Slider defaultValue={[33, 90]} max={100} step={1} />
            //                         <p className="text-[#000000]">Existing Potential $
            //                             Per Unit</p>
            //                         <Slider defaultValue={[47, 92]} max={100} step={1} />
            //                         <p className="text-[#000000]">Days on Market</p>
            //                         <Slider defaultValue={[27, 114]} max={1000} step={1} />
            //                     </div>

            //                     <div className="flex justify-end gap-5 mt-4">
            //                         <Button type="button" className="bg-[#FFFFFF] text-[#000000]
            //                     ring-2 ring-[#000000] hover:bg-[#FFFFFF] focus:text-[#FFFFFF] 
            //                     focus:bg-[#000000] font-poppins cursor-pointer"
            //                             onClick={() => setZoningMapClicked(false)}>Clear</Button>
            //                         <Button type="submit" className="bg-[#FFFFFF] text-[#000000]
            //                     ring-2 ring-[#000000] hover:bg-[#FFFFFF] focus:text-[#FFFFFF] 
            //                     focus:bg-[#000000] font-poppins cursor-pointer">Apply</Button>
            //                     </div>
            //                 </div>
            //             </form>
            //         </DialogContent>
            //     </Dialog>
            // )}







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

